import { getAllRoles } from './role.controller.js';
import { getAllOrderStatus } from './orderStatus.controller.js';

const roleController = {
  getAllRoles,
};

const orderStatusController = {
  getAllOrderStatus,
};

export { roleController, orderStatusController };
