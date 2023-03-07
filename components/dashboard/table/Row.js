export default function Row({ item }) {
  return (
    <li>
      <div className=" p-4 bg-white rounded-md border border-gray-200">
        <a target='_blank' rel='noreferrer' href={`https://github.com/${item.resourcePath}`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center underline">
                <img
                  alt='issue or pull-request icon'
                  className="w-4 h-4"
                  src={
                    item.isPR
                      ? '/img/illustrations/icons/pull-request.svg'
                      : '/img/illustrations/icons/issue.svg'
                  }
                />
                <a
                  target='_blank' rel='noreferrer'
                  className="text-gray-900 text-sm lowercase font-light"
                  href={`https://github.com/${item.repo}`}
                >
                  {item.repo}
                </a>
              </div>

              <span className="text-base font-medium text-gray-900 w-full leading-5 two-liner">
                {item.title}
              </span>

              {item.labels.length > 0 && (
                <div className="flex flex-wrap items-center gap-1">
                  {item.labels.map((label) => (
                    <span
                      key={label.name}
                      className={`bg-secondary-300 text-sm leading-5 px-2 rounded-full`}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <img alt='arrow icon' src="/img/illustrations/icons/arrow.svg" />
          </div>
        </a>
      </div>
    </li>
  );
}
