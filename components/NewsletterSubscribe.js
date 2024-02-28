import { useState } from "react";
import Button from "./buttons/Button";
import Heading from "./typography/Heading";
import TextLink from "./typography/TextLink";
import Paragraph from "./typography/Paragraph";
import Loader from "./Loader";
import { useTranslation } from "../lib/i18n";

export default function NewsletterSubscribe({
  className = 'p-8 text-center',
  dark = false,
  title = 'Subscribe to our newsletter to receive news about AsyncAPI.',
  subtitle = 'We respect your inbox. No spam, promise ✌️',
  type='Newsletter',
}) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState("normal");

  const { t } = useTranslation('common');

  const headTextColor = dark ? 'text-white' : ''
  const paragraphTextColor = dark ? 'text-gray-300' : ''

  const handleSubmit = (e) => {
    setStatus("loading");
    e.preventDefault()
    const data = {
      name: name,
      email: email,
      interest: type
    }

    fetch("/.netlify/functions/newsletter_subscription", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status === 200) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
      return res.json()
    }).then((data) => console.log(data))
  }

  const setFormStatus = (formResponse) => {
    setStatus(formResponse);
    setTimeout(() => {
      setStatus("normal");
    }, 10000);
  }

  if (status === "success") {
    return (
      <div className={className} data-testid="NewsletterSubscribe-main">
        <Heading
          level="h3"
          textColor={headTextColor}
          typeStyle="heading-lg"
          className="mb-4"
        >
          {t('newsletterCTA.successTitle')}
        </Heading>
        <Paragraph className="mb-8" textColor={paragraphTextColor}>
        {t('newsletterCTA.subtitle')}
        </Paragraph>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className={className} data-testid="NewsletterSubscribe-main">
        <Heading
          level="h3"
          textColor={headTextColor}
          typeStyle="heading-lg"
          className="mb-4"
        >
          {t('newsletterCTA.errorTitle')}
        </Heading>
        <Paragraph className="mb-8" textColor={paragraphTextColor}>
          {t('newsletterCTA.errorSubtitle')}{' '}<TextLink href="https://github.com/asyncapi/website/issues/new?template=bug.md" target="_blank">{t('newsletterCTA.errorLinkText')}</TextLink> 
        </Paragraph>
      </div>
    )
  }

  return (
    <div className={className} data-testid="NewsletterSubscribe-main">
      <Heading
        level="h3"
        textColor={headTextColor}
        typeStyle="heading-lg"
        className="mb-4"
      >
        {title}
      </Heading>
      <Paragraph className="mb-8" textColor={paragraphTextColor}>
        {subtitle}
      </Paragraph>
      {status === "loading" ? <Loader dark={dark} /> : <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder={t('newsletterCTA.nameInput')} value={name} onChange={(e) => setName(e.target.value)} className="form-input block w-full sm:text-sm sm:leading-5 md:mt-0 md:flex-1 rounded-md" required data-testid="NewsletterSubscribe-text-input" />
        <input type="email" name="email" placeholder={t('newsletterCTA.emailInput')} value={email} onChange={(e) => setEmail(e.target.value)} className="form-input block w-full mt-2 sm:text-sm sm:leading-5 md:mt-0 md:flex-1 rounded-md" required data-testid="NewsletterSubscribe-email-input" />
        <Button type="submit" text={t('newsletterCTA.subscribeBtn')} className="w-full mt-2 md:mr-2 md:mt-0 md:flex-1" />
      </form>}
    </div>
  )
}