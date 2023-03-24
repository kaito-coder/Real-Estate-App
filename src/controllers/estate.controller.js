import { estateService } from '../services/index.js';
import { handleError } from '../utils/errHandler.js';
import status from 'http-status';
import factory from './handleFactory.js';
import EstateModel from '../models/estate.js';
import catchAsync from '../utils/catchAsync.js';
import APIFeatures from '../utils/APIFeatures.js';

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
    handleError(error, res, status.INTERNAL_SERVER_ERROR);
  }
};

const getAllEstate = factory.getAll(EstateModel);

const getInfoEstate = async (req, res) => {
  try {
    const estateId = req.params.id;
    const estate = await estateService.getInfoEstate(estateId);
    return res.status(status.OK).json({
      message: status[status.OK],
      data: {
        records: estate,
      },
    });
  } catch (error) {
    handleError(error, res, status.INTERNAL_SERVER_ERROR);
  }
};

const getEstateByOwner = catchAsync(async (req, res, next) => {
  const owner = req.user.id;

  const features = new APIFeatures(
    EstateModel.find({ owner: owner }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doc = await features.query;
  res.status(status.OK).json({
    message: status[status.OK],
    data: {
      records: doc,
      total: doc.length,
    },
  });
});
const updateEstate = async (req, res) => {
  const estateId = req.params.id;
  try {
    const estateUpdated = await estateService.updateEstate({
      estateId,
      body: req.body,
      files: req.files,
    });
    return res.status(status.OK).json({
      message: status[status.OK],
      data: { records: estateUpdated },
    });
  } catch (error) {
    handleError(error, res, status.INTERNAL_SERVER_ERROR);
  }
};

const deleteEstate = async (req, res) => {
  try {
    const estateId = req.params.id;
    const estateDeleted = await estateService.deleteEstate(estateId);
    return res.status(status.OK).json({
      message: status[status.OK],
      data: { records: estateDeleted },
    });
  } catch (error) {
    handleError(error, res, status.INTERNAL_SERVER_ERROR);
  }
};

export {
  createEstate,
  getInfoEstate,
  deleteEstate,
  getAllEstate,
  updateEstate,
  getEstateByOwner,
};
