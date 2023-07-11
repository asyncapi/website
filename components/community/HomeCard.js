import React from 'react'
import Heading from '../typography/Heading';
import Button from '../buttons/Button';

export default function HomeCards({headline, title, description, btnText, link, className}) {
  return (
    <div className="z-40 mt-20 bg-white w-full md:h-130 rounded-lg shadow-xl md:flex md:justify-between">
      <div className="p-10 flex justify-between w-full md:w-2/5 h-auto flex-col text-center md:text-left">
        <div  data-testid="HomeCard-main">
          <Heading
            level="h2"
            typeStyle="heading-md"
            textColor="text-purple-300"
        
          >
            {headline}
          </Heading>
        </div>
        <div data-testid="HomeCard-title">
          <Heading level="h2" typeStyle="heading-lg" className="mt-10" >
            {title}
          </Heading>
          <Heading
            level="h2"
            typeStyle="body-lg"
            textColor="text-gray-700"
            className="text-slate-500 text-sm mt-10"
          >
            {description}
          </Heading>
          <div className="mt-10" data-testid="HomeCard-button">
            <Button text={btnText} buttonSize="medium" href={link} />
          </div>
        </div>
      </div>
      <div
        className={`w-full h-fit-content md:w-3/6 flex justify-end rounded-r-lg bg-cover bg-center ${className}`}
      />
    </div>
  );
}