import roleRouter from './role.router.js';
import express from 'express';
import userRouter from './userRoutes.js';

const router = express.Router();

router.use('/role', roleRouter);
router.use('/users', userRouter);

export default router;
