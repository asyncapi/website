import { getPostBySlug, getAllPosts } from './api';
import moment from 'moment';
// import markdownToHtml from './markdownToHtml'

export function getStaticPropsHelper(path) {
  return async function getStaticProps({ params }) {
    const navItems = [
      {
        title: 'Getting started',
        slug: 'docs/getting-started',
        items: getSectionItems('docs/getting-started'),
      },
      {
        title: 'Tutorials',
        slug: 'docs/tutorials',
        items: getSectionItems('docs/tutorials'),
      },
    ];
    const post = getPostBySlug(
      path,
      params && params.slug ? params.slug : 'index',
      [
        'title',
        'date',
        'slug',
        'fullSlug',
        'author',
        'content',
        'ogImage',
        'coverImage',
      ]
    );
    const content = post.content || '';

    return {
      props: {
        post: {
          ...post,
          content,
        },
        navItems,
      },
    };
  };
}

function getSectionItems(path) {
  return getAllPosts(path, ['slug', 'fullSlug', 'title', 'weight']).sort(
    (p1, p2) => (p1.weight || 0) - (p2.weight || 0)
  );
}

export function getStaticPathsHelper(path) {
  return async function getStaticPaths() {
    const posts = getAllPosts(path, ['slug']);

    return {
      paths: posts.map((post) => {
        return {
          params: {
            slug: post.slug,
          },
        };
      }),
      fallback: false,
    };
  };
}

export function getEvents(events, size) {
  let meetingsWithDates = events.map((event) => ({
    ...event,
    date: moment(event.date),
  }));
  meetingsWithDates.sort((a, b) => a.date - b.date);
  if (size) {
    return meetingsWithDates
      .filter((meeting) => meeting.date > new Date())
      .slice(0, size || meetingsWithDates.length);
  }
  const sortedMeetings = [];
  meetingsWithDates.filter((a) => {
    if (a.date > new Date()) {
      sortedMeetings.push(a);
    }
  });
  meetingsWithDates.sort((a, b) => {
    return b.date - a.date
  })
  meetingsWithDates.filter((a) => {
    if (a.date < new Date()) {
      sortedMeetings.push(a);
    }
  });

  meetingsWithDates = sortedMeetings

  return meetingsWithDates;
}

export const generateCaseStudyContent = (data) => {
  const { challenges, solution, usecase, architecture, testing, codegen, schemaStorage, registry, versioning, validation, asyncapiStorage, asyncapiEditing, asyncapiExtensions, asyncapiDocumentation, asyncapiBindings, asyncapiTools, additionalResources, casestudy, fullExample } = data;
  const languages= casestudy.technical.languages
  const frameworks=casestudy.technical.frameworks
  const protocols=casestudy.technical.protocols
  const versions=casestudy.asyncapi.versions 

  return [
    {
      title: "Challenges",
      content: challenges,
    },
    {
      title: "Solution",
      content: solution,
    },
    {
      title: "Use Case",
      content: usecase,
    },
    {
      title: "More Details",
      items: [
        `Languages: ${languages.join(", ")}`,
        `Frameworks: ${frameworks.join(", ")}`,
        `Protocols: ${protocols.join(", ")}`,
      ],
      children: [
        {
          title: "Testing strategy",
          content: testing,
        },
        {
          title: "Approach to code generation",
          content: codegen,
        },
        {
          title: "Architecture",
          content: architecture,
        },
        {
          title: "More Details about AsyncAPI",
          items: [
            `Version: ${versions.join(", ")}`,
            `Who maintains documents: ${casestudy.asyncapi.maintainers}}`,
            `Internal users: ${casestudy.asyncapi.audience.internal.toString()}`,
            `External users: ${casestudy.asyncapi.audience.external.toString()}`,
          ],
          children: [
            {
              title: "How AsyncAPI documents are stored",
              content: asyncapiStorage,
            },
            {
              title: "Where maintainers edit AsyncAPI documents",
              content: asyncapiEditing,
            },
            {
              title: "What extensions are used",
              content: asyncapiExtensions,
            },
            {
              title: "How documentation is generated",
              content: asyncapiDocumentation,
            },
            {
              title: "What bindings are used",
              content: asyncapiBindings,
            },
            {
              title: "What tools are used",
              content: asyncapiTools,
            },
          ],
        },
        {
          title: "Schemas",
          items: [`Spec: ${casestudy.schemas.description}`],
          children: [
            {
              title: "Storage strategy",
              content: schemaStorage,
            },
            {
              title: "Schema Registry",
              content: registry,
            },
            {
              title: "Versioning of schemas",
              content: versioning,
            },
            {
              title: "Validation of message schemas",
              content: validation,
            },
            {
              title: "Additional Resources",
              content: additionalResources,
            },
          ],
        },
      ],
    },
    {
      title: "Production-use AsyncAPI document",
      content: fullExample,
    }
  ];
}