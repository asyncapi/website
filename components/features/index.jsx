const features = [
  { name: "Specification", description: "Allows teams to define the interfaces of an Async API.", link: "docs/specifications/latest" },
  { name: "Document Event Driven Architecture", description: "Don't wait for pain points to start, explore how AsyncAPI can help you today.", link: "docs/getting-started" },
  { name: "Community", description: "Active and welcoming community with over 1500 people.", link: "https://asyncapi.com/slack-invite" },
  { name: "Generator", description : "Generate documentation, code and more out of your AsyncAPI files.", link: "tools/generator" },
  { name: "Code Bindings", description: "Generate data models for JavaScript, TypeScript, Go, C# and more...", link: "tools/modelina" },
  { name: "Encourage new tools", description: "Use our parsers to build your own tools or add AsyncAPI support to your product.", link: "tools/parsers" },
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name}>
                <div className="flow-root shadow-lg rounded-lg px-6 pb-8">
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    {feature.name}
                  </h3>
                  {feature.description && 
                    <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                    </p>
                  }
                  <a className="mt-6 block text-primary-500" href={feature.link}>Documentation &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
