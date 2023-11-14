import React from 'react';
import IconGithub from '../../../components/icons/Github';
import IconLinkedIn from '../../../components/icons/LinkedIn';
import IconTwitter from '../../../components/icons/Twitter';
import GenericLayout from '../../../components/layout/GenericLayout';
import Heading from '../../../components/typography/Heading';
import ambassadors from '../../../config/AMBASSADORS_MEMBERS.json';

export async function getStaticProps({ params }) {
  const data = ambassadors.filter((p) => p.github === params.id);
  return {
    props: {
      contributor: data[0],
    },
  };
}

export async function getStaticPaths() {
  const paths = ambassadors.map((user) => ({
    params: { id: user.github },
  }));
  return {
    paths,
    fallback: false,
  };
}

function Index({ contributor }) {
  const image = '/img/social/website-card.png';
  return (
    <GenericLayout
      title="AsyncAPI Ambassador Program"
      description="The home for developer communities"
      image={image}
      hideBanner={true}
      wide
    >
      <div className="mt-10 md:mt-20 flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-[65%]">
          <Heading typeStyle="heading-xl" className="countdown-text-gradient">
            {contributor.name}
          </Heading>
          <div className="mt-4 flex items-center">
            <span>{contributor.countryFlag}</span>
            <span className="font-bold ml-2">{contributor.country}</span>
          </div>
          <div className="mt-10">
            <Heading typeStyle="body-lg">{contributor.bio}</Heading>
          </div>
          <div className="mt-10 flex items-center">
            <a
              href={`https://www.twitter.com/${contributor.twitter}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              <div className="p-2 bg-pink-500 rounded-full w-[40px]">
                <IconTwitter className="fill-white" />
              </div>
            </a>
            <a
              href={`https://www.github.com/${contributor.github}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              <div className="p-2 bg-pink-500 rounded-full w-[40px] ml-4">
                <IconGithub className="fill-white" />
              </div>
            </a>
            <a
              href={`https://www.linkedin.com/in/${contributor.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              <div className="p-2 bg-pink-500 rounded-full w-[40px] ml-4">
                <IconLinkedIn className="fill-white" />
              </div>
            </a>
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <img
            src={contributor.img}
            alt={contributor.name}
            className="w-[350px] rounded-lg"
          />
        </div>
      </div>
      <div className="c-contributor-line h-[1px] mt-20" />
      <Heading typeStyle="heading-lg" className="mt-8">
        Contributions
      </Heading>
      <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {contributor.contributions.map((contribution) => {
          return (
            <div
              key={contribution.title}
              className="border mt-5 rounded-lg p-5 text-gray-600 hover:text-pink-600 hover:border-primary-600"
            >
              <a
                key={contribution.title}
                href={contribution.link}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex flex-col justify-between h-full">
                  <Heading typeStyle="body-lg">{contribution.title}</Heading>
                  <div className="flex justify-between mt-4">
                    <div> {contribution.type}</div>{' '}
                    <div>
                      {contribution.date.month}-{contribution.date.year}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </GenericLayout>
  );
}

export default Index;
