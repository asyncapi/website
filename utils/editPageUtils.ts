import type {
  URLMappingConfig,
  URLMapperResult,
  EditPageConfigEntry,
} from '@/types/components/EditPageButton';

import editOptionsRaw from '../config/edit-page-config.json';

const editOptions = editOptionsRaw as EditPageConfigEntry[];

export const URL_MAPPING_CONFIG: URLMappingConfig = {
  baseGitHubUrl: 'https://github.com/asyncapi/website',
  branch: 'master',
  contentMappings: [
    {
      urlPattern: '/blog/*',
      sourceDirectory: 'markdown/blog',
      fileExtension: '.md',
      customMapper: (slug: string) => {
        const cleanSlug = slug.replace(/^\/blog\//, '');
        return `${cleanSlug}.md`;
      },
    },
    {
      urlPattern: '/docs/*',
      sourceDirectory: 'markdown/docs',
      fileExtension: '.md',
      customMapper: (slug: string) => {
        return mapDocsSlugToFile(slug);
      },
    },
    {
      urlPattern: '/about/*',
      sourceDirectory: 'markdown/about',
      fileExtension: '.md',
      customMapper: (slug: string) => {
        const cleanSlug = slug.replace(/^\/about\//, '');
        return `${cleanSlug}.md`;
      },
    },
  ],
};

function mapDocsSlugToFile(slug: string): string {
  const target = editOptions.find((edit) => {
    return slug.includes(edit.value);
  });

  if (!target) {
    const cleanSlug = slug.replace(/^\/docs\//, '');
    return `${cleanSlug}.md`;
  }

  if (target.value === '') {
    const cleanSlug = slug.replace(/^\/docs\//, '');
    return `${cleanSlug}.md`;
  }

  return slug.replace(/^\/docs\//, '') + '.md';
}

function validateGitHubUrl(url: string): string {
  try {
    const urlObj = new URL(url);

    if (!urlObj.hostname.includes('github.com')) {
      throw new Error('Invalid GitHub URL');
    }

    const pathParts = urlObj.pathname
      .split('/')
      .map((part) => encodeURIComponent(decodeURIComponent(part)));
    urlObj.pathname = pathParts.join('/');

    return urlObj.toString();
  } catch (error) {
    return url;
  }
}

export function mapUrlToGitHubEdit(
  slug: string,
  contentType: 'blog' | 'docs' | 'about',
): URLMapperResult {
  try {
    const config = URL_MAPPING_CONFIG;

    if (contentType === 'docs') {
      const target = editOptions.find((edit) => slug.includes(edit.value));

      if (target) {
        if (target.value === '') {
          const cleanSlug = slug.replace(/^\/docs\//, '');
          const filePath = `${cleanSlug}.md`;
          const editUrl = `${target.href}/docs/${filePath}`;

          return {
            editUrl: validateGitHubUrl(editUrl),
            success: true,
          };
        } else {
          let fileName = slug.substring(slug.lastIndexOf('/') + 1);
          if (fileName.endsWith('.mdx')) {
            fileName = fileName.replace('.mdx', '.md');
          }

          const hrefList = target.href?.split('/');
          if (hrefList) {
            const lastListElement = hrefList[hrefList.length - 1].split('.');
            const isHrefToFile = lastListElement.length > 1;

            if (isHrefToFile) {
              fileName = '';
            }
          }

          const editUrl = `${target.href}/${fileName}`;
          return {
            editUrl: validateGitHubUrl(editUrl),
            success: true,
          };
        }
      }
    }

    if (contentType === 'blog' || contentType === 'about') {
      const target = editOptions.find(
        (edit) =>
          edit.contentType === contentType && slug.startsWith(edit.value),
      );

      if (target) {
        const fileName = slug.substring(slug.lastIndexOf('/') + 1);
        const editUrl = `${target.href}/${fileName}.md`;

        return {
          editUrl: validateGitHubUrl(editUrl),
          success: true,
        };
      }
    }

    const mapping = config.contentMappings.find((m) => {
      const pattern = m.urlPattern.replace('*', '');
      return slug.startsWith(pattern);
    });

    if (!mapping) {
      const fallbackUrl = `${config.baseGitHubUrl}/tree/${config.branch}`;
      return {
        editUrl: validateGitHubUrl(fallbackUrl),
        success: false,
        error: `No mapping found for content type: ${contentType}. Linking to repository root.`,
      };
    }

    let filePath: string;
    if (mapping.customMapper) {
      filePath = mapping.customMapper(slug);
    } else {
      const cleanSlug = slug.replace(new RegExp(`^/${contentType}/`), '');
      filePath = `${cleanSlug}${mapping.fileExtension}`;
    }

    const editUrl = `${config.baseGitHubUrl}/edit/${config.branch}/${mapping.sourceDirectory}/${filePath}`;

    return {
      editUrl: validateGitHubUrl(editUrl),
      success: true,
    };
  } catch (error) {
    const fallbackUrl = `${URL_MAPPING_CONFIG.baseGitHubUrl}/tree/${URL_MAPPING_CONFIG.branch}`;
    return {
      editUrl: validateGitHubUrl(fallbackUrl),
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export function getContentTypeFromSlug(
  slug: string,
): 'blog' | 'docs' | 'about' | null {
  if (slug.startsWith('/blog/')) return 'blog';
  if (slug.startsWith('/docs/')) return 'docs';
  if (slug.startsWith('/about/')) return 'about';
  return null;
}

export function shouldShowEditButton(slug: string): boolean {
  const contentType = getContentTypeFromSlug(slug);
  return contentType !== null;
}

export function openGitHubUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    if (!urlObj.hostname.includes('github.com')) {
      return false;
    }

    const newWindow = window.open(
      url,
      '_blank',
      'noopener,noreferrer,width=1200,height=800,scrollbars=yes,resizable=yes',
    );

    if (newWindow) {
      newWindow.opener = null;
      return true;
    }

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer nofollow';
    link.referrerPolicy = 'no-referrer';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    return false;
  }
}
