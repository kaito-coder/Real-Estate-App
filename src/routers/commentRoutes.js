import express from 'express';
import commentController from '../controllers/commentController.js';
import authController from '../controllers/authController.js';

const commentRouter = express.Router({ mergeParams: true });

commentRouter.use(authController.protect);

commentRouter
  .route('/')
  .get(commentController.getAllComments)
  .post(commentController.setEstateUserIds, commentController.createComment);

commentRouter
  .route('/:id')
  .get(commentController.getComment)
  .delete(commentController.checkIfUserIsOwner, commentController.deleteComment)
  .patch(commentController.checkIfUserIsOwner, commentController.updateComment);

export default commentRouter;
