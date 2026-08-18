// import mongoose, { Schema, Document } from 'mongoose';

// export interface IPost extends Document {
//   id: string;
//   channelId: string;
//   authorId: string;
//   content: string;
//   imageUrl?: string;
//   videoUrl?: string;
//   linkUrl?: string;
//   likes: number;
//   comments: number;
//   shares: number;
//   views: number;
//   createdAt: Date;
// }

// const PostSchema = new Schema<IPost>({
//   id: { type: String, required: true, unique: true },
//   channelId: { type: String, required: true },
//   authorId: { type: String, required: true },
//   content: { type: String, required: true },
//   imageUrl: { type: String },
//   videoUrl: { type: String },
//   linkUrl: { type: String },
//   likes: { type: Number, default: 0 },
//   comments: { type: Number, default: 0 },
//   shares: { type: Number, default: 0 },
//   views: { type: Number, default: 0 },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

// app/models/Post.ts
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
  likedBy: string[];
  comments: number;
  shares: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
  id: { type: String, required: true, unique: true },
  channelId: { type: String, required: true, ref: 'Channel' },
  authorId: { type: String, required: true, ref: 'User' },
  content: { type: String, required: true },
  imageUrl: { type: String },
  videoUrl: { type: String },
  linkUrl: { type: String },
  likes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update channel post count when a post is created
PostSchema.post('save', async function(doc) {
  try {
    const Channel = mongoose.model('Channel');
    await Channel.findOneAndUpdate(
      { id: doc.channelId },
      { $inc: { postCount: 1 } }
    );
  } catch (error) {
    console.error('Error updating channel post count:', error);
  }
});

// Update channel post count when a post is deleted
PostSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    try {
      const Channel = mongoose.model('Channel');
      await Channel.findOneAndUpdate(
        { id: doc.channelId },
        { $inc: { postCount: -1 } }
      );
    } catch (error) {
      console.error('Error updating channel post count:', error);
    }
  }
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);