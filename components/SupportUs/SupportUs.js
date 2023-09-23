import { items } from "./SupportItemsList";
export default function SupportUs({ className = '', showSupportBanner = true }) {
  return (
    <div className={ `text-center ${ className }` } data-testid="SupportUs-main">
      <div className="flex flex-wrap md:mb-4 sm:py-2 items-center justify-center md:px-4" data-testid="SupportUs-section">
        { items
          .filter((item) => item.section === 1)
          .map((item, index) => (
            <a
              key={ index }
              href={ item.href }
              target="_blank"
              rel="noopener noreferrer"
              className='block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5'
            >
              <img
                className={ item.imgClass }
                src={ item.imgSrc }
                title={ item.imgTitle }
              />
            </a>
          )) }
      </div>
      <div className="flex flex-wrap mb-4 items-center justify-center md:px-2" data-testid="SupportUs-subsection">
        { items
          .filter((item) => item.section === 2)
          .map((item, index) => (
            <a
              key={ index }
              href={ item.href }
              target="_blank"
              rel="noopener noreferrer"
              className='block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5'
            >
              <img
                className={ item.imgClass }
                src={ item.imgSrc }
                title={ item.imgTitle }
              />
            </a>
          )) }
      </div>
      <div className="flex flex-wrap mb-4 items-center justify-center md:px-2" data-testid="SupportUs-last-div">
        { items
          .filter((item) => item.section === 3)
          .map((item, index) => (
            <a
              key={ index }
              href={ item.href }
              target="_blank"
              rel="noopener noreferrer"
              className='block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5'
            >
              <img
                className={ item.imgClass }
                src={ item.imgSrc }
                title={ item.imgTitle }
              />
            </a>
          )) }
      </div>
    </div>
  );
}

