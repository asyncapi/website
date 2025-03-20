import React from 'react'
import IconTwitter from '../icons/Twitter'
import IconFacebook from '../icons/Facebook'
import IconLinkedIn from '../icons/LinkedIn'
import IconInstagram from '../icons/Instagram'

interface SharePopupProps {
  closeSharePop:()=>void;
  posttitle:string;
}

const SharePopup = ({closeSharePop,posttitle}:SharePopupProps) => {
  const[copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    const copyText = document.querySelector('input') as HTMLInputElement;
    copyText.select();
    document.execCommand('copy');
    setCopied(true);

  }
  return (
    <div className=' fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center' >
    <div className=" p-2 absolute top-1/2 left-1/2 -translate-x-1/2 bottom-4 bg-white w-[300px] rounded-lg shadow-lg">
      <section className='flex justify-between  p-2 items-center border-b border-gray-200'>
        <h3 className='text-2xl font-bold'>Share</h3>
        <button className='text-3xl' onClick={()=>closeSharePop()}>&#215;</button>
      </section>
      <section className='p-2'>
        <h4 className='text-sm'>Share this Blog link via</h4>
        <div className='flex justify-center  gap-4 items-center p-2'>
          <a
            href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${posttitle}`}
            target='_blank'
            rel='noreferrer'
            className='p-4 flex justify-center items-center rounded-full border-[1px] border-gray-600'
          >
            <IconTwitter className='h-6'/>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target='_blank'
            rel='noreferrer'
            className='p-4 flex justify-center text-blue-500 items-center rounded-full border-[1px] border-gray-600'
          >
            <IconFacebook className='h-6'/>
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${posttitle}`}
            target='_blank'
            rel='noreferrer'
            className='p-4 flex justify-center items-center text-blue-700 rounded-full border-[1px] border-gray-600'
          >
            <IconLinkedIn className='h-6'/>
          </a>
          <a
            href={`https://www.instagram.com/shareArticle?mini=true&url=${window.location.href}&title=${posttitle}`}
            target='_blank'
            rel='noreferrer'
            className='p-4 flex text-orange-700 justify-center items-center rounded-full border-[1px] border-gray-600'
          >
            <IconInstagram className='h-6'/>
          </a>

        </div>
      </section>
      <section className='p-2'>
        <h4 className='text-sm'>Copy Link</h4>
        <div className='flex justify-center gap-4 items-center p-2'>
          <input
            type='text'
            value={window.location.href}
            className='w-3/4 p-2 border-[1px] border-gray-600 rounded-lg'
          />
          <button className='p-2 border-[1px] hover:bg-blue-500 rounded-lg bg-blue-600 text-white' onClick={()=>handleCopyLink()}>{copied?"copied":"copy"}</button>
        </div>
      </section>
    </div>
  </div>
  )
}

export default SharePopup
