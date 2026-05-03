import jwt from 'jsonwebtoken';
import { Response } from 'express';
import User, { IUser } from '../../models/User';

export interface AuthContext {
  user?: IUser | null;
  res: Response;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const setAuthCookie = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' && process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const authResolvers = {
  Query: {
    me: async (_: unknown, __: unknown, { user }: AuthContext) => {
      if (!user) return null;
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
      };
    },
  },
  Mutation: {
    login: async (
      _: unknown,
      { email, password }: { email: string; password: string },
      { res }: AuthContext
    ) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid email or password');

      const isMatch = await user.comparePassword(password);
      if (!isMatch) throw new Error('Invalid email or password');

      setAuthCookie(res, user._id.toString());

      return {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          createdAt: user.createdAt.toISOString(),
        },
        message: 'Login successful',
      };
    },

    register: async (
      _: unknown,
      { name, email, password }: { name: string; email: string; password: string },
      { res }: AuthContext
    ) => {
      const existing = await User.findOne({ email });
      if (existing) throw new Error('Email already in use');

      const user = await User.create({ name, email, password });

      setAuthCookie(res, user._id.toString());

      return {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          createdAt: user.createdAt.toISOString(),
        },
        message: 'Registration successful',
      };
    },

    logout: async (_: unknown, __: unknown, { res }: AuthContext) => {
      res.clearCookie('jwt');
      return true;
    },
  },
};
