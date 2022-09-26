import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import Tag from './Tags'
import TextTruncate from 'react-text-truncate';

export default function toolsCard() {
  return (
    <div className="border shadow-md rounded-lg">
      <div className="flex gap-4 pt-8 px-6">
        {/* <img src="https://unsplash.com/photos/MRjjcDIk3Gw" className="w-20 rounded-full" /> */}
        <div>
        <div className="w-20 h-20 rounded-full bg-gray-500"></div>
        <div className='bg-green-100 border border-green-600 text-green-600 p-1 text-center font-medium text-sm w-fit rounded-lg relative mx-auto -top-4'>
            FREE
        </div>
        </div>
        <div className="flex flex-col gap-2">
          <Heading typeStyle="heading-sm-semibold">Go AsyncAPI</Heading>
          <Paragraph typeStyle="body-sm">
            <TextTruncate
              element="span"
              line={2}
              text="It uses reflection to translate Go structures in JSON Schema definitions and arrange them in AsyncAPI schema. Thanks to @vearutop."
            />
          </Paragraph>
          <div className="text-secondary-500 underline hover:text-gray-800 font-regular text-sm transition ease-in-out duration-300">
            Show More
          </div>
        </div>
      </div>
      <hr className="my-6 mx-6" />
      <div className="flex flex-col gap-2 mx-6">
        <div className="text-gray-700 text-sm font-semibold">LANGUAGES</div>
        <div className="flex gap-2">
            <Tag name='Javascript' bgColor='bg-[#C8F2C7]' borderColor='border-[#bfbe86]' />
        </div>
      </div>
      <div className="flex flex-col gap-2 my-4 mx-6">
        <div className="text-gray-700 text-sm font-semibold">TECHNOLOGIES</div>
        <div className="flex gap-2"></div>
      </div>
      <hr className="" />
      <div className="flex">
          <div className="w-1/2 text-center py-6">
              <div className="m-auto flex w-fit gap-2">
                <img src='/img/logos/github-black.svg' className='w-5' />
                <div className='text-gray-700 text-sm'>View on Github</div>
              </div>
          </div>
          <div className="w-1/2 text-center py-6">
              <div className="m-auto flex w-fit gap-2">
                <img src='/img/illustrations/icons/share.svg' className='w-5' />
                <div className='text-gray-700 text-sm'>Visit Website</div>
              </div>
          </div>
      </div>
    </div>
  );
}
