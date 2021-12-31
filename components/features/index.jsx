const features = [
  {
    name: "Specification",
    description:
      "Allows you to define the interfaces of asynchronous APIs and is protocol agnostic.",
    links: [{ label: "Documentation", href: "docs/specifications/latest", id:'whyasyncapi-spec-documentation-link' }],
  },
  {
    name: "Document APIs",
    description:
      "Use our tools to generate documentation at the build level, on a server, and on a client.",
    links: [
      {
        label: "HTML Template",
        href: "https://github.com/asyncapi/html-template",
        id:'whyasyncapi-apis-htmltemplate-link'
      },
      {
        label: "React Component",
        href: "https://github.com/asyncapi/asyncapi-react/",
        id:'whyasyncapi-apis-reactcomponents-link'
      },
    ],
  },
  {
    name: "Code Generation",
    description:
      "Generate documentation, Code (TypeScript, Java, C#, etc), and more out of your AsyncAPI files.",
    links: [{ label: "Generator", href: "tools/generator", id:'whyasyncapi-generation-generator-link' }, { label: "Modelina", href: "tools/modelina", id:'whyasyncapi-generation-modelina-link' }],
  },
  {
    name: "Community",
    description: "We're a community of great people who are passionate about AsyncAPI and event-driven architectures.",
    links: [
      { label: "Join our Slack", href: "https://asyncapi.com/slack-invite", id:'whyasyncapi-community-slack-link' },
    ],
  },
  {
    name: "Open Governance",
    description:
      "Our Open-Source project is part of Linux Foundation and works under an Open Governance model.",
    links: [{ label: "Read more about Open Governance", href: "blog/governance-motivation", id:'whyasyncapi-governance-more-link' }, { label: "TSC Members", href: "community/tsc", id:'whyasyncapi-governance-tsc-link' }],
  },
  {
    name: "And much more...",
    description:
      "We have many different tools and welcome you to explore our ideas and propose new ideas to AsyncAPI.",
    links: [{ label: "View GitHub Discussions", href: "https://github.com/asyncapi/community/discussions", id:'whyasyncapi-muchmore-github-link' }],
  },
];

export default function Features() {
  return (
    <div className="relative bg-white pt-16">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <p className="mt-2 text-3xl font-extrabold text-primary-800 tracking-tight sm:text-4xl">
          Why AsyncAPI?
        </p>
        <p className="mt-2 max-w-prose mx-auto text-gray-500">
          Improving the current state of Event-Driven Architectures (EDA)
        </p>
        <div className="mt-12 text-left">
          <div className="grid  grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col justify-between border border-gray-200 shadow-lg rounded-lg px-6 pb-8">
                <div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    {feature.name}
                  </h3>
                  {feature.description && (
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  )}
                </div>
                <div className="flex justify-between">
                  {feature.links.map((link) => {
                    return (
                      <a
                        key={link.label}
                        className="mt-6 inline-block text-primary-500"
                        href={link.href}
                        id={link.id}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
