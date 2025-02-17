import IconTwitter from './icons/Twitter';
import IconLinkedIn from './icons/LinkedIn';
interface SocialShareButtonsProps {
    url: string;
    text: string;
  }
  
  export function SocialShareButtons({ url, text }: SocialShareButtonsProps) {
    return (
      <div className='mt-4 flex space-x-4'>
        <a
          href={`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=AsyncAPI`}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 hover:text-blue-700'
        >
          <IconTwitter className='size-6' />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-700 hover:text-blue-900'
        >
          <IconLinkedIn className='size-6' />
        </a>
      </div>
    );
  }