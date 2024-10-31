import React from 'react';

import type { IChapterSuggestionProps } from './ChapterSuggestion';
import ChapterSuggestion from './ChapterSuggestion';

interface IChapterSuggestionsProps {
  suggestions: IChapterSuggestionProps[];
  className?: string;
}

/**
 *
 * @param {Object} props - The props of the component
 * @param {Array} props.suggestions - The suggestions of the chapter
 * @param {string} props.className - The class name of the component
 */
export default function ChapterSuggestions({ suggestions = [], className = '' }: IChapterSuggestionsProps) {
  return (
    <div className={`${className} grid grid-cols-1 gap-4 sm:grid-cols-2`}>
      {suggestions.map((suggestion, index) => (
        <ChapterSuggestion
          key={index}
          href={suggestion.href}
          title={suggestion.title}
          description={suggestion.description}
          linkText={suggestion.linkText}
          className={suggestion.className}
        />
      ))}
    </div>
  );
}
