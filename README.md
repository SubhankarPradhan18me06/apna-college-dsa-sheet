# 🚀 DSA Practice Sheet — Backend Engine

A production-grade GraphQL API for tracking Data Structures & Algorithms progress. Built with a focus on scalability, security, and developer experience.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **API**: Apollo Server (GraphQL)
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT with httpOnly Cookies
- **Language**: TypeScript

## 🏗 Architecture

The project follows a feature-based resolver structure for the GraphQL API:

```text
src/
├── config/          # DB connection and environment configuration
├── graphql/
│   ├── schema/      # SDL-based type definitions
│   └── resolvers/   # Query and Mutation logic (Modularized)
├── middleware/      # JWT authentication and security middlewares
├── models/          # Mongoose schemas (User, Chapter, Problem, Progress)
└── utils/           # Helper functions and seeding scripts
```

## 🔐 Security Features

- **httpOnly Cookies**: JWT tokens are stored in secure cookies to prevent XSS attacks.
- **Password Hashing**: Bcrypt with 12 salt rounds for secure credential storage.
- **GraphQL Context**: User sessions are injected into the GraphQL context for per-request authorization.

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Running locally or Atlas URI)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   Create a `.env` file based on the implementation plan:
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/dsa_sheet
   JWT_SECRET=your_secret_key
   CLIENT_URL=http://localhost:5173
   ```

3. Seed the database (Important for initial problems):
   ```bash
   npm run seed
   ```

4. Run in development mode:
   ```bash
   npm run dev
   ```

## 📡 API Reference

The GraphQL Playground is available at `http://localhost:4000/graphql` in development.

### Core Mutations
- `login(email, password)`
- `register(name, email, password)`
- `toggleProgress(problemId)`

### Core Queries
- `me`: Current user session
- `getChapters`: Hierarchical list of topics and problems
- `getStats`: Global progress analytics
