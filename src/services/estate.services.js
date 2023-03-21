import { EstateModel } from '../models/index.js';
import pick from 'lodash/pick.js';
import {
  getCoverImageResized,
  getThumbnailResize,
} from '../utils/resizeImage.js';
import { cloudinary } from '../configs/cloudinary.config.js';
import AppError from '../utils/AppError.js';
import status from 'http-status';
import { conversationError } from '../configs/conversationMessage.js';
import {
  getPublicIdByUrl,
  uploadCoverImageEstate,
  uploadThumbnailEstate,
} from '../utils/uploadCloud.js';
import mongoose from 'mongoose';
import { DTO, UPLOAD_MESSAGE } from '../configs/index.js';

const createEstate = async ({ salerId, body, files }) => {
  try {
    const fields = pick(body, DTO.dtoEstate);
    const estateId = mongoose.Types.ObjectId();
    const folderName = `Estates/${estateId}`;
    const [coverImage, thubnail] = await Promise.all([
      getCoverImageResized(files),
      getThumbnailResize(files),
    ]);
    if (!coverImage) throw new Error(UPLOAD_MESSAGE.VALIDATION_COVER_IMAGE);
    const [coverImageUrl, thumbnailUrl] = await Promise.all([
      uploadCoverImageEstate(coverImage, folderName),
      uploadThumbnailEstate(thubnail, folderName),
    ]);
    const { lat, lng } = JSON.parse(body.corrdinates);
    const estateAdded = await EstateModel.create({
      _id: estateId,
      ...fields,
      owner: salerId,
      coverImg: coverImageUrl,
      thumbnail: thumbnailUrl || [],
      corrdinates: { lat: lat, lng: lng },
    });
    return estateAdded;
  } catch (error) {
    throw new Error(error);
  }
};

const getInfoEstate = async (id) => {
  try {
    const estateFound = await EstateModel.findById(id)
      .populate({ path: 'currentStatus', select: 'name' })
      .populate({ path: 'type', select: 'name' });
    return {
      ...estateFound._doc,
      currentStatus: estateFound.currentStatus?.name || null,
      type: estateFound.type?.name || null,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const deleteEstate = async (estateId) => {
  try {
    const deletedDocument = await EstateModel.findByIdAndDelete(estateId);
    const coverImgPublicId = getPublicIdByUrl(deletedDocument?.coverImg);
    const thumbnailPublicId = deletedDocument.thumbnail.map((url) => {
      return getPublicIdByUrl(url);
    });
    await Promise.all([
      cloudinary.uploader.destroy(coverImgPublicId),
      Promise.all(
        thumbnailPublicId.map((publicId) =>
          cloudinary.uploader.destroy(publicId)
        )
      ),
    ]);
    return deletedDocument;
  } catch (error) {
    throw new Error(error);
  }
};

const findContactEstate = async (estateID) => {
  try {
    const contactEstate = await EstateModel.findById(estateID);
    if (!contactEstate) {
      return new AppError(conversationError.notFound, status.NOT_FOUND);
    }
    return contactEstate;
  } catch (error) {
    throw new Error(error);
  }
};

const updateEstate = async ({ estateId, body, files }) => {
  try {
    const fields = pick(body, DTO.dtoEstate);
    const folderName = `Estates/${estateId}`;
    const estateFound = await EstateModel.findById(estateId);

    const [coverImage, thumbnail] = await Promise.all([
      getCoverImageResized(files),
      getThumbnailResize(files),
    ]);
    let currentCoverImagePublicId = getPublicIdByUrl(estateFound.coverImg);
    if (coverImage) {
      currentCoverImagePublicId = await uploadCoverImageEstate(
        coverImage,
        folderName,
        async () => {
          try {
            await cloudinary.uploader.destroy(currentCoverImagePublicId);
          } catch (error) {
            throw new Error(error);
          }
        }
      );
    }

    let currentThumbnailPublicId = estateFound.thumbnail;
    if (thumbnail) {
      currentThumbnailPublicId = await uploadThumbnailEstate(
        thumbnail,
        folderName,
        async () => {
          try {
            await Promise.all(
              estateFound.thumbnail.map((url) => {
                const publicId = getPublicIdByUrl(url);
                return cloudinary.uploader.destroy(publicId);
              })
            );
          } catch (error) {
            throw new Error(error);
          }
        }
      );
    }
    const estateUpdated = await EstateModel.findByIdAndUpdate(
      estateId,
      {
        ...fields,
        coverImg: currentCoverImagePublicId,
        thumbnail: currentThumbnailPublicId,
      },
      { new: true }
    );
    return estateUpdated;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  createEstate,
  getInfoEstate,
  deleteEstate,
  updateEstate,
  findContactEstate,
};
