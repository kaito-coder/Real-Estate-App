import express from 'express';
import {
  signup,
  login,
  protect,
  // restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
} from '../controllers/authController.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/updatePassword', protect, updatePassword);
userRouter.post('/resetPassword/:token', resetPassword);

export default userRouter;
