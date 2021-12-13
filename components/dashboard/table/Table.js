import Row from './Row';
import Pagination from './Pagination';
import Filter from './Filter';

export default function Table({ title, data, paginationOptions, filters }) {
  console.log(data.columns);

  return (
    <div className="antialiased font-sans">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="inline-flex bg-gray-300 w-full p-4">
            <img className="w-8 h-8" src="/img/illustrations/icons/fire.svg" />
            <h2 className="text-2xl font-semibold leading-tight">{title}</h2>
          </div>
          {filters && <Filter data={filters} />}
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
            <div className="inline-block min-w-full">
              <table className="min-w-full leading-normal">
                <tbody>
                  {data.map((item) => (
                    <Row key={item.id} item={item} />
                  ))}
                </tbody>
              </table>
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
      </div>
    </div>
  );
}
