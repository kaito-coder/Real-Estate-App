import * as dotenv from 'dotenv';
dotenv.config();

const cloud_name = process.env.CLOUDINARY_NAME;
const api_key = process.env.CLOUDINARY_KEY;
const api_secret = process.env.CLOUDINARY_SECRET;
export const cloudinaryConfig = { cloud_name, api_key, api_secret };
export const { NODE_ENV } = process.env;
export const PORT = process.env.PORT || 3000;
