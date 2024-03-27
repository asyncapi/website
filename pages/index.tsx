import { Inter } from 'next/font/google';

import AlgoliaSearch, { SearchButton } from '@/components/AlgoliaSearch';
import Button from '@/components/buttons/Button';
import IconArrowRight from '@/components/icons/ArrowRight';
import IconLoupe from '@/components/icons/Loupe';

import { useTranslation } from '../utils/i18n';

const inter = Inter({ subsets: ['latin'] });

/**
 * @description The Home component is the main page of the application.
 */
export default function Home() {
  const { t } = useTranslation('landing-page');

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className='flex flex-col items-center justify-center gap-2 md:flex-row'>
        <Button
          className='block w-full md:w-auto'
          text={t('main.docs_btn')}
          href='/docs'
          icon={<IconArrowRight className='-mb-1 size-5' />}
          data-testid='Hero-Button'
        />
        {/* Wrap SearchButton with AlgoliaSearch component */}
        <AlgoliaSearch>
          <SearchButton
            className={`flex w-full items-center space-x-3 rounded-md border border-secondary-500 
              bg-secondary-100 px-4 py-3 text-left text-secondary-500 shadow-md transition-all 
              duration-500 ease-in-out hover:bg-secondary-500 hover:text-white md:w-auto`}
          >
            {({ actionKey }) => (
              <>
                <IconLoupe />
                <span className='flex-auto'>{t('main.search_btn')}</span>
                {actionKey && (
                  <kbd className='font-sans font-semibold'>
                    <abbr title={actionKey.key} className='no-underline'>
                      {actionKey.shortKey}
                    </abbr>{' '}
                    K
                  </kbd>
                )}
              </>
            )}
          </SearchButton>
        </AlgoliaSearch>
      </div>
    </main>
  );
}
