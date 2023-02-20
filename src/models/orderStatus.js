import mongoose from 'mongoose';

const orderStatusChema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['pending', 'confirmed', 'done'],
    default: 'pending',
  },
  description: String,
  //etc
});
const OrderStatusModel = mongoose.model('OrderStatus', orderStatusChema);
export default OrderStatusModel;
