import { EstateModel } from '../models/index.js';
import { handleError } from '../utils/errHandler.js';
import status from 'http-status';

export const checkExistanceEstate = async (req, res, next) => {
  try {
    const estateId = req.params.id;
    const isExist = await EstateModel.findById(estateId);
    if (!isExist) {
      return next(handleError(status[status.NOT_FOUND], res, status.NOT_FOUND));
    }
  } catch (error) {
    return next(handleError(error.message, res, status.INTERNAL_SERVER_ERROR));
  }
  next();
};
