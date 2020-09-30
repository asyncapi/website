import Caption from './Caption'

export default function Figure ({ src, caption }) {
  return (
    <figure>
      <img className="w-full" src={src} />
      <Caption>{caption}</Caption>
    </figure>
  )
}
