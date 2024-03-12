import { useContext } from 'react';
import DocsContext from '../../context/DocsContext';
import { DocsContextType } from '@/types/context/DocsContext';
import { IDoc } from '@/types/post';
import IconArrowRight from '../icons/ArrowRight';
import Link from 'next/link';

interface TutorialListProps {
  className?: string;
}

export default function TutorialList({ className = '' }: TutorialListProps) {
  const { post, navItems }: DocsContextType = useContext(DocsContext);

  const tutorials: IDoc[] = Object.values(navItems)
    .filter((item) => ('sectionSlug' in item && 'isIndex' in item && 'slug' in item && 'title' in item && 'description' in item && typeof item.slug === 'string') && item.sectionSlug === post.slug && !item.isIndex) as IDoc[];

  return (
    <div className={`${className} grid grid-cols-1 gap-4 sm:grid-cols-2`}>
      {tutorials.map((tuto: IDoc, index: number) => (
        <Link href={tuto.slug} key={index}>
          <a
            className="flex flex-col mt-4 p-6 max-w-lg rounded shadow-md border border-gray-200 text-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-300 cursor-pointer"
          >
            <h5 className="text-lg font-medium font-sans antialiased mb-2">{tuto.title}</h5>
            <p className="flex-1 mb-2 font-normal font-sans antialiased">{tuto.description}</p>
            <p className="text-primary-600 font-medium font-sans antialiased">
              Start tutorial
              <IconArrowRight className="inline-block h-4" />
            </p>
          </a>
        </Link>
      ))}
    </div>
  );
};
