import RoadmapPage from './pages/RoadmapPage';

describe('RoadMap Page Navigation and Functionality', () => {
  let roadmapPage;

  beforeEach(() => {
    roadmapPage = new RoadmapPage();
    roadmapPage.visit();
  });

  it('User navigates to the RoadMap Page and verifies the header', () => {
    roadmapPage.verifyPageLoaded();
  });

  it('User clicks on the community page link and verifies navigation', () => {
    roadmapPage.verifyLink();
  });

  it('User verifies Outcome tooltip', () => {
    roadmapPage.verifyTooltip(0);
  });

  it('User verifies Solution tooltip', () => {
    roadmapPage.verifyTooltip(1);
  });

  it('User verifies Implementation tooltip', () => {
    roadmapPage.verifyTooltip(2);
  });
});
