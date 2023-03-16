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
    const [coverImagePublicId, thumbnailPublicId] = await Promise.all([
      uploadCoverImageEstate(coverImage, folderName),
      uploadThumbnailEstate(thubnail, folderName),
    ]);
    const estateAdded = await EstateModel.create({
      _id: estateId,
      ...fields,
      owner: salerId,
      coverImg: coverImagePublicId,
      thumbnail: thumbnailPublicId || [],
    });
    return estateAdded;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getInfoEstate = async (id) => {
  try {
    const estateFound = await EstateModel.findById(id)
      .populate({ path: 'currentStatus', select: 'name' })
      .populate({ path: 'type', select: 'name' });
    const urlThumnailPromise = estateFound.thumbnail.map((e) => {
      return cloudinary.api.resource(e);
    });
    const urlThumnail = (await Promise.all(urlThumnailPromise)).map((e) => {
      return e.secure_url;
    });
    return {
      ...estateFound._doc,
      currentStatus: estateFound.currentStatus.name,
      type: estateFound.type.name,
      thumbnail: urlThumnail,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteEstate = async (estateId) => {
  try {
    const deletedDocument = await EstateModel.findByIdAndDelete(estateId);
    await Promise.all(
      deletedDocument.thumbnail.map((publicID) => {
        return cloudinary.uploader.destroy(publicID);
      }),
      cloudinary.uploader.destroy(deletedDocument.coverImg)
    );
    return deletedDocument;
  } catch (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
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
    let currentCoverImagePublicId = estateFound.coverImg;
    if (coverImage) {
      currentCoverImagePublicId = await uploadCoverImageEstate(
        coverImage,
        folderName,
        async () => {
          try {
            await cloudinary.uploader.destroy(currentCoverImagePublicId);
          } catch (error) {
            throw new Error(error.message);
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
              estateFound.thumbnail.map((publicId) =>
                cloudinary.uploader.destroy(publicId)
              )
            );
          } catch (error) {
            throw new Error(error.message);
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
    throw new Error(error.message);
  }
};

export {
  createEstate,
  getInfoEstate,
  deleteEstate,
  updateEstate,
  findContactEstate,
};
