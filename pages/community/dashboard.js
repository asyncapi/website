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

      <div className="max-w-screen-xl mx-auto mt-16 pb-16 px-4 sm:py-16 sm:px-6 lg:px-8">
        <Header />
        <div className="block lg:flex gap-3  w-full  mt-8">
          <Table
            title="🔥 Hot Topics"
            data={data.hotDiscussions.map((item) => {
              return {
                id: item.id,
                title: item.title,
                author: item.author,
                repo: item.repo,
                isPR: item.isPR,
                resourcePath: item.resourcePath,
                labels: item.labels,
              };
            })}
          />
          <GoodFirstIssues issues={data.goodFirstIssues} />
        </div>
      </div>
    </GenericLayout>
  );
}
