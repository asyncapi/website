import FeaturedBlogPost from './FeaturedBlogPost';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import Button from '../buttons/Button';
import Link from 'next/link';
import { getAllPosts } from '../../lib/api';
import { useTranslation } from '../../lib/i18n';

export default function NewsroomSection() {

  const { t } = useTranslation('common');

  const posts = getAllPosts()['blog']
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
      <section className="mt-10 lg:mt-4 relative w-fit mx-auto lg:w-1/2" data-testid="NewsroomSection-Featured">
        <div className='absolute z-10 -mt-6'>
            <Button className="text-center block md:inline-block border-secondary-500 border text-secondary-500 shadow-md p-2" text={t("newsroomSection.newsroomFeaturedPost")} bgClassName="bg-secondary-100" />
        </div>
        <FeaturedBlogPost post={posts[0]} />
      </section>
      <section className="lg:text-left lg:max-w-xl lg:w-1/2 lg:ml-12 mt-5 lg:my-auto" data-testid="NewsroomSection-main">
        <Heading typeStyle="heading-md-semibold" level="h3">
          {t("newsroomSection.title")}
        </Heading>
        <Paragraph typeStyle="body-lg" className="mt-5">
        {t("newsroomSection.description")}
        </Paragraph>
        <div className='mt-7' >
        <Button text={t("newsroomSection.newsroomBtn")} href='/community/newsroom' data-testid="NewsroomSection-Link"/>
        </div>
      </section>
    </div>
  );
}
