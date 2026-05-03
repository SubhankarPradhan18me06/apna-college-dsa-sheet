import mongoose from 'mongoose';
import Chapter from '../../models/Chapter';
import Problem from '../../models/Problem';
import Progress from '../../models/Progress';
import { AuthContext } from './auth.resolver';

export const chapterResolvers = {
  Query: {
    getChapters: async (_: unknown, __: unknown, { user }: AuthContext) => {
      const chapters = await Chapter.find().sort({ order: 1 });
      const problems = await Problem.find().sort({ order: 1 });

      let completedSet = new Set<string>();
      if (user) {
        const progressDocs = await Progress.find({ userId: user._id, completed: true });
        completedSet = new Set(progressDocs.map((p) => p.problemId.toString()));
      }

      return chapters.map((chapter) => {
        const chapterProblems = problems.filter(
          (p) => p.chapterId.toString() === chapter._id.toString()
        );
        const completedProblems = chapterProblems.filter((p) =>
          completedSet.has(p._id.toString())
        ).length;

        return {
          id: chapter._id.toString(),
          title: chapter.title,
          description: chapter.description,
          icon: chapter.icon,
          order: chapter.order,
          totalProblems: chapterProblems.length,
          completedProblems,
          problems: chapterProblems.map((p) => ({
            id: p._id.toString(),
            title: p.title,
            number: p.number,
            difficulty: p.difficulty,
            chapterId: p.chapterId.toString(),
            youtubeUrl: p.youtubeUrl,
            leetcodeUrl: p.leetcodeUrl,
            articleUrl: p.articleUrl,
            order: p.order,
            completed: completedSet.has(p._id.toString()),
          })),
        };
      });
    },

    getChapter: async (_: unknown, { id }: { id: string }, { user }: AuthContext) => {
      const chapter = await Chapter.findById(id);
      if (!chapter) throw new Error('Chapter not found');

      const problems = await Problem.find({ chapterId: id }).sort({ order: 1 });

      let completedSet = new Set<string>();
      if (user) {
        const progressDocs = await Progress.find({
          userId: user._id,
          problemId: { $in: problems.map((p) => p._id) },
          completed: true,
        });
        completedSet = new Set(progressDocs.map((p) => p.problemId.toString()));
      }

      const completedProblems = problems.filter((p) =>
        completedSet.has(p._id.toString())
      ).length;

      return {
        id: chapter._id.toString(),
        title: chapter.title,
        description: chapter.description,
        icon: chapter.icon,
        order: chapter.order,
        totalProblems: problems.length,
        completedProblems,
        problems: problems.map((p) => ({
          id: p._id.toString(),
          title: p.title,
          number: p.number,
          difficulty: p.difficulty,
          chapterId: p.chapterId.toString(),
          youtubeUrl: p.youtubeUrl,
          leetcodeUrl: p.leetcodeUrl,
          articleUrl: p.articleUrl,
          order: p.order,
          completed: completedSet.has(p._id.toString()),
        })),
      };
    },

    getStats: async (_: unknown, __: unknown, { user }: AuthContext) => {
      const allProblems = await Problem.find();
      const total = allProblems.length;
      const easyTotal = allProblems.filter((p) => p.difficulty === 'Easy').length;
      const mediumTotal = allProblems.filter((p) => p.difficulty === 'Medium').length;
      const hardTotal = allProblems.filter((p) => p.difficulty === 'Hard').length;

      if (!user) {
        return { totalProblems: total, completedProblems: 0, easyTotal, easyCompleted: 0, mediumTotal, mediumCompleted: 0, hardTotal, hardCompleted: 0, percentage: 0 };
      }

      const completed = await Progress.find({ userId: user._id, completed: true }).populate('problemId');
      const completedCount = completed.length;
      const easyCompleted = completed.filter((p: any) => p.problemId?.difficulty === 'Easy').length;
      const mediumCompleted = completed.filter((p: any) => p.problemId?.difficulty === 'Medium').length;
      const hardCompleted = completed.filter((p: any) => p.problemId?.difficulty === 'Hard').length;

      return {
        totalProblems: total,
        completedProblems: completedCount,
        easyTotal,
        easyCompleted,
        mediumTotal,
        mediumCompleted,
        hardTotal,
        hardCompleted,
        percentage: total > 0 ? Math.round((completedCount / total) * 100) : 0,
      };
    },
  },
};
