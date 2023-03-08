import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'Author is required'],
    },
    estate: {
      type: Schema.Types.ObjectId,
      ref: 'Estates',
      required: [true, 'estate is required'],
    },
    content: {
      type: String,
    },
    isEdit: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
commentSchema.pre('^find', function (next) {
  this.populate({
    path: 'user',
    select: 'lastName firstName profileImage',
  });
});
const CommentModel = mongoose.model('Comments', commentSchema);
export default CommentModel;
