import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import NavBar from "../../components/navigation/NavBar";
import Container from "../../components/layout/Container";
import BlogContext from "../../context/BlogContext";
import BlogPostItem from "../../components/navigation/BlogPostItem";
import Footer from "../../components/Footer";
import Head from "../../components/Head";
import AnnouncementHero from "../../components/campaigns/AnnoucementHero";
import Filter from "../../components/navigation/Filter";
import Empty from "../../components/illustrations/empty";
import Heading from "../../components/typography/Heading";
import StickyNavbar from "../../components/navigation/StickyNavbar"
import Paragraph from "../../components/typography/Paragraph";
import TextLink from "../../components/typography/TextLink";
import Button from "../../components/buttons/Button";
import GenericLayout from "../../components/layout/GenericLayout";

export default function BlogIndexPage() {
  const router = useRouter();
  const { navItems } = useContext(BlogContext);
  const [posts, setPosts] = useState(
    navItems.sort((i1, i2) => {
      const i1Date = new Date(i1.date);
      const i2Date = new Date(i2.date);

      if (i1.featured && !i2.featured) return -1;
      if (!i1.featured && i2.featured) return 1;
      return i2Date - i1Date;
    })
  );

  const onFilter = (data) => setPosts(data);
  const toFilter = [
    {
      name: "type",
    },
    {
      name: "authors",
      unique: "name",
    },
    {
      name: "tags",
    },
  ];
  const clearFilters = () => {
    router.push(`${router.pathname}`, undefined, {
      shallow: true,
    });
  };
  const showClearFilters = Object.keys(router.query).length > 0;

  const description = 'Find the latest and greatest stories from our community';
  const image = '/img/social/blog.webp';

  return (
    <GenericLayout
      title="Blog"
      description={description}
      image={image}
      wide
    >

      <div className="relative pt-8 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8" id="main-content">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <Heading
              level="h1"
              typeStyle="heading-lg"
            >
              Welcome to our blog!
            </Heading>
            <Paragraph className="mt-3 sm:mt-4 max-w-2xl mx-auto">
              Find the latest and greatest stories from our community
            </Paragraph>
            <Paragraph typeStyle="body-md" className="max-w-2xl mx-auto mt-4">
              Want to publish a blog post? We love community stories.
              <TextLink href="https://github.com/asyncapi/website/issues/new?template=blog.md" target="_blank">
                Submit yours!
              </TextLink>
            </Paragraph>
            <Paragraph typeStyle="body-md" className="max-w-2xl mx-auto mt-1">
              We have an<img
                className="ml-1 text-primary-500 hover:text-primary-300"
                style={{ display: "inline" }}
                src="/img/logos/rss.svg"
                alt="RSS feed"
                height="18px"
                width="18px"
              />
              <TextLink href="/rss.xml">
                RSS Feed
              </TextLink>
              , too!
            </Paragraph>
          </div>
          <div className="mt-12 mx:64 md:flex md:justify-center lg:justify-start">
            <Filter
              data={navItems}
              onFilter={onFilter}
              className="w-full mx-px md:mt-0 mt-1 md:w-1/5 md: md:text-sm"
              checks={toFilter}
            />
            {showClearFilters && (
              <button
                type="button"
                className="bg-none border border-gray-200 text-gray-800 hover:text-gray-700 shadow-none transition-all duration-500 ease-in-out rounded-md px-4 text-md font-semibold tracking-heading md:mt-0 mt-1 md:py-0 py-2"
                onClick={clearFilters}
              >
                <span className="inline-block">Clear filters</span>
              </button>
            )}
          </div>
          <div>
            {!Object.keys(posts).length ? (
              <div className="flex flex-col items-center justify-center mt-16">
                <Empty />
                <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500">
                  No post matches your filter
                </p>
              </div>
            ) : (
              <ul className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
                {posts.map((post, index) => (
                  <BlogPostItem key={index} post={post} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </GenericLayout>
  );
}
