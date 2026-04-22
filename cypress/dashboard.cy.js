import DashboardPage from './pages/dashboard';

describe('Dashboard Page', () => {
  const dashboard = new DashboardPage();

  beforeEach(() => {
    dashboard.visit();
  });

  it('should display the header', () => {
    dashboard.verifyHeader();
  });

  it('should display the Hot Topics section', () => {
    dashboard.verifyHotTopicsSection();
  });

  it('should display the Good First Issues section', () => {
    dashboard.verifyGoodFirstIssuesSection();
  });

  it('should display header links with correct URLs', () => {
    dashboard.verifyHeaderLinks();
  });
});
