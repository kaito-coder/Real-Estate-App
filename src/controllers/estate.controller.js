import { estateService } from '../services/index.js';
import { handleError } from '../utils/errHandler.js';
import status from 'http-status';
import factory from './handleFactory.js';
import EstateModel from '../models/estate.js';

const createEstate = async (req, res) => {
  try {
    const estateAdded = await estateService.createEstate({
      salerId: req.user.id,
      body: req.body,
      files: req.files,
    });
    return res.status(status.OK).json({
      message: status[status.CREATED],
      data: { records: estateAdded },
    });
  } catch (error) {
    handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
  }
};

const getAllEstate = factory.getAll(EstateModel);

export { createEstate, getAllEstate };
