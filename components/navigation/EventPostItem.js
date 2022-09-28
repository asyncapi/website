import { ArrowRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';
import IconCalendar from '../icons/Calendar';
import Community from '../icons/Community';
import Conference from '../icons/Conference';
import Webinar from '../icons/Webinar';
import Heading from '../typography/Heading';

function EventPostItem({ post, className, id }) {
  let color = 'text-orange-800';
  let icon = <Conference />;
  switch (post.type) {
    case 'COMMUNITY CALL':
      icon = <Community />;
      color = 'text-green-800'
      break;
    case 'WEBINAR':
    icon = <Webinar />;
    color = 'text-blue-400'
      break;
  }
  return (
    <li key={id} className={`${className}`}>
      <article className="h-full rounded-lg shadow-md hover:shadow-lg">
        <Link href={post.slug} passHref>
          <a>
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-52 object-cover rounded-t-lg"
            />
            <div className="mt-2 p-5 flex flex-col justify-between h-52 ">
              <div>
                <div className="flex items-center">
                  {icon}{' '}
                  <p className={`ml-3 font-bold text-md ${color}`}>
                    {post.type}
                  </p>
                </div>
                <Heading level="h3" typeStyle="body-lg" className="mt-4">
                  {post.title}
                </Heading>
              </div>
              <div className="flex items-center">
                <IconCalendar className='' />{' '}
                <span className="text-sm font-semibold ml-4">{post.date}</span>{' '}
                <ArrowRightIcon className="w-4 ml-3" />
              </div>
            </div>
          </a>
        </Link>
      </article>
    </li>
  );
}

export default EventPostItem;
