import React, { useState } from 'react';

import IconCircularLoader from '@/components/icons/CircularLoader';
import { ButtonType } from '@/types/components/buttons/ButtonPropsType';
import { InputTypes } from '@/types/components/InputBoxPropsType';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import { useTranslation } from '../utils/i18n';
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
  errorSubtitle?: string;
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
 * @param {string} props.errorSubtitle - The error subtitle to be displayed.
 */
export default function NewsletterSubscribe({
  className = 'p-8 text-center text-black',
  dark = false,
  title = 'Subscribe to our newsletter to receive news about AsyncAPI.',
  subtitle = 'We respect your inbox. No spam, promise ✌️',
  type = 'Newsletter',
  errorSubtitle = 'Subscription failed, please let us know about it by submitting a bug'
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<FormStatus>(FormStatus.NORMAL);

  const { t, ready } = useTranslation('common', { keyPrefix: 'newsletterCTA' });

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
    }).then((res) => {
      if (res.status === 200) {
        setFormStatus(FormStatus.SUCCESS);
      } else {
        setFormStatus(FormStatus.ERROR);
      }

      return res.json();
    });
  };

  if (status === FormStatus.SUCCESS) {
    return (
      <div className={className} data-testid='NewsletterSubscribe-main'>
        <Heading level={HeadingLevel.h3} textColor={headTextColor} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
          {ready ? t('successTitle') : 'Thank you for subscribing!'}
        </Heading>
        <Paragraph className='mb-8' textColor={paragraphTextColor}>
          {ready ? t('subtitle') : subtitle}
        </Paragraph>
      </div>
    );
  }

  if (status === FormStatus.ERROR) {
    return (
      <div className={className} data-testid='NewsletterSubscribe-main'>
        <Heading level={HeadingLevel.h3} textColor={headTextColor} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
          {ready ? t('errorTitle') : 'Something went wrong'}
        </Heading>
        <Paragraph className='mb-8' textColor={paragraphTextColor}>
          {ready ? t('errorSubtitle') : errorSubtitle}{' '}
          <TextLink href='https://github.com/asyncapi/website/issues/new?template=bug.md' target='_blank'>
            {ready ? t('errorLinkText') : 'here'}
          </TextLink>
        </Paragraph>
      </div>
    );
  }

  return (
    <div className={className} data-testid='NewsletterSubscribe-main'>
      <Heading level={HeadingLevel.h3} textColor={headTextColor} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
        {ready ? t('title') : title}
      </Heading>
      <Paragraph className='mb-8' textColor={paragraphTextColor}>
        {ready ? t('subtitle') : subtitle}
      </Paragraph>
      {status === 'loading' ? (
        <Loader loaderText={'Waiting for response...'} loaderIcon={<IconCircularLoader dark />} dark={dark} />
      ) : (
        <form className='flex flex-col gap-4 md:flex-row' onSubmit={handleSubmit}>
          <InputBox
            inputType={InputTypes.TEXT}
            inputName='name'
            placeholder={ready ? t('nameInput') : 'Your name'}
            inputValue={name}
            setInput={setName}
          />
          <InputBox
            inputType={InputTypes.EMAIL}
            inputName='email'
            placeholder={ready ? t('emailInput') : 'Your email'}
            inputValue={email}
            setInput={setEmail}
          />
          <Button
            type={ButtonType.SUBMIT}
            text={ready ? t('subscribeBtn') : 'Subscribe'}
            className='mt-2 w-full md:mr-2 md:mt-0 md:flex-1'
            href=''
          />
        </form>
      )}
    </div>
  );
}
