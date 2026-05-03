import { authResolvers } from './auth.resolver';
import { chapterResolvers } from './chapter.resolver';
import { progressResolvers } from './progress.resolver';

export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...chapterResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...progressResolvers.Mutation,
  },
};
