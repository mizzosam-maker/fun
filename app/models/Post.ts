import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  id: string;
  channelId: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  linkUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  createdAt: Date;
}

const PostSchema = new Schema<IPost>({
  id: { type: String, required: true, unique: true },
  channelId: { type: String, required: true },
  authorId: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  videoUrl: { type: String },
  linkUrl: { type: String },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);