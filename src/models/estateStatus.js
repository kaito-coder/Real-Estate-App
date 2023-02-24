import mongoose from 'mongoose';

const estateStatusChema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Status of esate must have name'],
    },
  },
  {
    timestamps: true,
  }
);
const EstateStatusModel = mongoose.model('EstateStatus', estateStatusChema);
export default EstateStatusModel;
