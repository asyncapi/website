import Caption from './Caption'

export default function Figure ({ src, caption, widthClass, className }) {
  return (
    <figure className={className}>
      <img className={`${widthClass || 'w-full'} inline-block`} src={src} />
      { caption && (<Caption>{caption}</Caption>) }
    </figure>
  )
}
