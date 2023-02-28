import seedEstateStatus from './estateStatus.seed.js';
import seedEstateType from './estateType.seed.js';
import seedOrderStatus from './orderStatus.seed.js';
import seedRole from './role.seed.js';

import { estateStatus, estateTypes, orderStatus, roles } from './data.js';
import connectDataBase from '../database/connectDB.js';

import * as dotenv from 'dotenv';
dotenv.config();
await connectDataBase();
await seedEstateStatus(estateStatus);
await seedEstateType(estateTypes);
await seedOrderStatus(orderStatus);
await seedRole(roles);
