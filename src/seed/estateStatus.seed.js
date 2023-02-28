import { EstateStatusModel } from '../models/index.js';
import seedingValue from './helper.seed.js';

async function seedEstateStatus(status) {
  await seedingValue(EstateStatusModel, status);
}
export default seedEstateStatus;
