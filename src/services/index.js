import { getAllRoles } from './role.services.js';
import { getAllOrderStatus } from './orderStatus.services.js';

const roleService = {
  getAllRoles,
};

const orderStatusService = {
  getAllOrderStatus,
};

export { roleService, orderStatusService };
