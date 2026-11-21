export const SITE_URL = 'https://www.asyncapi.com';

export interface ShareLinks {
  url: string;
  twitter: string;
  linkedin: string;
}

/**
 * @description Builds the public URL of a blog post and the pre-filled sharing links for the
 * supported social platforms. The production site URL is always used (instead of the current
 * origin) so that links shared from previews or local builds still point to a real page.
 *
 * @param {string} slug - The slug of the post, e.g. `/blog/my-post`.
 * @param {string} title - The title of the post, used as the pre-filled text.
 * @returns {ShareLinks} The post URL together with the Twitter/X and LinkedIn sharing links.
 */
export default function getShareLinks(slug: string, title: string): ShareLinks {
  const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`;
  const url = `${SITE_URL}${normalizedSlug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    url,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  };
}
