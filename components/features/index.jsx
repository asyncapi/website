const features = [
  {
    name: "Specification",
    description:
      "Allows you define the interfaces of asynchronous APIs and is protocol agnostic.",
    links: [{ label: "Documentation", href: "docs/specifications/latest" }],
  },
  {
    name: "Document APIs",
    description:
      "Use our tools that let you generate documentation on a build level, on a server and on a client.",
    links: [
      {
        label: "HTML Template",
        href: "https://github.com/asyncapi/html-template",
      },
      {
        label: "React Component",
        href: "https://github.com/asyncapi/asyncapi-react/",
      },
    ],
  },
  {
    name: "Code Generation",
    description:
      "Generate documentation, Code (TypeScript, Java, C#, etc) and more out of your AsyncAPI files.",
    links: [{ label: "Generator", href: "tools/generator" }, { label: "Modelina", href: "tools/modelina" }],
  },
  {
    name: "Community",
    description: "We're a community of great people who are passionate about AsyncAPI and event-driven architectures.",
    links: [
      { label: "Join us", href: "https://asyncapi.com/slack-invite" },
    ],
  },
  {
    name: "Open Governance",
    description:
      "Open source project that is part of Linux Foundation and works under open governance model.",
    links: [{ label: "Read more", href: "blog/governance-motivation" }, { label: "TSC Members", href: "community/tsc" }],
  },
  {
    name: "And much more...",
    description:
      "We have many different tools and welcome you to explore our ideas and propose new ideas to AsyncAPI.",
    links: [{ label: "View GitHub Discussions", href: "https://github.com/asyncapi/community/discussions" }],
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
          <div className="grid  grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col justify-between shadow-lg rounded-lg px-6 pb-8">
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
