import { EstateModel } from '../models/index.js';
import { handleError } from '../utils/errHandler.js';
import status from 'http-status';

export const checkExistanceEstate = async (req, res, next) => {
  try {
    const estateId = req.params.id;
    const isExist = await EstateModel.findById(estateId);
    if (!isExist) {
      handleError(status[status.NOT_FOUND], res, status.NOT_FOUND);
    }
  } catch (error) {
    handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
  }
  next();
};

export const checkIsOwner = async (req, res, next) => {
  try {
    const estateId = req.params.id;
    const salerId = req.user.id;
    const estateFound = await EstateModel.findById(estateId);
    if (salerId !== estateFound.owner.toString()) {
      handleError(status[status.FORBIDDEN], res, status.FORBIDDEN);
    }
  } catch (error) {
    handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
  }
  next();
};
