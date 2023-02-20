import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, 'buyer is required'],
    },
    estate: {
      type: Schema.Types.ObjectId,
      ref: 'EstateModel',
      required: [true, 'estate is required'],
    },
    price_deal: {
      type: Number,
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: 'OrderStatusModel',
      required: [true, 'status is required'],
    },
  },
  {
    timestamps: true,
  }
);
const OrderModel = mongoose.model('Orders', orderSchema);
export default OrderModel;
