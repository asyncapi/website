import { buildNewsroomVideos } from '../../../scripts/build-newsroom-videos';

describe('Newsroom Videos', () => {
    // eslint-disable-next-line cypress/no-async-tests
    it('fetches and saves newsroom videos', async () => {
      // Define the data that the API should return (stubbed response)
      const stubbedResponse = {
        items: [
          {
            snippet: {
              thumbnails: {
                high: {
                  url: 'https://example.com/image.jpg',
                },
              },
              title: 'Test Video 1',
              description: 'This is a test video 1',
            },
            id: {
              videoId: 'videoId1',
            },
          },
          {
            snippet: {
              thumbnails: {
                high: {
                  url: 'https://example.com/image2.jpg',
                },
              },
              title: 'Test Video 2',
              description: 'This is a test video 2',
            },
            id: {
              videoId: 'videoId2',
            },
          },
        ],
      };

      // Intercept the API request and stub the response
      cy.intercept('GET', 'https://youtube.googleapis.com/youtube/v3/search*', {
        statusCode: 200,
        body: stubbedResponse,
      }).as('getYoutubeVideos');

      // Manually trigger the function
      cy.invoke(buildNewsroomVideos()).then((videoData) => {
          expect(videoData).to.exist;
        });
});
