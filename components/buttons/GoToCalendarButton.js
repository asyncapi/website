import Button from './Button';
export default function GoToCalendarButton() {
  return (
    <Button
      className="block md:inline-block md:text-center float-right"
      text="Go to Calendar"
      href="https://calendar.google.com/calendar/u/0/embed?src=tbrbfq4de5bcngt8okvev4lstk@group.calendar.google.com"
      target="_blank"
    />
  );
}
