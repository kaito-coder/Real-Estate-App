import express from 'express';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';
import { upload } from '../configs/cloudinary.config.js';
const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.post('/resetPassword/:token', authController.resetPassword);
userRouter.use(authController.protect);
userRouter.patch('/updateMyPassword', authController.updatePassword);
userRouter.get('/profile', userController.getMe, userController.getUser);
userRouter.patch(
  '/profile',
  upload.single('profileImage'),
  userController.updateMe
);

userRouter.route('/').get(userController.getAllUsers);
userRouter
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser);

export default userRouter;
