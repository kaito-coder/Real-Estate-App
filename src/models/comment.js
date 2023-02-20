import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, 'Author is required'],
    },
    estate: {
      type: Schema.Types.ObjectId,
      ref: 'EstateModel',
      required: [true, 'estate is required'],
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const CommentModel = mongoose.model('Comments', commentSchema);
export default CommentModel;
