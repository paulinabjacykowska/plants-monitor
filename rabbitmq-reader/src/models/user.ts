import { Schema, model, Model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
});

const User: Model<IUser> = model('User', UserSchema);

export default User;
