import Button from "./buttons/Button";
import Heading from "./typography/Heading";
import Paragraph from "./typography/Paragraph";
import { useTranslation } from "../lib/i18n";

export default function NewsletterSubscribe ({
  className = 'p-8 text-center',
  dark = false,
  title = 'Subscribe to our newsletter to receive news about AsyncAPI.',
  subtitle = 'We respect your inbox. No spam, promise ✌️',
  type,
}) {

  const { t } = useTranslation('common'); 

  const headTextColor = dark ? 'text-white' : ''
  const paragraphTextColor = dark ? 'text-gray-300' : ''

  return (
    <div className={className} data-testid="NewsletterSubscribe-main">
      <Heading 
        level="h3"
        textColor={headTextColor}
        typeStyle="heading-lg"
        className="mb-4"
      >
        {t('newsletterCTA.title')}
      </Heading>
      <Paragraph className="mb-8" textColor={paragraphTextColor}>
        {t('newsletterCTA.subtitle')}
      </Paragraph>
      <form name="form 1" method="POST" className="md:flex" data-netlify="true">
        <input type="hidden" name="form-name" value="form 1" />
        <input type="hidden" name="type" value={type} />
        <input type="text" name="name" placeholder={t('newsletterCTA.nameInput')} className="form-input block w-full sm:text-sm sm:leading-5 md:mr-2 md:mt-0 md:flex-1 rounded-md" required data-testid="NewsletterSubscribe-text-input"/>
        <input type="email" name="email" placeholder={t('newsletterCTA.emailInput')} className="form-input block w-full mt-2 sm:text-sm sm:leading-5 md:mr-2 md:mt-0 md:flex-1 rounded-md" required data-testid="NewsletterSubscribe-email-input"/>
        <Button type="submit" text={t('newsletterCTA.subscribeBtn')} className="w-full mt-2 md:mr-2 md:mt-0 md:flex-1" />
      </form>
    </div>
  )
}