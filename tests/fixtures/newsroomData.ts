const mockApiResponse = {
  items: [
    {
      snippet: {
        thumbnails: {
          high: {
            url: 'https://i.ytimg.com/vi/K7fvKbOfqOg/hqdefault.jpg'
          }
        },
        title: 'Developer Experience Working Group, 14:00 UTC Thursday May 23rd 2024',
        description: 'Define our vision and plans https://github.com/asyncapi/community/issues/1220.'
      },
      id: {
        videoId: 'K7fvKbOfqOg'
      }
    },
    {
      snippet: {
        thumbnails: {
          high: {
            url: 'https://i.ytimg.com/vi/94SSXX78VCU/hqdefault.jpg'
          }
        },
        title: 'Essential Building Blocks Working Group, 18:00 UTC Tuesday May 14th 2024',
        description: 'https://github.com/asyncapi/community/issues/1200.'
      },
      id: {
        videoId: '94SSXX78VCU'
      }
    }
  ]
};

const expectedResult = JSON.stringify(
  [
    {
      image_url: 'https://i.ytimg.com/vi/K7fvKbOfqOg/hqdefault.jpg',
      title: 'Developer Experience Working Group, 14:00 UTC Thursday May 23rd 2024',
      description: 'Define our vision and plans https://github.com/asyncapi/community/issues/1220.',
      videoId: 'K7fvKbOfqOg'
    },
    {
      image_url: 'https://i.ytimg.com/vi/94SSXX78VCU/hqdefault.jpg',
      title: 'Essential Building Blocks Working Group, 18:00 UTC Tuesday May 14th 2024',
      description: 'https://github.com/asyncapi/community/issues/1200.',
      videoId: '94SSXX78VCU'
    }
  ],
  null,
  '  '
);

export { expectedResult, mockApiResponse };
