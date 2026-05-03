import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CHAPTER } from '../../graphql/queries';
import Spinner from '../../shared/components/Spinner';
import ProblemRow from '../problems/ProblemRow';
import ProgressRing from '../../shared/components/ProgressRing';

const ChapterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_CHAPTER, {
    variables: { id },
    skip: !id,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !data?.getChapter) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Topic not found</h2>
        <Link to="/topics" className="btn-primary inline-block">Back to Topics</Link>
      </div>
    );
  }

  const chapter = data.getChapter;
  const progressPercentage = Math.round((chapter.completedProblems / chapter.totalProblems) * 100);

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.2em] mb-2 block">
            Topic {chapter.order < 10 ? `0${chapter.order}` : chapter.order}
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-3">{chapter.title}</h1>
          <p className="text-gray-400 max-w-2xl">{chapter.description}</p>
        </div>
        
        <div className="flex items-center gap-4 bg-dark-800 p-4 rounded-2xl border border-surface-border">
          <ProgressRing percentage={progressPercentage} size={60} strokeWidth={5} />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Progress</p>
            <p className="text-lg font-bold text-white">
              {chapter.completedProblems} / {chapter.totalProblems} <span className="text-sm font-normal text-gray-400">Solved</span>
            </p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="grid grid-cols-[48px_40px_1fr_100px_120px] gap-4 px-4 py-3 bg-dark-700/50 border-b border-surface-border text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          <div className="text-center">Status</div>
          <div>#</div>
          <div>Problem Name</div>
          <div className="text-center">Difficulty</div>
          <div className="text-right pr-4">Solutions</div>
        </div>
        
        <div className="divide-y divide-surface-border">
          {chapter.problems.map((problem: any) => (
            <div key={problem.id} className="grid grid-cols-[48px_40px_1fr_100px_120px] gap-4 items-center">
              {/* Custom ProblemRow for table layout if needed, but for simplicity we use the same one or adapt */}
              <div className="contents">
                <ProblemRow problem={problem} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Adaptation for the table layout if needed, but for now ProblemRow is flexible
export default ChapterDetailPage;
