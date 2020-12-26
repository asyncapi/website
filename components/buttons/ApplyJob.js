import Button from './Button'

export default function ApplyJobButton({ job,  className = '' }) {
  return (
    <Button
      href={`mailto:info@asyncapi.io?subject=Applying for the ${job.title} position`}
      target="_blank"
      text="Apply for this job"
      className={className}
    />
  )
}