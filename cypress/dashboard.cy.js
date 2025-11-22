import DashboardPage from './pages/dashboard';

describe('Dashboard Page Tests', () => {
  const dashboard = new DashboardPage();

  beforeEach(() => {
    dashboard.visit();
  });

  it('User navigates to the dashboard and verifies header', () => {
    dashboard.verifyHeader();
  });

  it('User verifies Hot Topics section', () => {
    dashboard.verifyHotTopicsSection();
  });

  it('User verifies Good First Issues section', () => {
    dashboard.verifyGoodFirstIssuesSection();
  });

  it('User verifies all header links point to correct URLs from source', () => {
    dashboard.verifyHeaderLinks();
  });
});
