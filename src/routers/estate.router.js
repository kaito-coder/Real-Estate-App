import express from 'express';
import authController from '../controllers/authController.js';
import { estateController } from '../controllers/index.js';
import { uploader } from '../utils/multer.js';

const estateRouter = express.Router();

estateRouter.use(authController.protect);
estateRouter.post('/', uploader.multifile, estateController.createEstate);

export default estateRouter;
