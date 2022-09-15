import {useContext, useEffect, useState} from 'react'
import CommunityLayout from '../../../components/layout/CommunityLayout'
import Heading from '../../../components/typography/Heading';
import ArrowRight from "../../../components/icons/ArrowRight";
import Link from 'next/link';
import CommunityDocsContext from '../../../context/CommunityDocsContext';

// const categories = [
//   {
//     title: 'Getting started',
//     description:
//       'The essential guide to start using Commerce Layer"s REST API. Keep it as your reference for all the operations that you can perform on the API resources.',
//     icon: <Book />,
//     link: 'docs/getting-started',
//   },
//   {
//     title: 'Governance',
//     description:
//       'A comprehensive list of all Commerce Layer"s core resources. Check the structure of the objects and the allowed CRUD operations you can perform on each endpoint.',
//     icon: <Book />,
//     link: '/',
//   },
//   {
//     title: 'Writing Documentation',
//     description:
//       'A curated, regularly updated, and chronologically ordered list of notable changes for Commerce Layer APIs and apps, including product releases, new features, and general improvements.',
//     icon: <Book />,
//     link: '/',
//   },
//   {
//     title: 'CI/CD',
//     description:
//       'A React based application that provides you with a production-ready, self-contained store. Each microstore will be accessible at a unique URL and configurable via URL query strings, with no development required.',
//     icon: <GH />,
//     link: '/',
//   },
// ];

function Index() {
  let {navItems} = useContext(CommunityDocsContext)
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const newList = navItems.filter((list) => {
      return list.isIndex && list.isIndex === true
    })
    setCategories(newList)
  },[])
  return (
    <CommunityLayout
      title="Community docs and resources"
      description="The home for developer communities"
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
      <div className="flex justify-between items-center mt-48">
        <div>
          <h4 className="text-4xl font-semibold">Docs & Resources</h4>
        </div>
        <div className="w-4/12">
          <Heading level="h2" typeStyle="body-md" className="">
            Explore our API documentation, developer tools, and integration
            resources.
          </Heading>
        </div>
      </div>
      <div className="mt-10 md:mt-32">
        <ul className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li
              key={category.title}
              className={`h-104 w-62 justify-between border border-primary-100 transition-all duration-300 ease-in-out rounded-md bg-gray-100 text-left flex flex-col justify-between cursor-pointern p-10`}
            >
              <div>
                <img src={category.icon} alt={category.title} className='w-8' />
                <h2 className="mt-5 font-semibold text-xl">{category.title}</h2>
                <p className="mt-5 text-md text-gray-800">
                  {category.description}
                </p>
              </div>
              <div>
                <Link href={category.defaultLink} className="text">
                  <div className='flex items-center text-gray-600 hover:text-gray-900 cursor-pointer'>
                    <span>Learn more </span>
                    <span>
                      <ArrowRight className="w-8" />
                    </span>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </CommunityLayout>
  );
}

export default Index