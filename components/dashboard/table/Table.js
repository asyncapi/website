import Row from './Row';

export default function Table({
  title,
  data,
  className,
  listClassName,
}) {
  return (
    <div
      className={`bg-gray-50 lg:w-1/2 border  border-gray-200 rounded ${className}`}
    >
      <div className="inline-flex bg-white w-full p-5 rounded">
        <h2 className="font-semibold text-base w-full">{title}</h2>
      </div>
      <div className="inline-block min-w-full overflow-y-scroll max-h-108">
        <ul className={`grid gap-4 m-4  ${listClassName}`}>
          {data.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
