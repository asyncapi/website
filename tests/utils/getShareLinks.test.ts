import getShareLinks, { SITE_URL } from '../../utils/getShareLinks';

describe('getShareLinks', () => {
  it('builds the public post URL from the slug', () => {
    expect(getShareLinks('/blog/my-post', 'My post').url).toBe(`${SITE_URL}/blog/my-post`);
  });

  it('adds the leading slash when the slug does not have one', () => {
    expect(getShareLinks('blog/my-post', 'My post').url).toBe(`${SITE_URL}/blog/my-post`);
  });

  it('builds the Twitter intent link with the encoded title and URL', () => {
    expect(getShareLinks('/blog/my-post', 'My post').twitter).toBe(
      'https://twitter.com/intent/tweet?text=My%20post&url=https%3A%2F%2Fwww.asyncapi.com%2Fblog%2Fmy-post'
    );
  });

  it('builds the LinkedIn share link with the encoded URL', () => {
    expect(getShareLinks('/blog/my-post', 'My post').linkedin).toBe(
      'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.asyncapi.com%2Fblog%2Fmy-post'
    );
  });

  it('encodes characters that would otherwise break the query string', () => {
    const { twitter } = getShareLinks('/blog/my-post', 'Q&A: events #1 & 100% async?');

    expect(twitter).toContain('text=Q%26A%3A%20events%20%231%20%26%20100%25%20async%3F&url=');
    expect(new URL(twitter).searchParams.get('text')).toBe('Q&A: events #1 & 100% async?');
  });
});
