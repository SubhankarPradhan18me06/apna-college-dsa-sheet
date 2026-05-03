import Progress from '../../models/Progress';
import { AuthContext } from './auth.resolver';

export const progressResolvers = {
  Mutation: {
    toggleProgress: async (
      _: unknown,
      { problemId }: { problemId: string },
      { user }: AuthContext
    ) => {
      if (!user) throw new Error('Authentication required');

      const existing = await Progress.findOne({ userId: user._id, problemId });

      if (existing) {
        existing.completed = !existing.completed;
        existing.completedAt = existing.completed ? new Date() : undefined;
        await existing.save();
        return { problemId, completed: existing.completed };
      } else {
        await Progress.create({
          userId: user._id,
          problemId,
          completed: true,
          completedAt: new Date(),
        });
        return { problemId, completed: true };
      }
    },
  },
};
