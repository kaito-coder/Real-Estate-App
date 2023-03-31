import express from 'express';
import authController from '../controllers/authController.js';
import { mapPointerController } from '../controllers/mappointer.controller.js';

const mapsRouter = express.Router();

mapsRouter.use(authController.protect);

mapsRouter.get('/provinces', mapPointerController.getAllProvinces);
mapsRouter.get(
  '/districts',
  mapPointerController.getAllDistrictsByProvinceCode
);
mapsRouter.get('/wards', mapPointerController.getAllWardsByDistrictCode);
mapsRouter.get(
  '/coordinates/',
  mapPointerController.getRelativeCoordinatesByAdress
);
mapsRouter.get('/location', mapPointerController.getLocationByCoordinates);
export default mapsRouter;
