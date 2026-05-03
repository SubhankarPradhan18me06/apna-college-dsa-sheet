import React from 'react';
import { useMutation } from '@apollo/client';
import { TOGGLE_PROGRESS } from '../../graphql/mutations';
import { GET_CHAPTERS, GET_STATS } from '../../graphql/queries';
import DifficultyBadge from '../../shared/components/DifficultyBadge';
import type { Problem } from '../../shared/types';

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
    <div className={`flex items-center gap-4 py-3 px-4 hover:bg-dark-700/50 transition-colors border-b border-surface-border last:border-0 ${problem.completed ? 'opacity-80' : ''}`}>
      <div className="flex-shrink-0">
        <button
          onClick={() => toggleProgress()}
          disabled={loading}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            problem.completed 
              ? 'bg-emerald-500 border-emerald-500 text-white' 
              : 'border-dark-400 hover:border-brand-orange'
          }`}
        >
          {problem.completed && <span className="text-[10px]">✓</span>}
        </button>
      </div>
      
      <div className="flex-shrink-0 w-8 text-xs text-gray-500 font-mono">
        {problem.number}.
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-medium truncate ${problem.completed ? 'text-gray-400 line-through' : 'text-gray-200'}`}>
          {problem.title}
        </h4>
      </div>
      
      <div className="flex-shrink-0">
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>
      
      <div className="flex items-center gap-3 ml-4">
        {problem.youtubeUrl && (
          <a
            href={problem.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-red-500 transition-colors"
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
            className="text-gray-500 hover:text-brand-orange transition-colors"
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
            className="text-gray-500 hover:text-blue-400 transition-colors"
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
