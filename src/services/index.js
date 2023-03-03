import { getAllRoles } from './role.services.js';
import { getAllOrderStatus } from './orderStatus.services.js';
import { getAllEstateStatus } from './estateStatus.services.js';

const roleService = {
  getAllRoles,
};

const orderStatusService = {
  getAllOrderStatus,
};

const estateStatusService = {
  getAllEstateStatus,
};

export { roleService, orderStatusService, estateStatusService };
