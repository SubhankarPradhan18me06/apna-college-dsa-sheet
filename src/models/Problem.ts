import mongoose, { Document, Schema } from 'mongoose';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface IProblem extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  number: number;
  difficulty: Difficulty;
  chapterId: mongoose.Types.ObjectId;
  youtubeUrl?: string;
  leetcodeUrl?: string;
  articleUrl?: string;
  order: number;
  createdAt: Date;
}

const problemSchema = new Schema<IProblem>(
  {
    title: { type: String, required: true, trim: true },
    number: { type: Number, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
    youtubeUrl: { type: String, default: '' },
    leetcodeUrl: { type: String, default: '' },
    articleUrl: { type: String, default: '' },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProblem>('Problem', problemSchema);
