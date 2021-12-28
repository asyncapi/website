function Row({ item }) {
  return (
    <li>
      <div className="flex flex-col px-3 pt-2">
        <div className="inline-flex gap-2 items-center m-1">
          <img
            className="w-5 h-5"
            src={
              item.isPR
                ? '/img/illustrations/icons/pull-request.svg'
                : '/img/illustrations/icons/issue.svg'
            }
          />
          <span className="underline">{item.repo}</span>
        </div>
        <div>
          <a href={`https://github.com/${item.resourcePath}`}>
            <span className="font-semibold text-lg text-gray-600 w-full">
              {item.title}
            </span>
          </a>
        </div>
        <div className="inline-flex items-center m-1 gap-1">
          {item.labels &&
            item.labels.map((label) => (
              <span
                key={label.name}
                className={`bg-blue-200 px-1 py-0.5 text-sm rounded-full z-0`}
              >
                {label.name}
              </span>
            ))}

          <a href={`https://github.com/${item.author}`}>
            <img
              className="rounded-full blur-none h-5 w-5"
              src={`https://github.com/${item.author}.png?size=20`}
            />
          </a>
        </div>
      </div>
    </li>
  );
}

export default Row;
