import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import Sidebar from './shared/components/Sidebar';
import TopBar, { TopBarSearch, TopBarActions } from './shared/components/TopBar';
import ProtectedRoute from './shared/components/ProtectedRoute';
import Spinner from './shared/components/Spinner';

// Lazy load pages
const LoginPage = lazy(() => import('./features/auth/LoginPage'));
const DashboardPage = lazy(() => import('./features/dashboard/DashboardPage'));
const TopicsPage = lazy(() => import('./features/chapters/TopicsPage'));
const ChapterDetailPage = lazy(() => import('./features/chapters/ChapterDetailPage'));
const ProfilePage = lazy(() => import('./features/profile/ProfilePage'));

const Layout = () => (
  <div className="flex min-h-screen bg-dark-900">
    <Sidebar />
    <main className="flex-1 ml-52 min-h-screen flex flex-col">
      <TopBar>
        <TopBarSearch />
        <TopBarActions />
      </TopBar>
      <div className="flex-1 overflow-y-auto">
        <Suspense fallback={<div className="flex items-center justify-center h-full"><Spinner size="lg" /></div>}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  </div>
);

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <Suspense fallback={<div className="min-h-screen bg-dark-900 flex items-center justify-center"><Spinner size="lg" /></div>}>
              <LoginPage />
            </Suspense>
          } />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topics/:id" element={<ChapterDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/bookmarks" element={<div className="p-8"><h1 className="text-2xl text-white">Bookmarks Coming Soon...</h1></div>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
