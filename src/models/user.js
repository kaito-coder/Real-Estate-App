import mongoose from 'mongoose';
import validator from 'validator';
import bycrypt from 'bcryptjs';
import crypto from 'crypto';

const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'please tell us your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'please tell us your last name'],
    },
    email: {
      type: String,
      required: [true, 'please provide a valid email'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'please provide a valid email'],
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ['male', 'female', 'others'],
    },
    nationalId: {
      type: String,
      required: [true, 'please provide your national id'],
      trim: true,
    },
    password: {
      type: String,
      minlength: [8, 'password must be at least 8 characters long'],
      required: [true, 'Password is required'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        // This only works with CREATE & SAVE!!!!!
        validator: function (el) {
          return el === this.password;
        },
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
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // hash the password with cost of 12
  this.password = await bycrypt.hash(this.password, 12);
  //delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
});

userSchema.methods.correctPassword = async function (
  canidatePassword,
  userPassword
) {
  return await bycrypt.compare(canidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const UserModel = mongoose.model('Users', userSchema);
export default UserModel;
