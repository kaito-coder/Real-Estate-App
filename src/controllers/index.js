import { getAllRoles } from './role.controller.js';
import { getAllOrderStatus } from './orderStatus.controller.js';
import { getAllEstateStatus } from './estateStatus.controller.js';

const roleController = {
  getAllRoles,
};

const orderStatusController = {
  getAllOrderStatus,
};

const estateStatusController = {
  getAllEstateStatus,
};
export { roleController, orderStatusController, estateStatusController };
