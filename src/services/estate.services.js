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
  if (fields.location) {
    //convert coordinates String value from FormData to Number
    fields.location = {
      coordinates: convertCoordinatesStringToNumber(
        fields.location.coordinates
      ),
      type: 'Point',
    };
  }
  const estateAdded = await EstateModel.create({
    _id: estateId,
    ...fields,
    owner: salerId,
    coverImg: coverImageUrl,
    thumbnail: thumbnailUrl || [],
  });
  return estateAdded;
};

const getInfoEstate = async (id) => {
  const estateFound = await EstateModel.findById(id);
  return estateFound;
};

const deleteEstate = async (estate) => {
  const deletedDocument = await EstateModel.deleteOne({ _id: estate.id });
  if (deletedDocument.deletedCount) {
    const coverImgPublicId = getPublicIdByUrl(estate?.coverImg);
    const thumbnailPublicId = estate.thumbnail.map((url) => {
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
    return true;
  }
  return false;
};

const findContactEstate = async (estateID) => {
  const contactEstate = await EstateModel.findById(estateID);
  if (!contactEstate) {
    return new AppError(conversationError.notFound, status.NOT_FOUND);
  }
  return contactEstate;
};

const updateEstate = async ({ estate, body, files }) => {
  const fields = pick(body, DTO.dtoEstate);
  const folderName = `Estates/${estate.id}`;

  const [coverImage, thumbnail] = await Promise.all([
    getCoverImageResized(files),
    getThumbnailResize(files),
  ]);
  if (fields.location) {
    //convert coordinates String value from FormData to Number
    fields.location = {
      coordinates: convertCoordinatesStringToNumber(
        fields.location.coordinates
      ),
      type: 'Point',
    };
  }
  let currentCoverImagePublicId = getPublicIdByUrl(estate.coverImg);
  if (coverImage) {
    currentCoverImagePublicId = await uploadCoverImageEstate(
      coverImage,
      folderName,
      async () => {
        await cloudinary.uploader.destroy(currentCoverImagePublicId);
      }
    );
  }

  let currentThumbnailPublicId = estate.thumbnail;
  if (thumbnail) {
    currentThumbnailPublicId = await uploadThumbnailEstate(
      thumbnail,
      folderName,
      async () => {
        await Promise.all(
          estate.thumbnail.map((url) => {
            const publicId = getPublicIdByUrl(url);
            return cloudinary.uploader.destroy(publicId);
          })
        );
      }
    );
  }
  const resultUpdated = await EstateModel.findByIdAndUpdate(
    estate.id,
    {
      ...fields,
      coverImg: currentCoverImagePublicId,
      thumbnail: currentThumbnailPublicId,
    },
    { new: true }
  );
  return resultUpdated;
};

function convertCoordinatesStringToNumber(coordinates) {
  return coordinates.split(',').map((value) => parseFloat(value));
}

export {
  createEstate,
  getInfoEstate,
  deleteEstate,
  updateEstate,
  findContactEstate,
};
