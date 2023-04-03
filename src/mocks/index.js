import { estates_v2, users } from './data.js';
import createSampleUsers from './user.samples.js';
import createSampleEstates from './estate.samples.js';
import { connectDataBase, disConnectDataBase } from '../database/connectDB.js';

import * as dotenv from 'dotenv';
import EstateTypeModel from '../models/estateType.js';
import EstateStatusModel from '../models/estateStatus.js';
dotenv.config();
await connectDataBase();
await createSampleUsers(users);
const availableStatusEstate = await EstateStatusModel.findOne({
  name: 'Available',
});
const houseTypeEstate = await EstateTypeModel.findOne({ name: 'House' });
await createSampleEstates(
  estates_v2(availableStatusEstate.id, houseTypeEstate.id)
);
await disConnectDataBase();
console.log('Create samples data successfuly');
