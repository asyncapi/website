import Button from './Button';
import IconCalendar from '../icons/Calendar';
import { useTranslation } from '../../lib/i18n';

export default function ICSFButton({
  text = 'icsFileBtn',
  href,
  target = '_blank',
  iconPosition = 'left',
  className,
}) {

  const { t } = useTranslation('common');

  return (
    <Button
      text={t(text)}
      icon={<IconCalendar />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={`text-center block mt-2 md:mt-0 md:inline-block text-gray-900 ${className}`}
      bgClassName="bg-gray-200 hover:bg-gray-100"
    />
  )
}

