import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHAPTERS, GET_STATS } from '../../graphql/queries';
import Spinner from '../../shared/components/Spinner';
import ProgressRing from '../../shared/components/ProgressRing';
import ProblemRow from '../problems/ProblemRow';
import type { Chapter } from '../../shared/types';

const DashboardPage: React.FC = () => {
  const { data: chaptersData, loading: chaptersLoading } = useQuery(GET_CHAPTERS);
  const { data: statsData, loading: statsLoading } = useQuery(GET_STATS);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  if (chaptersLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  const stats = statsData?.getStats;
  const chapters = chaptersData?.getChapters || [];

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <section className="card p-8 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-radial pointer-events-none" />
        <div className="relative flex items-center justify-between">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-white mb-2">Most Important Interview Questions</h1>
            <p className="text-gray-400 mb-6">
              Master the core patterns. Your progress is tracking consistently. Maintain your streak to unlock advanced modules.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                ● Easy: {stats?.easyCompleted}/{stats?.easyTotal}
              </div>
              <div className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                ● Medium: {stats?.mediumCompleted}/{stats?.mediumTotal}
              </div>
              <div className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
                ● Hard: {stats?.hardCompleted}/{stats?.hardTotal}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <ProgressRing percentage={stats?.percentage || 0} size={140} strokeWidth={10} label="Completed" />
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <h2 className="text-xl font-bold text-white mb-6">Data Structures & Algorithms</h2>
      <div className="space-y-4">
        {chapters.map((chapter: Chapter) => (
          <div key={chapter.id} className="card overflow-hidden">
            <button
              onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-dark-700/30 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-dark-700 border border-surface-border flex items-center justify-center text-xl text-brand-orange">
                  {chapter.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-100">{chapter.title}</h3>
                  <p className="text-xs text-gray-500">{chapter.totalProblems} Problems</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-3 w-40">
                  <div className="progress-bar flex-1">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(chapter.completedProblems / chapter.totalProblems) * 100}%` }} 
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-400 min-w-[3rem]">
                    {chapter.completedProblems}/{chapter.totalProblems}
                  </span>
                </div>
                <span className={`text-xl transition-transform ${expandedChapter === chapter.id ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </div>
            </button>
            
            {expandedChapter === chapter.id && (
              <div className="bg-dark-800/50 border-t border-surface-border animate-slide-down">
                {chapter.problems.map((problem) => (
                  <ProblemRow key={problem.id} problem={problem} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
