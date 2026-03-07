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
    roadmapPage.verifyCommunityLink();
  });

  const tooltips = [
    { name: 'Outcome', index: 0 },
    { name: 'Solution', index: 1 },
    { name: 'Implementation', index: 2 }
  ];

  tooltips.forEach(({ name, index }) => {
    it(`User verifies ${name} tooltip`, () => {
      roadmapPage.verifyTooltip(index);
    });
  });
});
