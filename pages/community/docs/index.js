import { useContext, useEffect, useState } from 'react';
import Heading from '../../../components/typography/Heading';
import ArrowRight from '../../../components/icons/ArrowRight';

import CommunityDocsContext from '../../../context/CommunityDocsContext';
import GenericLayout from '../../../components/layout/GenericLayout';
import TextLink from '../../../components/typography/TextLink';

function Index() {
    const image = '/img/social/website-card.png';
  let { navItems } = useContext(CommunityDocsContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const newList = navItems.filter((list) => {
      return list.isIndex && list.isIndex === true;
    });
    setCategories(newList);
  }, []);
  return (
    <GenericLayout
      title="Community docs and resources"
      description="The home for developer communities"
      image={image}
      wide
    >
      <div>
        <Heading level="h2" typeStyle="heading-xl" className="mt-20">
          We are developers.
        </Heading>
        <Heading level="h2" typeStyle="body-lg" className="mt-8">
          Join our growing community and help us shape the future of event
          driven architecture.
        </Heading>
      </div>
      <div className="md:flex md:justify-between md:items-center mt-48">
        <div>
          <h4 className="text-4xl font-semibold">Docs & Resources</h4>
        </div>
        <div className="md:w-4/12 md:mt-0 mt-4">
          <Heading level="h2" typeStyle="body-md" className="">
            Explore our API documentation, developer tools, and integration
            resources.
          </Heading>
        </div>
      </div>
      <div className="mt-10 md:mt-32">
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li
              key={category.title}
              className={`h-104 w-62 justify-between border border-primary-100 transition-all duration-300 ease-in-out rounded-md bg-gray-100 text-left flex flex-col justify-between cursor-pointern p-10`}
            >
              <div>
                <img src={category.icon} alt={category.title} className="w-8" />
                <h2 className="mt-5 font-semibold text-xl">{category.title}</h2>
                <p className="mt-5 text-md text-gray-800">
                  {category.description}
                </p>
              </div>
              <div>
                <TextLink href={category.defaultLink} className="no-underline">
                  <div className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer">
                    <span>Learn more </span>
                    <span>
                      <ArrowRight className="w-8" />
                    </span>
                  </div>
                </TextLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </GenericLayout>
  );
}

export default Index;
