import React from 'react'
import IconRocket from '../icons/Rocket';
import Heading from '../typography/Heading';
import Button from '../buttons/Button';

export default function Header({className = ''}) {
  return (
      <div className="text-center flex justify-center flex-col items-center mt-10 md:mt-0" data-testid="Header-hero-heading">
        <Heading
          className="countdown-text-gradient font-bold"
          level="h6"
          typeStyle="heading-xs"
        >
          AsyncAPI Community
        </Heading>
        <div className="mt-10" data-testid="Header-heading-1">
          <Heading level="h1" typeStyle="heading-xl" className="">
            <span className="title block md:-mt-1 leading-[3rem]">
              Welcome to the
              <br /> AsyncAPI Community
            </span>
          </Heading>
        </div>
        <div className="mt-5 w-5/6" data-testid="Header-heading-2">
          <Heading
            level="h2"
            typeStyle="body-md"
            textColor="text-gray-700"
            className="text-slate-500 text-sm"
         
          >
            We're an OSS community that's passionate about AsyncAPI. Join us in
            building the future of Event Driven APIs by asking questions,
            sharing ideas, and building connections.
          </Heading>
        </div>
        <div className="mt-10">
          <Button
            className="block md:inline-block focus:outline-none"
            text="AsyncAPI Discussions"
            href="https://github.com/orgs/asyncapi/discussions"
            target="_blank"
            icon={<IconRocket className="w-5 h-5 -mb-1 ml-1" data-testid="Header-IconRocket" />}
          />
        </div>
      </div>
  );
}
