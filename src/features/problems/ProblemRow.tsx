import React from 'react';
import { useMutation } from '@apollo/client';
import { TOGGLE_PROGRESS } from '../../graphql/mutations';
import { GET_CHAPTERS, GET_STATS } from '../../graphql/queries';
import DifficultyBadge from '../../shared/components/DifficultyBadge';
import type { Problem } from '@/shared/types';

interface Props {
  problem: Problem;
}

const ProblemRow: React.FC<Props> = ({ problem }) => {
  const [toggleProgress, { loading }] = useMutation(TOGGLE_PROGRESS, {
    variables: { problemId: problem.id },
    optimisticResponse: {
      toggleProgress: {
        __typename: 'ToggleProgressPayload',
        problemId: problem.id,
        completed: !problem.completed,
      },
    },
    update(cache, { data }) {
      if (!data) return;
      const { toggleProgress } = data;
      
      // Update the problem in the cache
      cache.modify({
        id: cache.identify({ __typename: 'Problem', id: problem.id }),
        fields: {
          completed() {
            return toggleProgress.completed;
          },
        },
      });

      // We might need to refetch stats or update them manually if we want immediate dashboard updates
      // But for now, Apollo's cache normalization should handle the Problem field update.
    },
    refetchQueries: [{ query: GET_STATS }],
  });

  return (
    <div className={`grid grid-cols-[48px_40px_1fr_100px_120px] gap-4 items-center py-3 px-4 hover:bg-bg-alt/50 transition-colors border-b border-surface-border last:border-0 ${problem.completed ? 'bg-bg-alt/20' : ''}`}>
      {/* Status */}
      <div className="flex justify-center">
        <button
          onClick={() => toggleProgress()}
          disabled={loading}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            problem.completed 
              ? 'bg-emerald-500 border-emerald-500 text-white' 
              : 'border-dim hover:border-brand-orange'
          }`}
        >
          {problem.completed && (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Number */}
      <div className="text-xs text-secondary font-mono">
        {problem.number}.
      </div>
      
      {/* Title */}
      <div className="min-w-0">
        <h4 className={`text-sm font-medium truncate ${problem.completed ? 'text-dim line-through opacity-70' : 'text-primary'}`}>
          {problem.title}
        </h4>
      </div>
      
      {/* Difficulty */}
      <div className="flex justify-center">
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>
      
      {/* Solutions */}
      <div className="flex items-center justify-end gap-3 pr-4">
        {problem.youtubeUrl && (
          <a
            href={problem.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-red-500 transition-colors"
            title="Video Tutorial"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
        )}
        {problem.leetcodeUrl && (
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-brand-orange transition-colors"
            title="LeetCode Problem"
          >
            &lt;/&gt;
          </a>
        )}
        {problem.articleUrl && (
          <a
            href={problem.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-blue-400 transition-colors"
            title="Article Reference"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProblemRow);
