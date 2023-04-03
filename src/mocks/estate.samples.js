import seedingValue from '../seed/helper.seed.js';

import { EstateModel } from '../models/index.js';

async function createSampleEstates(estates) {
  try {
    await seedingValue(EstateModel, estates);
  } catch (error) {
    throw new Error(error);
  }
}

export default createSampleEstates;
