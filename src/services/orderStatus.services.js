import { OrderStatusModel } from '../models/index.js';

export const getAllOrderStatus = async () => {
  try {
    const orderStatus = await OrderStatusModel.find();
    return orderStatus;
  } catch (error) {
    throw new Error(error);
  }
};
