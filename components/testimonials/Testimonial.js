import Paragraph from "../typography/Paragraph";

export default function Testimonial({
  testimonial,
  active
}) {
  const { author, content } = testimonial;
  const activeClassName = active ? 'bg-primary-100 shadow-lg scale-125' : 'bg-white';

  return (
    <blockquote className='h-full rounded-lg pb-4 px-2'>
      <div className={`h-full flex flex-col border border-gray-200 p-8 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg overflow-hidden ${activeClassName}`}>
        <div className="flex-1 relative text-lg leading-7 font-medium text-gray-600 md:flex-1">
          <svg className="absolute top-0 left-0 transform -translate-y-2 h-14 w-14 text-primary-500" fill="currentColor" viewBox="0 0 32 32">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <Paragraph className="relative pt-14 text-left h-full flex flex-col items-center justify-center font-bold">
            {content}
          </Paragraph>
        </div>
        <footer className="mt-6">
          <div className="flex">
            <figure className="flex-shrink-0 inline-flex rounded-full border-2 border-transparent">
              <img className="h-12 w-12 rounded-full" src={author.avatar} alt={author.name}/>
            </figure>
            <div className="ml-4 text-left">
              <p className="text-base leading-6 font-bold text-gray-900">{author.name}</p>
              <p className="text-sm leading-4 font-medium text-primary-500">{author.description}</p>
            </div>
          </div>
          </footer>
      </div>
    </blockquote>
  )
}