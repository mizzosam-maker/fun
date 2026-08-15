import mongoose, { Schema, Document } from 'mongoose';

export interface IChannel extends Document {
  id: string;
  name: string;
  handle: string;
  description?: string;
  imageUrl?: string;
  category: string;
  isPublic: boolean;
  ownerId: string;
  adminIds: string[];
  memberIds: string[];
  memberCount: number;
  postCount: number;
  views: number;
  engagement: number;
  createdAt: Date;
}

const ChannelSchema = new Schema<IChannel>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  handle: { type: String, required: true, unique: true },
  description: { type: String },
  imageUrl: { type: String },
  category: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
  ownerId: { type: String, required: true },
  adminIds: { type: [String], default: [] },
  memberIds: { type: [String], default: [] },
  memberCount: { type: Number, default: 0 },
  postCount: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  engagement: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Channel || mongoose.model<IChannel>('Channel', ChannelSchema);