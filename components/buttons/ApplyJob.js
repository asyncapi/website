import Button from './Button'

export default function ApplyJobButton({ job,  className = '' }) {

  const getHref = (contact) => {

    try {
      new URL(contact);
    } catch (_) {
      return `mailto:${contact}`;  
    }

    return contact;
  }

  return (
    <Button
      href={getHref(job.contact)}
      target="_blank"
      text="Apply for this job"
      className={className}
    />
  )
}