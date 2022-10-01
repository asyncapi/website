import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import Tag from './Tags';
import TextTruncate from 'react-text-truncate';

export default function toolsCard({toolData}) {
  return (
    <div className="border shadow-md rounded-lg">
      <div className="flex gap-4 pt-8 px-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <Heading typeStyle="heading-sm-semibold">{toolData.title}</Heading>
            <div className='bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs w-fit h-fit rounded-md'>
              {toolData.filters.hasCommercial=== false ? 'FREE' : 'PAID'}
            </div>
          </div>
          <div className="flex">
            <Paragraph typeStyle="body-sm">
              <TextTruncate
                element="span"
                line={2}
                text={toolData.description}
              />
            </Paragraph>
          </div>
          <div className="text-secondary-500 cursor-pointer inline underline hover:text-gray-800 font-regular text-sm transition ease-in-out duration-300">
            Show More
          </div>
        </div>
      </div>
      <hr className="my-6 mx-6" />
      <div className="flex flex-col gap-2 mx-6">
        <div className="text-gray-700 text-sm font-semibold">LANGUAGES</div>
        <div className="flex gap-2">
          <Tag
            name={toolData.filters.language.name}
            bgColor={`bg-[${toolData.filters.language.color}]`}
            borderColor={`border-[${toolData.filters.language.borderColor}]`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 my-4 mx-6">
        <div className="text-gray-700 text-sm font-semibold">TECHNOLOGIES</div>
        <div className="flex gap-2"></div>
      </div>
      <hr className="" />
      <div className="flex">
        <a className="w-full text-center py-6 hover:bg-gray-200 cursor-pointer"  href={toolData.links.repoUrl} target='_blank' rel='noreferrer'>
          <div className="m-auto flex w-fit gap-2">
            <img src="/img/logos/github-black.svg" className="w-5" />
            <div className="text-gray-700 text-sm">View on Github</div>
          </div>
        </a>
        {toolData.links.websiteUrl && (
          <>
            <div className='border border-gray-200 h-auto'></div>
            <a className="w-full text-center py-6 hover:bg-gray-200 cursor-pointer" href={toolData.links.repoUrl} target='_blank' rel='noreferrer'>
              <div className="m-auto flex w-fit gap-2">
                <img src="/img/illustrations/icons/share.svg" className="w-5" />
                <div className="text-gray-700 text-sm">Visit Website</div>
              </div>
            </a>
          </>
        )}
        
      </div>
    </div>
  );
}
