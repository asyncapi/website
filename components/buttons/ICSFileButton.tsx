import IconCalendar from '../icons/Calendar';
import Button from './Button';
// TODO: add this again when we have i18n
// import { useTranslation } from '../../lib/i18n';
import type { IButtonDefaultProps } from './types';

interface IICSFButtonProps extends IButtonDefaultProps {}

export default function ICSFButton({
  text = 'icsFileBtn',
  href,
  target = '_blank',
  iconPosition = 'left',
  className
}: IICSFButtonProps) {
  // TODO: add this again when we have i18n
  // const { t } = useTranslation('common');

  return (
    <Button
      // TODO: add this again when we have i18n
      // text={t(text)}
      text={text}
      icon={<IconCalendar />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={`mt-2 block text-center text-gray-900 md:mt-0 md:inline-block ${className}`}
      bgClassName='bg-gray-200 hover:bg-gray-100'
    />
  );
}
