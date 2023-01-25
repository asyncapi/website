import Link from 'next/link';

export default function DocsButton({ post, className='' }) {
  return (
    <div className={`flex flex-row gap-4 mb-4 h-full ${className}`}>
      <div className="w-1/2 h-auto">
        { post?.prevPage && <Link href={post.prevPage.href} passHref>
            <a>
            <div className="p-4 rounded shadow-md border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-300 text-center lg:text-left cursor-pointer">
              <div className="text-secondary-500">
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
                <div className="my-auto font-bold text-sm inline uppercase">
                  Go Back
                </div>
              </div>
              <div className="font-medium text-base my-2">{post.prevPage.title}</div>
            </div>
            </a>
          </Link>
        }
      </div>
      <div className="w-1/2 h-auto">
        { post?.nextPage && <Link href={post.nextPage.href} className='h-auto' passHref>
            <a>
            <div className="p-4 rounded shadow-md border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-300 text-center lg:text-right cursor-pointer">
              <div className="text-secondary-500">
                <div className="font-bold my-auto text-sm inline uppercase">
                  Up Next
                </div>
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
              <div className="font-medium text-base my-2">{post.nextPage.title}</div>
            </div>
            </a>
          </Link>
        }
      </div>
    </div>
  );
}
