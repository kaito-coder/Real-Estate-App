import { getAllRoles } from './role.services.js';
import { getAllOrderStatus } from './orderStatus.services.js';
import { getAllEstateStatus } from './estateStatus.services.js';
import { createEstate } from './estate.services.js';

const roleService = {
  getAllRoles,
};

const orderStatusService = {
  getAllOrderStatus,
};

const estateStatusService = {
  getAllEstateStatus,
};

const estateService = {
  createEstate,
};

export { roleService, orderStatusService, estateStatusService, estateService };
