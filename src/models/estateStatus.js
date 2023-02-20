import mongoose from 'mongoose';

const estateStatusChema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['sold', 'available', 'dealing'],
    default: 'available',
  },
  description: String,
  //etc
});
const EstateStatusModel = mongoose.model('EstateStatus', estateStatusChema);
export default EstateStatusModel;
