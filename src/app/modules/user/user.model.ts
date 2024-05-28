import mongoose, { Schema, Model, Error } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUserExtends } from './user.interface';
import config from '../../config';

import { generateUserToken } from './user.utils';

const userSchema: Schema<TUserExtends> = new Schema<TUserExtends>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'block'],
      default: 'active',
    },
    token: {
      type: String,
    },
    my_favorite: [
      {
        type: String,
      },
    ],
    my_card: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Ensure the passwords match
userSchema.pre('save', function (next) {
  if (this.password !== this.confirmPassword) {
    return next(new Error('Passwords do not match'));
  }

  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
    (err: Error | undefined, hash: string) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      this.confirmPassword = '';
      next();
    },
  );
});

// Pre-save hook to generate a 32-character token
userSchema.pre('save', async function (next) {
  if (!this.token) {
    this.token = await generateUserToken();
  }
  next();
});

userSchema.pre('find', function (next) {
  this.where({ status: { $ne: 'block' } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.where({ status: { $ne: 'block' } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { status: { $ne: 'block' } } });
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User: Model<TUserExtends> = mongoose.model<TUserExtends>(
  'User',
  userSchema,
);
