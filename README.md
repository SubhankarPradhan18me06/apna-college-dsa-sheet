# 🎨 DSA Practice Sheet — Frontend Platform

A high-performance, dark-themed React application for mastering Data Structures & Algorithms. Designed with premium aesthetics and a senior-level architecture.

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **State Management**: 
  - **Server State**: Apollo Client (GraphQL)
  - **UI/Global State**: Zustand
- **Styling**: Tailwind CSS v3 (Custom Design System)
- **Forms**: React Hook Form + Zod Validation

## 🏗 Senior-Level Architecture

The frontend is structured using a **Feature-Based Module** pattern to ensure scalability:

```text
src/
├── features/        # Business logic split by domain (auth, dashboard, chapters, profile)
├── graphql/         # Centralized API definitions (client, queries, mutations)
├── shared/          # Reusable components, hooks, and global types
├── store/           # Zustand state definitions
└── App.tsx          # Main router with Lazy Loading / Code Splitting
```

## ✨ Key UI Features

- **Modern Dashboard**: High-contrast dark mode with orange accents and glassmorphism.
- **Optimistic UI**: Progress toggling happens instantly on the client for a zero-latency feel.
- **Responsive Analytics**: Custom SVG progress rings and activity heatmaps.
- **Secure Auth**: Cookie-based session management with protected route wrappers.

## 🚀 Development

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

## 📦 Build & Optimization

- **Code Splitting**: Uses `React.lazy` and `Suspense` for per-route chunking.
- **Memoization**: Heavy list components (like `ProblemRow`) are wrapped in `React.memo` to prevent unnecessary re-renders.
- **Caching**: Apollo Client's `InMemoryCache` is configured with field policies for normalized data updates.
