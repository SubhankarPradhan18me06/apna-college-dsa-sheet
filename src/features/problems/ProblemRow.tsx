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
    <div className={`grid grid-cols-[48px_40px_1fr_100px_120px] gap-4 items-center py-3 px-4 hover:bg-bg-alt/50 transition-colors border-b border-surface-border last:border-0 ${problem.completed ? 'opacity-80' : ''}`}>
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
          {problem.completed && <span className="text-[10px]">✓</span>}
        </button>
      </div>
      
      {/* Number */}
      <div className="text-xs text-secondary font-mono">
        {problem.number}.
      </div>
      
      {/* Title */}
      <div className="min-w-0">
        <h4 className={`text-sm font-medium truncate ${problem.completed ? 'text-secondary line-through' : 'text-primary'}`}>
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
            ▶
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
            📄
          </a>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProblemRow);
