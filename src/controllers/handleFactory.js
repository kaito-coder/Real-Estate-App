import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/AppError.js';
import APIFeatures from './../utils/APIFeatures.js';
import status from 'http-status';

const message = {
  404: 'No document found with that ID',
  200: 'Success',
  204: null,
};
const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(message[404], status.NOT_FOUND));
    }

    res.status(status.NO_CONTENT).json({
      message: message[204],
      data: null,
    });
  });

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(message[404], status.NOT_FOUND));
    }

    res.status(status.OK).json({
      message: message[200],
      data: {
        record: doc,
      },
    });
  });

const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(status.CREATED).json({
      message: message[200],
      data: {
        record: doc,
      },
    });
  });

const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError(message[404], status.NOT_FOUND));
    }

    res.status(status.OK).json({
      message: message[200],
      data: {
        record: doc,
      },
    });
  });

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on estate (hack)
    let filter = {};
    if (req.params.estateId) filter = { tour: req.params.estateId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(status.OK).json({
      message: message[200],
      data: {
        records: doc,
        results: doc.length,
      },
    });
  });

const factory = { deleteOne, createOne, updateOne, getAll, getOne };
export default factory;
