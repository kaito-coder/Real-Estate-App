import { getAllRoles } from './role.controller.js';
import { getAllOrderStatus } from './orderStatus.controller.js';
import { getAllEstateStatus } from './estateStatus.controller.js';
import { getAllEstateType } from './estateType.controller.js';

const roleController = {
  getAllRoles,
};

const orderStatusController = {
  getAllOrderStatus,
};

const estateStatusController = {
  getAllEstateStatus,
};

const estateTypeController = {
  getAllEstateType,
};
export {
  roleController,
  orderStatusController,
  estateStatusController,
  estateTypeController,
};
