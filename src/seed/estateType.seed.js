import { EstateTypeModel } from '../models/index.js';
import seedingValue from './helper.seed.js';

async function seedEstateType(type) {
  await seedingValue(EstateTypeModel, type);
}

export default seedEstateType;
