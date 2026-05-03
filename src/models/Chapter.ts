import mongoose, { Document, Schema } from 'mongoose';

export interface IChapter extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  icon: string;
  order: number;
  createdAt: Date;
}

const chapterSchema = new Schema<IChapter>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IChapter>('Chapter', chapterSchema);
