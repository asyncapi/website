import { IJob } from '@/types/job';
import Button from './Button'

interface IApplyJobButtonProps {
  job: IJob
  className?: string
}

export default function ApplyJobButton({ job,  className = '' }: IApplyJobButtonProps) {
  const getHref = (contact: string) => {
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
