import mongoose from 'mongoose';

const { Schema } = mongoose;

const estateSchema = new mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'Owner is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    area: {
      type: String,
      require: [true, 'Area is required'],
    },
    neighborHood: {
      type: String,
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
    },
    type: {
      type: Schema.Types.ObjectId,
      required: [true, 'This estate must have type of it'],
      ref: 'EstateTypes',
    },
    currentStatus: {
      type: Schema.Types.ObjectId,
      required: [true, 'This esate must have status of it'],
      ref: 'EstateStatus',
    },
    coverImg: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    thumbnail: {
      type: [String],
    },
    bedRoom: {
      type: Number,
    },
    bathRoom: {
      type: Number,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EstateModel = mongoose.model('Estates', estateSchema);
export default EstateModel;
