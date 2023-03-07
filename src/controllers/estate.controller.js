import { estateService } from '../services/index.js';
import { handleError } from '../utils/errHandler.js';
import status from 'http-status';

const createEstate = async (req, res) => {
  try {
    const estateAdded = await estateService.createEstate({
      salerId: req.user.id,
      body: req.body,
      files: req.files,
    });
    return res.status(status.OK).json({
      message: status[status.CREATED],
      data: { records: estateAdded },
    });
  } catch (error) {
    handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
  }
};

export { createEstate };
