import Link from 'next/link';
import React, { useState } from 'react';
import GenericLayout from '../../../components/layout/GenericLayout';
import Filter from '../../../components/navigation/Filter';
import Heading from '../../../components/typography/Heading';
import ambassadors from '../../../config/AMBASSADORS_MEMBERS.json';

function Index() {
  const image = '/img/social/website-card.png';
  const [posts, setPosts] = useState(ambassadors);
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
          <Search data={ambassadors} posts={posts} setPosts={setPosts} />
          <hr className="mt-10 md:mt-[20]" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {posts.map((contributor, i) => {
            return (
              <Link
                key={i}
                href={{
                  pathname: `/community/contributors/${contributor.github}`,
                  query: {
                    data: JSON.stringify(contributor),
                  },
                }}
              >
                <div className="rounded-md border cursor-pointer text-left mt-4 pb-2 hover:bg-primary-600 hover:text-white transition hover:ease-in-out duration:300">
                  <div className="flex justify-between p-2">
                    <div>@{contributor.github}</div>
                    <div>{contributor.country}</div>
                  </div>
                  <div className="p-2">
                    <div className="">
                      <div className={`w-full`}>
                        <img
                          src={contributor.img}
                          alt={contributor.name}
                          className="h-[300px] md:h-[150px] w-full object-cover rounded-md"
                        />
                      </div>
                    </div>
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
    <div className="flex flex-col justify-between items-center md:flex-row lg:flex-row">
      <div className="w-full md:w-[40%] lg:w-[40%]">
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="rounded-lg border-primary-600 w-full"
        />
      </div>
      <div className="flex flex-col items-center mt-5 w-full md:w-[auto] md:mt-0 md:flex-row">
        <Filter
          data={data}
          posts={posts}
          onFilter={onFilter}
          checks={countryFilter}
          placeholder="All countries"
          className="w-full md:w-[200px]"
        />
        <Filter
          data={data}
          posts={posts}
          onFilter={onFilter}
          checks={contributionFilter}
          placeholder="All contributions"
          className="w-full mt-5 md:w-[200px] md:mt-0"
        />
      </div>
    </div>
  );
}


export default Index;
