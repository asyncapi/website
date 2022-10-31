import Button from './Button'
import moment from 'moment';
export default function ApplyJobButton({ job,  className = '', extend }) {
    const localTime = moment().format('YYYY-MM-DD'); // store localTime
    const currentDate = localTime + 'T00:00:00.000Z';
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
      text={extend ? currentDate < job.date ? "Add to Calender" : "View Recording" : "Apply for this job"}
      className={className}
    />
  )
}