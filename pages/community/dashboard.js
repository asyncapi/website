import GenericLayout from '../../components/layout/GenericLayout';
import Header from '../../components/dashboard/Header';
import Table from '../../components/dashboard/table/Table';
import data from '../../issues.json';
import GoodFirstIssues from '../../components/dashboard/GoodFirstIssues';
export default function Home() {
  return (
    <GenericLayout
      title="Technical Steering Committee"
      description={'description'}
      image={'image'}
      wide
    >
      <title>AsyncAPI - Dashboard</title>

      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:px-8">
          <Header />
          <div className="bg-slate-100"></div>
          <Table
            title="Hot discussions"
            data={data.hotDiscussions.map((item) => {
              return {
                id: item.id,
                title: item.title,
                author: item.author,
                repo: item.repo,
                isPR: item.isPR,
              };
            })}
          />
          <GoodFirstIssues issues={data.goodFirstIssues} />
        </div>
      </div>
    </GenericLayout>
  );
}
