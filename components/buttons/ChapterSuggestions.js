import ChapterSuggestion from "./ChapterSuggestion";

export default function ChapterSuggestions({ suggestions = [], className = '' }) {
  return (
    <div className={`${className} grid grid-cols-1 gap-4 sm:grid-cols-2`}>
      {
        suggestions.map((suggestion, index) => (
          <ChapterSuggestion
            key={index}
            href={suggestion.href}
            title={suggestion.title}
            description={suggestion.description}
            linkText={suggestion.linkText}
            className={suggestion.className}
          />
        ))
      }
    </div>
  )
}