import Paragraph from './typography/Paragraph';

interface TestimonialProps {
  className?: string;
  text: string;
  authorName: string;
  authorDescription: string;
  authorAvatar: string;
}

/**
 * @description This component displays Testimonial component.
 *
 * @param {TestimonialProps} props - The props for the Testimonial component.
 * @param {string} props.className - Additional CSS class for styling the card.
 * @param {string} props.text - The testimonial from the author.
 * @param {string} props.authorName - The name of the author.
 * @param {string} props.authorDescription - The description of the author.
 * @param {string} props.authorAvatar - The path to avatar of the author.
 */
export default function Testimonial({
  className = '',
  text,
  authorName,
  authorDescription,
  authorAvatar
}: TestimonialProps) {
  return (
    <li className={`p-4 sm:px-6 md:flex md:flex-row md:py-4 md:pr-0 ${className}`}>
      <blockquote className='mt-8 md:flex md:grow md:flex-col'>
        <div className='relative text-lg font-medium leading-7 text-gray-600 md:flex-1'>
          <svg
            className='absolute left-0 top-0 size-8 -translate-y-2 text-primary-500'
            fill='currentColor'
            viewBox='0 0 32 32'
          >
            <path d='M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z' />
          </svg>
          <Paragraph className='relative pl-10 text-left'>{text}</Paragraph>
        </div>
        <footer className='mt-6'>
          <div className='flex'>
            <figure className='inline-flex shrink-0 rounded-full border-2 border-white'>
              <img className='size-12 rounded-full' src={authorAvatar} alt={authorName} data-testid='Testimonial-img' />
            </figure>
            <div className='ml-4 text-left'>
              <p className='text-base font-bold leading-6 text-gray-900'>{authorName}</p>
              <p className='text-base font-medium leading-6 text-primary-500'>{authorDescription}</p>
            </div>
          </div>
        </footer>
      </blockquote>
    </li>
  );
}
