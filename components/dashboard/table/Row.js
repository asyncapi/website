function Row({ item }) {
  return (
    <li>
      <div className="flex gap-2 leading-tight tracking-tight p-2">
        <img
          className="w-4 h-4"
          src={
            item.isPR
              ? '/img/illustrations/icons/pull-request.svg'
              : '/img/illustrations/icons/issue.svg'
          }
        />
        <div className="flex flex-col gap-1">
          <a className="text-gray-600 text-sm uppercase font-semibold" href={`https://github.com/${item.repo}`}>
            {item.repo}
          </a>
          <div>
            <a href={`https://github.com/${item.resourcePath}`}>
              <span className="font-semibold text-lg text-gray-600 w-full">
                {item.title}
              </span>
            </a>
          </div>
          <div className="inline-flex items-center gap-1">
            {item.labels &&
              item.labels.map((label) => (
                <span
                  key={label.name}
                  className={`bg-blue-200 px-2 py-0.5 text-base rounded-full z-0`}
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
      </div>
    </li>
  );
}

export default Row;
