import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is requried'],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      minLengh: 8,
      required: [true, 'Password is required'],
      select: false,
    },
    passwordConfirmation: {
      type: String,
      required: true,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
      select: false,
    },
    estates: [
      {
        type: Schema.Types.ObjectId,
        ref: 'EstateModel',
      },
    ],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
      maxLength: 10,
    },
    profileImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('Users', userSchema);
export default UserModel;
