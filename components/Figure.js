import Caption from './Caption'

export default function Figure ({ src, caption, widthClass, className, float, altOnly, imageClass = ''}) {

  let alt = altOnly || caption;

  let floatClassNames = '';
  if (float === 'left') {
    floatClassNames = 'mr-4 float-left';
  } else if (float === 'right') {
    floatClassNames = 'ml-4 float-right';
  }

  return (
    <figure className={`${className} ${floatClassNames} ${widthClass || 'w-full'}`} data-testid="Figure-div">
      <div className='flex flex-col'>
        <img className={`${imageClass}`} src={src} alt={alt} data-testid="Figure-img" />
        { caption && (<Caption>{caption}</Caption>) }
      </div>
    </figure>
  )
}