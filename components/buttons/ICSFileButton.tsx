import Button from './Button';
import IconCalendar from '../icons/Calendar';
// TODO: add this again when we have i18n
// import { useTranslation } from '../../lib/i18n';
import { IButtonDefaultProps } from './types';

interface IICSFButtonProps extends IButtonDefaultProps {}

export default function ICSFButton({
  text = 'icsFileBtn',
  href,
  target = '_blank',
  iconPosition = 'left',
  className,
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
      className={`text-center block mt-2 md:mt-0 md:inline-block text-gray-900 ${className}`}
      bgClassName="bg-gray-200 hover:bg-gray-100"
    />
  )
}

