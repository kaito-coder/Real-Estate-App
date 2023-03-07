import express from 'express';
import userRouter from './userRoutes.js';
import orderStatusRouter from './orderStatus.router.js';
import roleRouter from './role.router.js';
import estateStatusRouter from './estateStatus.router.js';
import estateTypeRouter from './estateType.router.js';

const router = express.Router();

router.use('/order-status', orderStatusRouter);
router.use('/roles', roleRouter);
router.use('/users', userRouter);
router.use('/estate-status', estateStatusRouter);
router.use('/estate-types', estateTypeRouter);
export default router;
