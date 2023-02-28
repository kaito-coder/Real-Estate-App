import { OrderStatusModel } from '../models/index.js';
import seedingValue from './helper.seed.js';

async function seedOrderStatus(status) {
  await seedingValue(OrderStatusModel, status);
}

export default seedOrderStatus;
