import { RoleModel } from '../models/index.js';
import AppError from '../utils/AppError.js';
import status from 'http-status';

export const getAllRoles = async () => {
  try {
    const roles = await RoleModel.find();
    return roles;
  } catch (error) {
    throw new AppError(error.message, status.BAD_REQUEST);
  }
};
