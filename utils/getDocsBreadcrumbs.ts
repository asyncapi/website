interface DocLike {
  title: string;
  slug?: string;
  isSection?: boolean;
}

export interface Breadcrumb {
  title: string;
  slug: string;
  isCurrent: boolean;
}

/**
 * @description Builds the breadcrumb trail for a docs page from its slug and the
 * list of docs. Every ancestor section slug (e.g. `/docs/concepts`) is resolved
 * to its section title, ending with the current page title.
 *
 * @param {DocLike[]} docs - The full list of docs (from `getAllPosts().docs`).
 * @param {DocLike} post - The docs page currently being rendered.
 * @returns {Breadcrumb[]} The ordered breadcrumb trail, starting from `Docs`.
 */
export default function getDocsBreadcrumbs(docs: DocLike[], post: DocLike): Breadcrumb[] {
  const sectionTitleBySlug = new Map<string, string>();

  docs.forEach((doc) => {
    if (doc.isSection && doc.slug) {
      sectionTitleBySlug.set(doc.slug, doc.title);
    }
  });

  const crumbs: Breadcrumb[] = [{ title: 'Docs', slug: '/docs', isCurrent: false }];

  if (!post.slug || !post.slug.startsWith('/docs')) {
    return crumbs;
  }

  const segments = post.slug.split('/').filter(Boolean);
  let prefix = '';

  segments.forEach((segment, index) => {
    prefix += `/${segment}`;

    // The first segment is `docs`, which is already covered by the root crumb.
    if (index === 0) return;

    const isCurrent = index === segments.length - 1;

    if (isCurrent) {
      crumbs.push({ title: post.title, slug: post.slug as string, isCurrent: true });

      return;
    }

    const sectionTitle = sectionTitleBySlug.get(prefix);

    if (sectionTitle) {
      crumbs.push({ title: sectionTitle, slug: prefix, isCurrent: false });
    }
  });

  return crumbs;
}
