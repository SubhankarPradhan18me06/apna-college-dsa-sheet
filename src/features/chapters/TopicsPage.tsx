import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHAPTERS } from '../../graphql/queries';
import Spinner from '../../shared/components/Spinner';
import type { Chapter as ChapterType } from '@/shared/types';
import { Link } from 'react-router-dom';

const TopicsPage: React.FC = () => {
  const { data, loading } = useQuery(GET_CHAPTERS);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  const chapters = data?.getChapters || [];

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Algorithm Topics</h1>
        <p className="text-secondary">Select a topic to view problems and track your mastery.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter: ChapterType) => (
          <Link
            key={chapter.id}
            to={`/topics/${chapter.id}`}
            className="card p-6 hover:border-brand-orange/50 hover:bg-bg-alt transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-bg-alt border border-surface-border flex items-center justify-center text-2xl text-brand-orange group-hover:scale-110 transition-transform">
                {chapter.icon}
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-700 group-hover:text-brand-orange/20 transition-colors">
                  {chapter.order < 10 ? `0${chapter.order}` : chapter.order}
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-brand-orange transition-colors">
              {chapter.title}
            </h3>
            <p className="text-sm text-secondary line-clamp-2 mb-6">
              {chapter.description}
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-gray-500 uppercase tracking-wider">Progress</span>
                <span className="text-brand-orange">
                  {Math.round((chapter.completedProblems / chapter.totalProblems) * 100)}%
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(chapter.completedProblems / chapter.totalProblems) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-secondary text-right uppercase tracking-widest mt-1">
                {chapter.completedProblems} / {chapter.totalProblems} Solved
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicsPage;
