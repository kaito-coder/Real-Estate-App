import { EstateModel } from '../models/index.js';
import { handleError } from '../utils/errHandler.js';
import status from 'http-status';
import { ESTATE_MESSAGES } from '../configs/estates.config.js';

export const checkExistanceEstate = async (req, res, next) => {
  try {
    const estateId = req.params.id;
    const isExist = await EstateModel.findById(estateId);
    if (!isExist) {
      return handleError(
        ESTATE_MESSAGES.NOTE_FOUND_WITH_ID,
        res,
        status.NOT_FOUND
      );
    }
  } catch (error) {
    return next(error);
  }
  next();
};

export const checkIsOwner = async (req, res, next) => {
  try {
    const estateId = req.params.id;
    const salerId = req.user.id;
    const estateFound = await EstateModel.findById(estateId);
    if (salerId !== estateFound.owner.toString()) {
      return handleError(status[status.FORBIDDEN], res, status.FORBIDDEN);
    }
  } catch (error) {
    return next(error);
  }
  next();
};
