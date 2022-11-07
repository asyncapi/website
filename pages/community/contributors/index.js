import Link from 'next/link';
import React, { useState } from 'react';
import GenericLayout from '../../../components/layout/GenericLayout';
import Filter from '../../../components/navigation/Filter';
import Heading from '../../../components/typography/Heading';

function Index() {
  const image = '/img/social/website-card.png';
  const data = Array(5).fill({
    img: '/img/homepage/ale.jpeg',
    name: 'Alejandra Quatzelli',
    username: 'alejandra',
    countryFlag: '🇲🇽',
    country: 'Mexico',
    className: 'top-[2rem] left-[40rem]',
    tags: ['Documentation', 'Articles'],
    title: 'DevRel & DevDocs @AsyncAPI',
    bio: 'Hecha en 🇲🇽 • 📑OSS DevDocs & Community @asyncAPIspec• 📚Autora @Apress(2023) • Canela🐕‍🦺 es mi #actuallyautistic #ServiceDog • Rebelde🤟🏽• mis opiniones',
    twitter: 'https://twitter.com/QuetzalliAle',
    github: 'https://github.com/alequetzalli',
    linkedin: 'https://www.linkedin.com/in/alejandra-quat',
    contributions: []
  });
  const [posts, setPosts] = useState(data);
  return (
    <GenericLayout
      title="AsyncAPI Ambassador Program"
      description="The home for developer communities"
      image={image}
      hideBanner={true}
      wide
    >
      <div className="mt-20">
        <Heading typeStyle="heading-xl">Meet the stars</Heading>
        <div className="mt-10">
          <Search data={data} posts={posts} setPosts={setPosts} />
          <hr className="mt-20" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {posts.map((contributor, i) => {
            return (
              <Link
                key={i}
                href={{
                  pathname: `/community/contributors/${contributor.username}`,
                  query: contributor
                }}
              >
                <div className="rounded-md border cursor-pointer text-left mt-4 pb-2 hover:bg-primary-600 hover:text-white transition hover:ease-in-out duration:300">
                  <div className="flex justify-between p-2">
                    <div>@{contributor.username}</div>
                    <div>{contributor.countryFlag}</div>
                  </div>
                  <div className="p-2">
                    <div
                      className={`bg-[url('/img/homepage/ale.jpeg')] w-full h-[150px] bg-center bg-cover rounded-md`}
                    ></div>
                    <div className="text-center mt-2">{contributor.name}</div>
                    <div className="mt-2 w-full rounded-lg border p-2 text-xs font-bold">
                      {contributor.title}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </GenericLayout>
  );
}

function Search({ data, posts, setPosts }) {
  const onFilter = (data) => setPosts(data);
  const countryFilter = [
    {
      name: 'country',
    },
  ];
  const contributionFilter = [
    {
      name: 'tags',
    },
  ];
  const onSearch = (target) => {
    let users = data,
    result = [];
    result = users.filter((user) => {
      return user.name.toLowerCase().search(target) != -1;
    });
   setPosts(result)
  };
  return (
    <div className="flex justify-between items-center">
      <div className="w-[40%]">
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="rounded-lg border-primary-600 w-full"
        />
      </div>
      <div className="flex items-center">
        <Filter
          data={data}
          posts={posts}
          onFilter={onFilter}
          checks={countryFilter}
          placeholder="All countries"
          className="w-[200px]"
        />
        <Filter
          data={data}
          posts={posts}
          onFilter={onFilter}
          checks={contributionFilter}
          placeholder="All contributions"
          className="w-[200px]"
        />
      </div>
    </div>
  );
}

export default Index;
