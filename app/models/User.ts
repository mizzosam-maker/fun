

// import mongoose, { Schema, Document } from 'mongoose';

// export interface IUser extends Document {
//   id: string;
//   name: string;
//   username: string;
//   profileImage?: string;
//   bio?: string;
//   joinedAt: Date;
// }

// const UserSchema = new Schema<IUser>({
//   id: { type: String, required: false, unique: false },
//   name: { type: String, required: false },
//   username: { type: String, required: false, unique: false },
//   profileImage: { type: String },
//   bio: { type: String },
//   joinedAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// app/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  bio?: string;
  joinedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  bio: { type: String },
  joinedAt: { type: Date, default: Date.now },
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return ;
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
  } catch (error: any) {
    
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);