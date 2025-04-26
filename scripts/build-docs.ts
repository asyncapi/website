import lodash from 'lodash';

import type { NavTree, NavTreeItem, RecursiveChildren } from '@/types/scripts/build-docs';
import type { Details, NavigationPage } from '@/types/scripts/build-posts-list';

const { sortBy } = lodash;

/**
 * Constructs a navigation tree from an array of navigation items.
 *
 * The tree is initialized with a default "Welcome" section and then populated by sorting
 * and organizing items into root sections, subsections, and documents. Each item is placed under its
 * appropriate parent, and an error is thrown if a referenced parent section is not found.
 *
 * For the root section identified as "reference", if a "specification" subgroup exists,
 * its href is updated to point to the latest stable specification version.
 *
 * @param navItems - An array of navigation items with properties such as title, weight, section identifiers,
 *                   and parent references.
 * @returns The constructed navigation tree.
 *
 * @throws {Error} If a referenced parent section is missing or if any error occurs during the tree building process.
 */
function buildNavTree(navItems: Details[]): NavTree {
  try {
    const tree: NavTree = {
      welcome: {
        item: {
          title: 'Welcome',
          weight: 0,
          isRootSection: true,
          isSection: true,
          rootSectionId: 'welcome',
          sectionWeight: 0,
          slug: '/docs'
        },
        children: {} as RecursiveChildren
      }
    };

    // first we make sure that list of items lists main section items and then sub sections, documents last
    const sortedItems = sortBy(navItems, ['isRootSection', 'weight', 'isSection']);

    sortedItems.forEach((item) => {
      // identify main sections
      if (item.isRootSection) {
        tree[item.rootSectionId!] = { item, children: {} };
      }

      // identify subsections
      if (item.parent) {
        if (!tree[item.parent]) {
          throw new Error(`Parent section ${item.parent} not found for item ${item.title}`);
        }

        (tree[item.parent].children as RecursiveChildren)[item.sectionId!] = { item, children: [] as Details[] };
      }

      if (!item.isSection) {
        const rootSectionChildren = tree[item.rootSectionId!].children as RecursiveChildren;

        if (item.sectionId) {
          const section = rootSectionChildren[item.sectionId];

          if (!section) {
            rootSectionChildren[item.sectionId] = {
              item,
              children: [] as Details[]
            };
          }
          (rootSectionChildren[item.sectionId].children! as Details[]).push(item);
        } else {
          rootSectionChildren[item.title] = { item };
        }
      }
    });

    for (const [rootKey, rootValue] of Object.entries(tree)) {
      const allChildren = rootValue.children as RecursiveChildren;
      const allChildrenKeys = Object.keys(allChildren as RecursiveChildren);

      rootValue.children = allChildrenKeys
        .sort((prev, next) => {
          return allChildren[prev]!.item.weight! - allChildren[next]!.item.weight!;
        })
        .reduce(
          (
            obj: {
              [key: string]: NavTreeItem;
            },
            key
          ) => {
            // eslint-disable-next-line no-param-reassign
            obj[key] = allChildren[key];

            return obj;
          },
          {}
        );

      // handling subsections
      if (allChildrenKeys.length > 1) {
        for (const key of allChildrenKeys) {
          const childrenOfAllChildren = allChildren[key].children as Details[];

          /* istanbul ignore else */
          // eslint-disable-next-line max-depth
          if (childrenOfAllChildren) {
            childrenOfAllChildren!.sort((prev, next) => {
              return prev.weight! - next.weight!;
            });
          }

          // point in slug for specification subgroup to the latest specification version
          // eslint-disable-next-line max-depth
          if (rootKey === 'reference' && key === 'specification') {
            allChildren[key].item.href = childrenOfAllChildren.find((c) => c.isPrerelease === undefined)!.slug;
          }
        }
      }
    }

    return tree;
  } catch (err) {
    throw new Error(`Failed to build navigation tree: ${err}`);
  }
}

/**
 * Recursively converts document posts to a sequential array.
 *
 * @param {NavTree | Details} docObject - The document object to convert.
 * @returns {Details[]} - The sequential array of document posts.
 * @throws {Error} - Throws an error if there is an issue during the conversion process.
 */
function convertDocPosts(docObject: NavTree | Details | NavTreeItem): Details[] {
  try {
    let docsArray: Details[] = [];

    // certain entries in the DocPosts are either a parent to many posts or itself a post.

    if (!docObject) {
      throw new Error('Document object is undefined');
    }
    docsArray.push(docObject.item || docObject);
    if (docObject?.children) {
      const { children } = docObject;

      Object.keys(children).forEach((child) => {
        const docChildArray = convertDocPosts(children[child] as Details);

        docsArray = [...docsArray, ...docChildArray];
      });
    }

    return docsArray;
  } catch (err: unknown) {
    throw new Error(`Error in convertDocPosts: ${(err as Error).message}`);
  }
}

