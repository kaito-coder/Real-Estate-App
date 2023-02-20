import mongoose from 'mongoose';

const { Schema } = mongoose;

const favouriteSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
    required: [true, 'Who like this estate?'],
  },
  estate: {
    type: Schema.Types.ObjectId,
    ref: 'EstateModel',
    required: [true, 'This estate liked by who?'],
  },
});

const FavouriteEstateModel = mongoose.model(
  'FavouriteEstates',
  favouriteSchema
);

export default FavouriteEstateModel;
