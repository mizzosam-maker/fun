// /*import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   code: {
//     type: String,
//     required: true,
//     unique: true,
//     uppercase: true,
//   },
//   pin: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.User || mongoose.model('User', UserSchema);*/

// /*import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   code: {
//     type: String,
//     required: true,
//     unique: true,
//     uppercase: true,
//   },
//   pin: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.User || mongoose.model('User', UserSchema);*/

// // app/models/User.ts
// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   code: {
//     type: String,
//     required: true,
//     unique: true,
//     uppercase: true,
//   },
//   pin: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.User || mongoose.model('User', UserSchema);


import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  username: string;
  profileImage?: string;
  bio?: string;
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  profileImage: { type: String },
  bio: { type: String },
  joinedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);