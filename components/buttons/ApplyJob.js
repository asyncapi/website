import Button from './Button'

function getHref(contact) {
  try {
    new URL(contact);
  } catch (_) {
    return `mailto:${contact}`;  
  }
  return contact;
}

export default function ApplyJobButton({ job, className = '' }) {
  return (
    <Button
      href={getHref(job.meta.contact)}
      target="_blank"
      text="Apply for this job"
      className={className}
    />
  )
}
