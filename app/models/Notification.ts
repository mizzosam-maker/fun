import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  channelId?: string;
  postId?: string;
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  channelId: { type: String },
  postId: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);