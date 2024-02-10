import Link from 'next/link';
import React from 'react'
import IconArrowUp from '../icons/ArrowUp';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

export default function SmallHomeCards({icon, tagline, taglineBg, type="large", heading, description, bg, btnText, btnBg, link}) {
  if(type === "small"){
    return (
      <Link href={link} target="_blank">
        <a target={link.includes('http') && '_blank'}>
          <div
            className={`p-3 cursor-pointer border shadow-xl rounded w-full border-[#ad20e2] ${bg}`}
            data-testid="Card-small-bg">
            <div className="p-2 rounded-xl bg-gray-100 text-center dark:text-black w-min text-xs flex justify-between">
              <span>{icon}</span> <span className="ml-[5px]">{tagline}</span>
            </div>
            <div className="mt-3" data-testid="Card-heading">
              <Heading level="h1" typeStyle="heading-md">
                {heading}
              </Heading>
            </div>
            <div className="mt-2" data-testid="Card-desc">
              <Paragraph
                textColor={bg ? 'text-black' : 'text-gray-600'}
                typeStyle="body-sm"
              >
                {description}
              </Paragraph>
            </div>
            <div className="text-right w-full flex justify-end" data-testid="Card-icon">
              <IconArrowUp className="w-[20px]" />
            </div>
          </div>
        </a>
      </Link>
    );
  }
  return (
    <div
      className={`h-140 w-full shadow-xl rounded p-6 border ${
        !bg && 'border-[#ad20e2]'
      } ${bg}`}
    data-testid="Card-lg-bg">
      <div
        className={`p-2 rounded-xl dark:text-black text-center w-min text-xs flex justify-between ${taglineBg}`}
      data-testid="Card-lg-tagline">
        <span>{icon}</span> <span className="ml-[5px]">{tagline}</span>
      </div>

      <div className="mt-10" data-testid="Card-heading-lg">
        <Heading
          level="h1"
          typeStyle="heading-lg"
          textColor={bg && 'text-white'}
        >
          {heading}
        </Heading>
      </div>
      <div className="mt-6" data-testid="Card-desc-lg">
        <Paragraph textColor={bg && 'text-gray-400'}>{description}</Paragraph>
      </div>
      <div className="mt-10">
        <Link href={link}>
          <a data-testid="Card-link-lg">
            <div className={`flex ${btnBg} cursor-pointer`}>
              <IconArrowUp className={`w-[20px] ${btnBg}`} />{' '}
              <span className="ml-2 text-sm">{btnText}</span>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
