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

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/updatePassword', protect, updatePassword);
router.post('/resetPassword/:token', resetPassword);

export default router;
