const FORMAT_BADGE_CLASS = {
  constraint:
    'rounded bg-purple-100 px-1.5 py-0.5 text-xs font-semibold text-purple-700 dark:bg-purple-900/40 dark:text-purple-200',
  format:
    'rounded bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
} as const;

type SchemaPropertyProps = Readonly<{
  name: string;
  type: string;
  format: string;
  formatTone: keyof typeof FORMAT_BADGE_CLASS;
  description: string;
}>;

/**
 * @description One property row from generated HTML documentation.
 * @param {SchemaPropertyProps} props - Property name, type, format, and description.
 */
function SchemaProperty({ name, type, format, formatTone, description }: SchemaPropertyProps) {
  return (
    <div className='grid grid-cols-1 gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4'>
      <div className='text-sm font-medium text-gray-800 dark:text-gray-100'>{name}</div>
      <div>
        <div className='flex flex-wrap items-center gap-2 text-sm'>
          <span className='font-semibold text-teal-600 dark:text-teal-300'>{type}</span>
          <span className={FORMAT_BADGE_CLASS[formatTone]}>{format}</span>
        </div>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>{description}</p>
      </div>
    </div>
  );
}

/**
 * @description Theme-aware stand-in for the generated HTML documentation screenshots.
 */
export default function GeneratorDocsPreview() {
  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-dark-card'>
      <div className='space-y-5 p-5 sm:p-6'>
        <SchemaProperty
          name='lumens'
          type='Integer'
          format='>= 0'
          formatTone='constraint'
          description='Light intensity measured in lumens.'
        />
        <SchemaProperty
          name='sentAt'
          type='String'
          format='date-time'
          formatTone='format'
          description='Date and time when the message was sent.'
        />
        <p className='text-sm text-gray-500 dark:text-gray-400'>Additional properties are allowed.</p>
      </div>
      <pre className='overflow-x-auto border-t border-gray-200 bg-gray-100 px-5 py-4 text-sm leading-6 text-gray-800 dark:border-gray-700 dark:bg-black/30 dark:text-gray-100 sm:px-6'>
        <code>
          {'{\n  '}
          <span className='text-sky-700 dark:text-sky-300'>&quot;lumens&quot;</span>
          {': '}
          <span className='text-amber-700 dark:text-amber-300'>0</span>
          {',\n  '}
          <span className='text-sky-700 dark:text-sky-300'>&quot;sentAt&quot;</span>
          {': '}
          <span className='text-emerald-700 dark:text-emerald-300'>&quot;2020-06-02T08:13:51Z&quot;</span>
          {'\n}'}
        </code>
      </pre>
    </div>
  );
}
