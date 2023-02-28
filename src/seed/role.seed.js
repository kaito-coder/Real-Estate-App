import { RoleModel } from '../models/index.js';
import seedingValue from './helper.seed.js';

async function seedRole(role) {
  await seedingValue(RoleModel, role);
}
export default seedRole;
