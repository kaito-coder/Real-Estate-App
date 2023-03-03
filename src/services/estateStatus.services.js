import { EstateStatusModel } from '../models/index.js';

export const getAllEstateStatus = async () => {
  try {
    const estateStatus = await EstateStatusModel.find();
    return estateStatus;
  } catch (error) {
    throw new Error(error);
  }
};
