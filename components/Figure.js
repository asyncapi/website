import Caption from './Caption'

export default function Figure ({ src, caption, widthClass }) {
  return (
    <figure>
      <img className={widthClass || "w-full"} src={src} />
      <Caption>{caption}</Caption>
    </figure>
  )
}
