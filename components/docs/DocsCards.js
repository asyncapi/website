import Link from 'next/link';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

import IconGettingStarted from '../icons/GettingStarted'
import IconTutorials from '../icons/Tutorials'
import IconUseCases from '../icons/UseCases'
import IconSpec from '../icons/Spec'

const cards = [
  {
    title: 'Concepts',
    description: 'Our Concepts section defines the concepts of AsyncAPI features and capabilities.',
    link: '/docs/concepts',
    className: 'bg-secondary-200',
    Icon: IconGettingStarted,
  },
  {
    title: 'Tutorials',
    description: 'Our Tutorials section teaches beginner processes with AsyncAPI by doing.',
    link: '/docs/tutorials',
    className: 'bg-pink-200',
    Icon: IconTutorials,
  },
  {
    title: 'Tools',
    description: 'Our Tools section documents the AsyncAPI tools ecosystem.',
    link: '/docs/tools',
    className: 'bg-green-200',
    Icon: IconUseCases,
  },
  {
    title: 'Reference',
    description: 'Our Reference section teaches how to set up your development environment, CLI, APIs, and beyond.',
    link: '/docs/reference',
    className: 'bg-yellow-200',
    Icon: IconSpec,
  }
];

export function DocsCards() {
  return (
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2'>
      {cards.map(card => (
        <Card key={card.title} {...card} />
      ))}
    </div>
  );
}

function Card({ title, description, link, className, Icon }) {
  return (
    <Link href={link}>
      <a href={link} className='cursor-pointer'>
        <div className="h-full border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out rounded-lg p-6">
          <div>
            <Heading 
              level="h3"
              typeStyle="heading-sm-semibold"
              className='pb-4 border-b border-gray-300'
            >
              <div className='flex flex-row items-center'>
                <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg ${className} text-gray-900 sm:h-12 sm:w-12`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className='ml-4'>{title}</span>
              </div>
            </Heading>
            <Paragraph typeStyle="body-sm" className="mt-5">
              {description}
            </Paragraph>
          </div>
        </div>
      </a>
    </Link>
  );
}
