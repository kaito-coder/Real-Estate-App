import mongoose from 'mongoose';

const estateTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['house', 'apartment', 'building'],
    default: 'house',
  },
  description: String,
  // etc
});
const EstateTypeModel = mongoose.model('EstateTypes', estateTypeSchema);
export default EstateTypeModel;
