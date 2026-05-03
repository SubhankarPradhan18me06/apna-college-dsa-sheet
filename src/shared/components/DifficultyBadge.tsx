import React from 'react';
import type { Difficulty } from '../types';

interface Props {
  difficulty: Difficulty;
  className?: string;
}

const classMap: Record<Difficulty, string> = {
  Easy: 'difficulty-easy',
  Medium: 'difficulty-medium',
  Hard: 'difficulty-hard',
};

const DifficultyBadge: React.FC<Props> = ({ difficulty, className = '' }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold tracking-wider uppercase ${classMap[difficulty]} ${className}`}
  >
    {difficulty}
  </span>
);

export default DifficultyBadge;
