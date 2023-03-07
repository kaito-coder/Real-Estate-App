import CommentModel from '../models/comment.js';
import factory from '../controllers/handleFactory.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import status from 'http-status';
import { message } from '../configs/commentMessageRes.js';

const setEstateUserIds = catchAsync(async (req, res, next) => {
  if (!req.body.estate) req.body.estate = req.params.id;
  if (!req.body.user) req.user.id;
  next();
});
const checkIfUserIsOwner = catchAsync(async (req, res, next) => {
  const comment = await CommentModel.findById(req.params.id);
  if (!comment.author.toString() === req.user.id.toString()) {
    return next(new AppError(message.errorUserNotOwner, status.UNAUTHORIZED));
  }
  next();
});
const getAllComments = factory.getAll(CommentModel);
const getComment = factory.getOne(CommentModel);
const createComment = factory.createOne(CommentModel);
const updateComment = factory.updateOne(CommentModel);
const deleteComment = factory.deleteOne(CommentModel);

const commentController = {
  setEstateUserIds,
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  checkIfUserIsOwner,
};
export default commentController;
