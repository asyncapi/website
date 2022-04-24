import GenericLayout from '../../components/layout/GenericLayout';
import Header from '../../components/dashboard/Header';
import Table from '../../components/dashboard/table/Table';
import data from '../../issues.json';
import GoodFirstIssues from '../../components/dashboard/GoodFirstIssues';
export default function Home() {
  return (
    <GenericLayout
      title="AsyncAPI - Dashboard"
      description={'description'}
      image={'image'}
      wide
    >
      <title>AsyncAPI - Dashboard</title>

      <div className="py-16">
        <Header />
        <div className="flex flex-col gap-6 md:flex-row  w-full  mt-8">
          <Table
            title={
              <div className="flex gap-3">
                <img
                  data-tooltip-target="tooltip-default"
                  src="/img/illustrations/icons/fire.svg"
                />
                <div
                  id="tooltip-default"
                  role="tooltip"
                  class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  Tooltip content
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <span>Hot Topics</span>
              </div>
            }
            data={data.hotDiscussions}
            className="lg:w-1/3"
          />
          <GoodFirstIssues issues={data.goodFirstIssues} />
        </div>
      </div>
    </GenericLayout>
  );
}
