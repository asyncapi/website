import Row from './Row';
import Pagination from './Pagination';
import Filter from './Filter';

export default function Table({ title, data, paginationOptions, filters }) {
  return (
    <div className=" bg-white lg:w-1/2 border border-gray-200">
      <div className="inline-flex bg-gray-300 w-full p-4 gap-1">
        <h2 className="text-2xl font-semibold leading-tight">{title}</h2>
      </div>
      {filters && <Filter data={filters} />}
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto min-w-full">
        <div className="inline-block min-w-full">
          <ul className="min-w-full leading-normal divide-y divide-gray-200">
            {data.map((item) => (
              <Row key={item.id} item={item} />
            ))}
          </ul>
          {paginationOptions && (
            <Pagination
              issuesPerPage={paginationOptions.issuesPerPage}
              totalIssues={paginationOptions.totalIssues}
              currentPage={paginationOptions.currentPage}
              paginate={paginationOptions.paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
