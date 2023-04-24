import { MapPointer } from '../utils/mappointer.js';
import status from 'http-status';

export const mapPointerController = {
  getAllProvinces: async (req, res, next) => {
    try {
      const provinces = await MapPointer.getAllProvinces();
      return res.status(status.OK).json({
        message: status[status.OK],
        data: { total: provinces.length, records: provinces },
      });
    } catch (error) {
      return next(error);
    }
  },
  getAllDistrictsByProvinceCode: async (req, res, next) => {
    try {
      const { provinceCode } = req.query;
      const districts = await MapPointer.getAllDistrictsByProvinceCode(
        provinceCode
      );
      return res.status(status.OK).json({
        message: status[status.OK],
        data: {
          total: districts.length,
          records: districts,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
  getAllWardsByDistrictCode: async (req, res, next) => {
    try {
      const { districtCode } = req.query;
      const wards = await MapPointer.getAllWardsByDistrictCode(districtCode);
      return res.status(status.OK).json({
        message: status[status.OK],
        data: {
          total: wards.length,
          records: wards,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
  getRelativeCoordinatesByAdress: async (req, res, next) => {
    try {
      const { address } = req.query;
      const corrdinates = await MapPointer.getRelativeCoordinatesByAdress(
        address
      );
      return res.status(status.OK).json({
        message: status[status.OK],
        data: {
          records: corrdinates,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
  getLocationByCoordinates: async (req, res, next) => {
    try {
      const { lat, lng } = req.query;
      const location = await MapPointer.getLocationByCoordinates({ lat, lng });
      return res.status(status.OK).json({
        message: status[status.OK],
        records: {
          data: location,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
};
