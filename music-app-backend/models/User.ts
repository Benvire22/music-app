import mongoose, { HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserField, UserMethods, UserModel } from '../types';
import { randomUUID } from 'node:crypto';

const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema<UserField, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function(value: string): Promise<boolean> {
        if (!(this as HydratedDocument<UserField>).isModified('username')) {
          return true;
        }

        const user = await User.findOne({ username: value });
        return !user;
      },
      message: 'This user is already registered!',
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  this.password = await bcrypt.hash(this.password, salt);
  console.log('I am about to save');

  return next();
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
}

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<UserField, UserModel>('User', UserSchema);
export default User;
