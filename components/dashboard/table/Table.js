import Row from './Row';

export default function Table({
  title,
  data,
  className,
  listClassName,
}) {
  return (
    <div
      className={`dark:bg-slate-700 dark:border-slate-800 bg-gray-50 lg:w-1/2 border  border-gray-200 rounded ${className}`}
    >
      <div className="dark:bg-slate-600 inline-flex bg-white w-full p-5 rounded">
        <h2 className="font-semibold text-base w-full">{title}</h2>
      </div>
      <div className="inline-block min-w-full overflow-y-scroll">
        {data.length===0 && (
        <div className='font-medium text-base w-full p-5'>
          <p>There aren't any good first issues open for the given repository and area at the moment.</p>
          <ul className='list-disc pl-5 mt-3 font-[400] text-sm'>
            <li className="mb-2">Join our <a href="https://asyncapi.com/slack-invite" className="text-blue-500 underline">Slack</a> to seek help.</li>
            <li className="mb-2">In the <span className="dark:text-white text-green-900 font-semibold">#11_contributing</span> channel, call out the maintainers that you want to work with. Ask them if there are any issues you could solve. You know who these people are from <span className='font-bold'>CODEOWNERS</span> file in each repo.</li>
            <li className="mb-2">If there is no response, you need to look for a different issue from different repository.</li>
          </ul>
        </div>
        )
        }
        <ul className={`grid gap-4 m-4  ${listClassName}`}>
          {data.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
