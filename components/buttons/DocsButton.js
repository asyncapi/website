import Link from 'next/link';

export default function DocsButton({ suggestions }) {
  return (
    <div className="flex flex-row cursor-pointer">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className={`mt-4 p-4 w-1/2 rounded shadow-md border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-300 ${suggestion.classname}`}
        >
          <Link href={suggestion.href}>
            {suggestion.type === 'back' ? (
              <div className="flex flex-col mt-2 text-center lg:text-left">
                <div className="text-primary-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                      />
                    </svg>
                  <div className="my-auto font-bold text-sm inline">Go Back</div>
                </div>
                <div className="font-normal text-md my-2">
                  {suggestion.title}
                </div>
              </div>
            ) : (
              <div className="flex flex-col mt-2 text-center lg:text-right">
                <div className="text-primary-600">
                  <div className="font-bold my-auto text-sm inline">Up Next</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                </div>
                <div className="font-normal text-md my-2 text-center lg:text-right">
                  {suggestion.title}
                </div>
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
