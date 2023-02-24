import mongoose from 'mongoose';

const { Schema } = mongoose;

const favouriteSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, 'Whisher is required'],
    },
    estate: {
      type: Schema.Types.ObjectId,
      ref: 'EstateModel',
      required: [true, 'Estate liked is required'],
    },
  },
  {
    timestamps: true,
  }
);

const FavouriteEstateModel = mongoose.model(
  'FavouriteEstates',
  favouriteSchema
);

export default FavouriteEstateModel;
