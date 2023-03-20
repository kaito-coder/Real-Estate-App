import { cloudinary } from '../configs/cloudinary.config.js';
import { file64 } from './UriConverter.js';

export const uploadCoverImageEstate = async (
  coverImageResized,
  folderName,
  cb
) => {
  try {
    if (coverImageResized) {
      if (cb) {
        await cb();
      }
      const coverImageUrl = (
        await cloudinary.uploader.upload(file64(coverImageResized).content, {
          folder: folderName,
        })
      )?.secure_url;
      return coverImageUrl;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadThumbnailEstate = async (
  thumbnailResized,
  folderName,
  cb
) => {
  try {
    if (thumbnailResized) {
      if (cb) {
        await cb();
      }
      const thumbnailPromises = thumbnailResized.map((image) => {
        return cloudinary.uploader.upload(file64(image)?.content, {
          folder: folderName,
        });
      });
      const thumbnailPublicId = (await Promise.all(thumbnailPromises))?.map(
        (image) => image.secure_url
      );
      return thumbnailPublicId;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPublicIdByUrl = (url) => {
  return url.split('/')?.slice(-3)?.join('/')?.replace('.png', '');
};
