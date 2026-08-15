import mongoose, { Schema, Document } from 'mongoose';

export interface IEarnings extends Document {
  userId: string;
  available: number;
  pending: number;
  totalEarned: number;
}

const EarningsSchema = new Schema<IEarnings>({
  userId: { type: String, required: true, unique: true },
  available: { type: Number, default: 0 },
  pending: { type: Number, default: 0 },
  totalEarned: { type: Number, default: 0 },
});

export default mongoose.models.Earnings || mongoose.model<IEarnings>('Earnings', EarningsSchema);