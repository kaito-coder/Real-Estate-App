import express from 'express';
import userRouter from './userRoutes.js';
import orderStatusRouter from './orderStatus.router.js';
import roleRouter from './role.router.js';

const router = express.Router();

router.use('/order-status', orderStatusRouter);
router.use('/role', roleRouter);
router.use('/users', userRouter);

export default router;
