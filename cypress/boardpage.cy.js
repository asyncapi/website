import BoardPage from './pages/boardpage';

describe('Board Page', () => {
  const page = new BoardPage();

  beforeEach(() => {
    page.visitBoardPage();
  });

  it('shows the governance board heading', () => {
    page.verifyHeadingExists('Governance Board');
  });

  it('lists board member cards', () => {
    page.verifyMemberCards();
  });
});
