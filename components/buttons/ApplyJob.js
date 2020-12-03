import Button from './Button'

export default function ApplyJobButton({ className = '' }) {
  return (
    <Button
      href="mailto:info@asyncapi.io?subject=Applying for the UI/UX/DX designer position"
      target="_blank"
      text="Apply for this job"
      className={className}
    />
  )
}