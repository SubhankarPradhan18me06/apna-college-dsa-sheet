import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { typeDefs } from './graphql/schema/typeDefs';
import { resolvers } from './graphql/resolvers';
import connectDB from './config/db';
import { authMiddleware, AuthRequest } from './middleware/auth';

const startServer = async () => {
  await connectDB();

  const app = express();

  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    })
  );
  app.use(authMiddleware);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }: { req: AuthRequest; res: express.Response }) => ({
      user: req.user,
      res,
    }),
  });

  await server.start();
  server.applyMiddleware({ app: app as any, cors: false });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer().catch(console.error);
