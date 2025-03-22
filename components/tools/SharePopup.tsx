import React from 'react';

import IconLinkedIn from '../icons/LinkedIn';
import IconTwitter from '../icons/Twitter';
import IconBlueSky from '../icons/Bluesky';

interface SharePopupProps {
  closeSharePop: () => void;
  posttitle: string;
}

const SharePopup = ({ closeSharePop, posttitle }: SharePopupProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    const copyText = document.querySelector('input') as HTMLInputElement;

    copyText.select();
    navigator.clipboard.writeText(copyText.value).then(() => {
      setCopied(true);
    }
    );
  };

  return (
    <div className=' fixed left-0 top-0 z-50 flex size-full items-center justify-center bg-gray-800/80'>
      <div className=' absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-2 shadow-lg md:-translate-y-[20%] md:scale-125'>
        <section className='flex items-center  justify-between border-b border-gray-200 p-2'>
          <h3 className='text-2xl font-bold'>Share</h3>
          <button className='text-3xl' onClick={() => closeSharePop()}>
            &#215;
          </button>
        </section>
        <section className='p-2'>
          <h4 className='text-sm'>Share this Blog link via</h4>
          <div className='flex items-center  justify-center gap-4 p-2'>
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${posttitle}`}
              target='_blank'
              rel='noreferrer'
              className='flex items-center justify-center rounded-full border border-gray-600 p-4'
            >
              <IconTwitter className='h-6' />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${posttitle}`}
              target='_blank'
              rel='noreferrer'
              className='flex items-center justify-center rounded-full border border-gray-600 p-4 text-blue-700'
            >
              <IconLinkedIn className='h-6' />
            </a>
            <a
              href={`https://bsky.app/share?url=${window.location.href}&title=${posttitle}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-full border border-gray-600 p-4 text-orange-700"
            >
              <IconBlueSky className="h-6" />
            </a>

          </div>
        </section>
        <section className='p-2'>
          <h4 className='text-sm'>Copy Link</h4>
          <div className='flex items-center justify-center gap-4 p-2'>
            <input type='text' value={window.location.href} className='w-3/4 rounded-lg border border-gray-600 p-2' />
            <button
              className='rounded-lg border bg-blue-600 p-2 text-white hover:bg-blue-500'
              onClick={() => handleCopyLink()}
            >
              {copied ? 'copied' : 'copy'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SharePopup;
