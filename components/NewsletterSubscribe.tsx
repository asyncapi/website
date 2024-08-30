import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import IconCircularLoader from '@/components/icons/CircularLoader';
import { ButtonType } from '@/types/components/buttons/ButtonPropsType';
import { InputTypes } from '@/types/components/InputBoxPropsType';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import Button from './buttons/Button';
import InputBox from './InputBox';
import Loader from './Loader';
import Heading from './typography/Heading';
import Paragraph from './typography/Paragraph';
import TextLink from './typography/TextLink';

enum FormStatus {
  NORMAL = 'normal',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface NewsletterSubscribeProps {
  className?: string;
  dark?: boolean;
  title?: string;
  subtitle?: string;
  type?: string;
}

/**
 * @description This component displays Newsletter Subscribe component.
 *
 * @param {NewsletterSubscribeProps} props - The props for the Newsletter Subscribe component.
 * @param {string} props.className - CSS class for styling the card.
 * @param {boolean} props.dark - If true, the theme of the component will be dark.
 * @param {string} props.title - The title of the Subscribe card.
 * @param {string} props.subtitle - The subtitle of the Subscribe card.
 * @param {string} props.type - The type of subscription.
 */
export default function NewsletterSubscribe({
  className = 'p-8 text-center text-black',
  dark = false,
  title = 'Subscribe to our newsletter to receive news about AsyncAPI.',
  subtitle = 'We respect your inbox. No spam, promise ✌️',
  type = 'Newsletter'
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<FormStatus>(FormStatus.NORMAL);

  const { t } = useTranslation('common');

  const headTextColor = dark ? 'text-white' : '';
  const paragraphTextColor = dark ? 'text-gray-300' : '';

  const setFormStatus = (formResponse: FormStatus) => {
    setStatus(formResponse);
    setTimeout(() => {
      setStatus(FormStatus.NORMAL);
    }, 10000);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setStatus(FormStatus.LOADING);
    event.preventDefault();
    const data = {
      name,
      email,
      interest: type
    };

    fetch('/.netlify/functions/newsletter_subscription', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 200) {
          setFormStatus(FormStatus.SUCCESS);
        } else {
          setFormStatus(FormStatus.ERROR);
        }

        return res.json();
      })
      // eslint-disable-next-line @typescript-eslint/no-shadow, no-console
      .then((data) => console.log(data));
  };

  if (status === FormStatus.SUCCESS) {
    return (
      <div className={className} data-testid='NewsletterSubscribe-main'>
        <Heading level={HeadingLevel.h3} textColor={headTextColor} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
          {t('newsletterCTA.successTitle')}
        </Heading>
        <Paragraph className='mb-8' textColor={paragraphTextColor}>
          {t('newsletterCTA.subtitle')}
        </Paragraph>
      </div>
    );
  }

  if (status === FormStatus.ERROR) {
    return (
      <div className={className} data-testid='NewsletterSubscribe-main'>
        <Heading level={HeadingLevel.h3} textColor={headTextColor} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
          {t('newsletterCTA.errorTitle')}
        </Heading>
        <Paragraph className='mb-8' textColor={paragraphTextColor}>
          {t('newsletterCTA.errorSubtitle')}{' '}
          <TextLink href='https://github.com/asyncapi/website/issues/new?template=bug.md' target='_blank'>
            {t('newsletterCTA.errorLinkText')}
          </TextLink>
        </Paragraph>
      </div>
    );
  }

  return (
    <div className={className} data-testid='NewsletterSubscribe-main'>
      <Heading level={HeadingLevel.h3} textColor={headTextColor} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
        {title}
      </Heading>
      <Paragraph className='mb-8' textColor={paragraphTextColor}>
        {subtitle}
      </Paragraph>
      {status === 'loading' ? (
        <Loader loaderText={'Waiting for response...'} loaderIcon={<IconCircularLoader dark />} dark={dark} />
      ) : (
        <form className='flex flex-col gap-4 md:flex-row' onSubmit={handleSubmit}>
          <InputBox
            inputType={InputTypes.TEXT}
            inputName='name'
            placeholder={t('newsletterCTA.nameInput')}
            inputValue={name}
            setInput={setName}
          />
          <InputBox
            inputType={InputTypes.EMAIL}
            inputName='email'
            placeholder={t('newsletterCTA.emailInput')}
            inputValue={email}
            setInput={setEmail}
          />
          <Button
            type={ButtonType.SUBMIT}
            text={t('newsletterCTA.subscribeBtn')}
            className='mt-2 w-full md:mr-2 md:mt-0 md:flex-1'
            href=''
          />
        </form>
      )}
    </div>
  );
}
