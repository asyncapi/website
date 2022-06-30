import TextTruncate from 'react-text-truncate'
import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'
import TextLink from '../typography/TextLink';
import ArrowRight from '../icons/ArrowRight';

export default function YouTubeCard({ video }) {
  return (
    <li className={`rounded-lg min-w-full h-full px-2 pb-6`}>
      <article className='h-full rounded-lg'>
        <div className={`h-full flex flex-col border border-gray-200 rounded-lg shadow-md divide-y divide-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg overflow-hidden cursor-pointer`}>
          <img
            src={video.image_url}
            alt="video"
            className="h-60 w-full object-cover"
          />
          
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div>
              <Heading level="h3" typeStyle="heading-sm-semibold" className="mt-2">
                {video.title}
              </Heading>
              <Paragraph typeStyle="body-md" className="mt-3 break-words">
                <TextTruncate element="span" line={1} text={video.description} />
              </Paragraph>
            </div>
            
            <div className='mt-6 block'>
              <TextLink
                href={`https://youtube.com/watch?v=${video.videoId}`}
                target="_blank"
              >
                Watch on Youtube
                <ArrowRight className="inline w-6" />
              </TextLink>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};