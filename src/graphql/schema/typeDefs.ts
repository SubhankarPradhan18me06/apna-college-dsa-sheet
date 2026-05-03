import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String
    role: String!
    createdAt: String!
  }

  type Chapter {
    id: ID!
    title: String!
    description: String!
    icon: String!
    order: Int!
    problems: [Problem!]!
    totalProblems: Int!
    completedProblems: Int!
  }

  type Problem {
    id: ID!
    title: String!
    number: Int!
    difficulty: String!
    chapterId: ID!
    youtubeUrl: String
    leetcodeUrl: String
    articleUrl: String
    order: Int!
    completed: Boolean!
  }

  type Progress {
    id: ID!
    userId: ID!
    problemId: ID!
    completed: Boolean!
    completedAt: String
  }

  type AuthPayload {
    user: User!
    message: String!
  }

  type ToggleProgressPayload {
    problemId: ID!
    completed: Boolean!
  }

  type Stats {
    totalProblems: Int!
    completedProblems: Int!
    easyTotal: Int!
    easyCompleted: Int!
    mediumTotal: Int!
    mediumCompleted: Int!
    hardTotal: Int!
    hardCompleted: Int!
    percentage: Float!
  }

  type Query {
    me: User
    getChapters: [Chapter!]!
    getChapter(id: ID!): Chapter
    getStats: Stats!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    register(name: String!, email: String!, password: String!): AuthPayload!
    logout: Boolean!
    toggleProgress(problemId: ID!): ToggleProgressPayload!
  }
`;
