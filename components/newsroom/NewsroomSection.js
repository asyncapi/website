import FeaturedBlogPost from './FeaturedBlogPost';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import Button from '../buttons/Button';
import Link from 'next/link';
import { getAllPosts } from '../../lib/api';

export default function NewsroomSection() {
  const posts = getAllPosts()
    .filter((p) => p.slug.startsWith('/blog/'))
    .sort((i1, i2) => {
      const i1Date = new Date(i1.date);
      const i2Date = new Date(i2.date);

      if (i1.featured && !i2.featured) return -1;
      if (!i1.featured && i2.featured) return 1;
      return i2Date - i1Date;
    })
    .slice(0, 1);
  return (
    <div className="mt-12 lg:flex justify-between">
      <section className="mt-10 lg:mt-0 relative lg:w-1/2">
        <div className='absolute z-10 -mt-6'>
            <Button className="text-center block md:inline-block border-secondary-500 border text-secondary-500 shadow-md" text="FEATURED BLOG POST" bgClassName="bg-secondary-100" />
        </div>
        <FeaturedBlogPost post={posts[0]} />
      </section>
      <section className="lg:text-left lg:max-w-xl lg:w-1/2 lg:ml-7 mt-5 lg:my-auto">
        <Heading typeStyle="heading-md-semibold" level="h3">
          Latest news and blogs
        </Heading>
        <Paragraph typeStyle="body-lg" className="mt-5">
          We welcome everyone to join our Slack workspace. If you have a question on how to use AsyncAPI, want to contribute, or simply want to say hello 👋 you're welcome to join us. We're nice people 🙂
        </Paragraph>
        <div className='mt-7'>
        <Button text='Visit the Newsroom' href='/community/newsroom' />
        </div>
      </section>
    </div>
  );
}
