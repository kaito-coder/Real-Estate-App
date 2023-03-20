import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import status from 'http-status';
import { message } from '../configs/commentMessageRes.js';

export const setEstateUserIds = catchAsync(async (req, res, next) => {
  if (!req.body?.estate) req.body.estate = req.params.estateId;
  if (!req.body?.user) req.body.user = req.user.id;
  next();
});

export const checkIfUserIsOwner = (Model) =>
  catchAsync(async (req, res, next) => {
    const checkModel = await Model.findById(req.params.id);
    if (!checkModel.user.toString() === req.user.id) {
      return next(new AppError(message.errorUserNotOwner, status.UNAUTHORIZED));
    }
    next();
  });
