const generateContent = (data) => {
  const { challenges, solution, usecase, architecture, testing, codegen, schemaStorage, registry, versioning, validation, asyncapiStorage, asyncapiEditing, asyncapiExtensions, asyncapiDocumentation, asyncapiBindings, asyncapiTools, additionalResources, casestudy } = data;
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
  ];
}