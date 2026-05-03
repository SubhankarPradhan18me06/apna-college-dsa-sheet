import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      email
      avatar
      role
      createdAt
    }
  }
`;

export const GET_CHAPTERS = gql`
  query GetChapters {
    getChapters {
      id
      title
      description
      icon
      order
      totalProblems
      completedProblems
      problems {
        id
        title
        number
        difficulty
        chapterId
        youtubeUrl
        leetcodeUrl
        articleUrl
        order
        completed
      }
    }
  }
`;

export const GET_CHAPTER = gql`
  query GetChapter($id: ID!) {
    getChapter(id: $id) {
      id
      title
      description
      icon
      order
      totalProblems
      completedProblems
      problems {
        id
        title
        number
        difficulty
        chapterId
        youtubeUrl
        leetcodeUrl
        articleUrl
        order
        completed
      }
    }
  }
`;

export const GET_STATS = gql`
  query GetStats {
    getStats {
      totalProblems
      completedProblems
      easyTotal
      easyCompleted
      mediumTotal
      mediumCompleted
      hardTotal
      hardCompleted
      percentage
    }
  }
`;