/**
 * Enhances document posts by appending next and previous navigation data based on the navigation tree.
 *
 * This function traverses the navigation tree to create a sequential list of document posts and then adds
 * navigation properties (`nextPage` and `prevPage`) to each page entry where applicable. It ensures that the
 * welcome page (identified by the '/docs' slug) is included as the first post while excluding non-content
 * section markers from navigation linking.
 *
 * @param docPosts - The document posts to be augmented.
 * @param treePosts - The hierarchical navigation tree that organizes the document posts.
 * @returns The document posts enriched with navigation buttons for adjacent pages.
 * @throws {Error} Throws an error if an issue occurs while adding navigation buttons.
 */
function addDocButtons(docPosts: Details[], treePosts: NavTree): Details[] {
  let structuredPosts: Details[] = [];
  const rootSections: string[] = [];

  try {
    // Traversing the whole DocTree and storing each post inside them in sequential order
    Object.keys(treePosts).forEach((rootElement) => {
      structuredPosts.push(treePosts[rootElement].item);
      if (treePosts[rootElement].children) {
        const { children } = treePosts[rootElement];
        const childrenTyped = children as NavTree | Details;

        Object.keys(childrenTyped).forEach((child) => {
          const docChildArray = convertDocPosts(childrenTyped[child]);

          structuredPosts = [...structuredPosts, ...docChildArray];
        });
      }
    });

    // Appending the content of welcome page of Docs from the posts.json
    [structuredPosts[0]] = docPosts.filter((p) => p.slug === '/docs');

    // Traversing the structuredPosts in order to add `nextPage` and `prevPage` details for each page
    const countDocPages = structuredPosts.length;

    structuredPosts = structuredPosts.map((post, index) => {
      // post item specifying the root Section or sub-section in the docs are excluded as
      // they doesn't comprise any Doc Page or content to be shown in website.
      if (post?.isRootSection || post?.isSection || index === 0) {
        if (post?.isRootSection || index === 0) rootSections.push(post.title);

        return post;
      }

      let nextPage = {} as NavigationPage;
      let prevPage = {} as NavigationPage;
      let docPost = post as Details;

      // checks whether the next page for the current docPost item exists or not
      if (index + 1 < countDocPages) {
        // checks whether the next item inside structuredPosts is a rootElement or a sectionElement
        // if yes, it goes again to a next to next item in structuredPosts to link the nextPage
        /* istanbul ignore else */
        if (!structuredPosts[index + 1].isRootElement && !structuredPosts[index + 1].isSection) {
          nextPage = {
            title: structuredPosts[index + 1].title,
            href: structuredPosts[index + 1].slug
          };
        } else if (index + 2 < countDocPages) {
          nextPage = {
            title: `${structuredPosts[index + 1].title} - ${structuredPosts[index + 2].title}`,
            href: structuredPosts[index + 2].slug
          };
        }
        docPost = { ...docPost, nextPage };
      }

      // checks whether the previous page for the current docPost item exists or not
      /* istanbul ignore else */
      if (index > 0) {
        // checks whether the previous item inside structuredPosts is a rootElement or a sectionElement
        // if yes, it goes again to a next previous item in structuredPosts to link the prevPage
        /* istanbul ignore else */
        if (!structuredPosts[index - 1]?.isRootElement && !structuredPosts[index - 1]?.isSection) {
          prevPage = {
            title: structuredPosts[index - 1].title,
            href: structuredPosts[index - 1].slug
          };
          docPost = { ...docPost, prevPage } as Details;
        } else if (index - 2 >= 0) {
          // additional check for the first page of Docs so that it doesn't give any Segementation fault
          prevPage = {
            title: `${structuredPosts[index - 1]?.isRootSection ? rootSections[rootSections.length - 2] : rootSections[rootSections.length - 1]} - ${structuredPosts[index - 2].title}`,
            href: structuredPosts[index - 2].slug
          };
          docPost = { ...docPost, prevPage } as Details;
        }
      }

      return docPost;
    });
  } catch (err) {
    throw new Error(`An error occurred while adding doc buttons: ${(err as Error).message}`);
  }

  return structuredPosts;
}

export { addDocButtons, buildNavTree, convertDocPosts };
