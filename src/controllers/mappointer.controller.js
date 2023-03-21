import { MapPointer } from '../utils/mappointer.js';
import status from 'http-status';
import { handleError } from '../utils/errHandler.js';

export const mapPointerController = {
  getAllProvinces: async (req, res) => {
    try {
      const provinces = await MapPointer.getAllProvinces();
      return res.status(status.OK).json({
        message: status[status.OK],
        data: { total: provinces.length, records: provinces },
      });
    } catch (error) {
      handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
    }
  },
  getAllDistrictsByProvinceCode: async (req, res) => {
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
      handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
    }
  },
  getAllWardsByDistrictCode: async (req, res) => {
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
      handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
    }
  },
  getRelativeCoordinatesByAdress: async (req, res) => {
    try {
      const { address } = req.params;
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
      handleError(error, res, status.INTERNAL_SERVER_ERROR);
    }
  },
};
