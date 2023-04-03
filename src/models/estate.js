import mongoose from 'mongoose';
import { MapPointer } from '../utils/mappointer.js';

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
    },
    area: {
      type: Number,
      require: [true, 'Area is required'],
    },
    neighborHood: {
      type: String,
    },
    price: {
      type: Number,
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
      ref: 'EstateStatuses',
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
    coordinates: {
      type: {
        lat: Number,
        lng: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);
estateSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'type',
    select: 'name _id',
  }).populate({
    path: 'currentStatus',
    select: 'name _id',
  });
  next();
});

estateSchema.pre('save', async function (next) {
  try {
    if (!this.address) {
      const defaultCoordinates = {
        lat: 16.0720759,
        lng: 107.9133182,
      };
      if (!this.coordinates.lat || !this.coordinates.lng) {
        this.coordinates = defaultCoordinates;
      }
      const { street, district, city, county, countryName } =
        await MapPointer.getLocationByCoordinates({
          lat: this.coordinates.lat,
          lng: this.coordinates.lng,
        });
      this.address = `${street}, ${district}, ${city}, ${county}, ${countryName}`;
    }
  } catch (error) {
    throw new Error(error.message);
  }
  next();
});
const EstateModel = mongoose.model('Estates', estateSchema);
export default EstateModel;
