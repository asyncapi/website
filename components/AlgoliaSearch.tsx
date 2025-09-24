/* eslint-disable no-underscore-dangle */
import { DocSearchModal } from '@docsearch/react';
import type { DocSearchHit, InternalDocSearchHit, StoredDocSearchHit } from '@docsearch/react/dist/esm/types';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const INDEX_NAME = 'asyncapi';
export const DOCS_INDEX_NAME = 'asyncapi-docs';
const APP_ID = 'Z621OGRI9Y';
const API_KEY = '5a4122ae46ce865146d23d3530595d38';

interface ISearchContext {
  isOpen: boolean;
  onOpen: (indexName?: string) => void;
  onClose: () => void;
  onInput?: (e: React.KeyboardEvent) => void;
}

const SearchContext = createContext<ISearchContext>({} as ISearchContext);

interface IHitProps {
  hit: (StoredDocSearchHit | InternalDocSearchHit) & {
    __is_result?: () => boolean;
    __is_parent?: () => boolean;
    __is_child?: () => boolean;
    __is_first?: () => boolean;
    __is_last?: () => boolean;
  };
  children: React.ReactNode;
}

interface AlgoliaModalProps {
  onClose: (event?: React.MouseEvent) => void;
  initialQuery: string;
  indexName: string;
}

interface IUseDocSearchKeyboardEvents {
  isOpen: boolean;
  onOpen: (indexName?: string) => void;
  onClose: () => void;
  onInput?: (e: React.KeyboardEvent) => void;
}

type ISearchButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children?: React.ReactNode | (({ actionKey }: { actionKey: { shortKey: string; key: string } }) => React.ReactNode);
  indexName?: string;
};

/**
 *
 * @description The function used to transform the items
 * @param {StoredDocSearchHit[]} items - The items to be transformed
 */
function transformItems(items: DocSearchHit[]) {
  return items.map((item, index) => {
    // We transform the absolute URL into a relative URL to
    // leverage Next's preloading.
    const a = document.createElement('a');

    a.href = item.url;

    const hash = a.hash === '#content-wrapper' || a.hash === '#header' ? '' : a.hash;

    if (item.hierarchy?.lvl0) {
      // eslint-disable-next-line no-param-reassign
      item.hierarchy.lvl0 = item.hierarchy.lvl0.replace(/&amp;/g, '&');
    }

    return {
      ...item,
      url: `${a.pathname}${hash}`,
      __is_result: () => true,
      __is_parent: () => item.type === 'lvl1' && items.length > 1 && index === 0,
      __is_child: () => item.type !== 'lvl1' && items.length > 1 && items[0].type === 'lvl1' && index !== 0,
      __is_first: () => index === 1,
      __is_last: () => index === items.length - 1 && index !== 0
    };
  });
}

/**
 *
 * @description The hit component used for the Algolia search
 * @param {IHitProps} props - The props of the hit
 */
function Hit({ hit, children }: IHitProps) {
  return (
    <Link
      href={hit.url}
      className={clsx({
        'DocSearch-Hit--Result': hit.__is_result?.(),
        'DocSearch-Hit--Parent': hit.__is_parent?.(),
        'DocSearch-Hit--FirstChild': hit.__is_first?.(),
        'DocSearch-Hit--LastChild': hit.__is_last?.(),
        'DocSearch-Hit--Child': hit.__is_child?.()
      })}
    >
      {children}
    </Link>
  );
}

/**
 *
 * @description The Algolia modal used for searching the website
 * @param {IAlgoliaModalProps} props - The props of the Algolia modal
 */
function AlgoliaModal({ onClose, initialQuery, indexName }: AlgoliaModalProps) {
  const router = useRouter();

  return createPortal(
    <DocSearchModal
      initialQuery={initialQuery}
      initialScrollY={window.scrollY}
      searchParameters={{
        distinct: 1
      }}
      placeholder={indexName === DOCS_INDEX_NAME ? 'Search documentation' : 'Search resources'}
      onClose={onClose}
      indexName={indexName}
      apiKey={API_KEY}
      appId={APP_ID}
      navigator={{
        navigate({ itemUrl }) {
          onClose();
          router.push(itemUrl);
        }
      }}
      hitComponent={Hit}
      transformItems={transformItems}
      getMissingResultsUrl={({ query }) => {
        return `https://github.com/asyncapi/website/issues/new?title=Cannot%20search%20given%20query:%20${query}`;
      }}
    />,
    document.body
  );
}

/**
 * @description The function used to check if the content is being edited
 * @param {KeyboardEvent} event - The keyboard event
 * @returns {boolean} - Whether the content is being edited
 */
function isEditingContent(event: KeyboardEvent) {
  const element = event.target;
  const { tagName } = element as HTMLElement;

  return (
    (element as HTMLElement).isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA'
  );
}

/**
 * @description The function used to get the action key
 * @returns {Object} - The action key
 */
function getActionKey() {
  if (typeof navigator !== 'undefined') {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent || navigator.platform)) {
      return {
        shortKey: '⌘',
        key: 'Command'
      };
    }

    return {
      shortKey: 'Ctrl',
      key: 'Control'
    };
  }

  return {
    shortKey: 'Ctrl',
    key: 'Control'
  };
}

/**
 *
 * @description The hook used for the Algolia search keyboard events
 * @param {IUseDocSearchKeyboardEvents} props - The props of the useDocSearchKeyboardEvents hook
 */
function useDocSearchKeyboardEvents({ isOpen, onOpen, onClose }: IUseDocSearchKeyboardEvents) {
  useEffect(() => {
    /**
     * @description The function used to handle the keyboard event.
     * @description It opens the search modal when the '/' key is pressed
     * @description It closes the search modal when the 'Escape' key is pressed
     * @description It opens the search modal when the 'k' key is pressed with the 'Command' or 'Control' key
     * @param {KeyboardEvent} event - The keyboard event
     * @returns {void}
     */
    function onKeyDown(event: KeyboardEvent): void {
      if (
        (event.key === 'Escape' && isOpen) ||
        (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
        (!isEditingContent(event) && event.key === '/' && !isOpen)
      ) {
        event.preventDefault();

        if (isOpen) {
          onClose();
        } else if (!document.body.classList.contains('DocSearch--active')) {
          let indexName = INDEX_NAME;

          if (typeof document !== 'undefined') {
            const loc = document.location;

            indexName = loc.pathname.startsWith('/docs') ? DOCS_INDEX_NAME : INDEX_NAME;
          }
          onOpen(indexName);
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onOpen, onClose]);
}

/**
 *
 * @description The Algolia search component used for searching the website
 * @param {React.ReactNode} children - The content of the page
 */
export default function AlgoliaSearch({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [indexName, setIndexName] = useState<string>(INDEX_NAME);
  const [initialQuery, setInitialQuery] = useState<string>();

  const onOpen = useCallback(
    (_indexName?: string) => {
      if (_indexName) {
        setIndexName(_indexName);
      }
      setIsOpen(true);
    },
    [setIsOpen, setIndexName]
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(
    (e: React.KeyboardEvent) => {
      setIsOpen(true);
      setInitialQuery(e.key);
    },
    [setIsOpen, setInitialQuery]
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput
  });

  return (
    <>
      <Head>
        <link rel='preconnect' href={`https://${APP_ID}-dsn.algolia.net`} crossOrigin='anonymous' />
      </Head>
      <SearchContext.Provider value={{ isOpen, onOpen, onClose, onInput }}>{children}</SearchContext.Provider>
      {isOpen && <AlgoliaModal initialQuery={initialQuery ?? ''} onClose={onClose} indexName={indexName} />}
    </>
  );
}

/**
 *
 * @description The search button component used for opening the Algolia search
 * @param {ISearchButtonProps} props - The props of the search button
 */
export function SearchButton({ children, indexName = INDEX_NAME, ...props }: ISearchButtonProps) {
  const { onOpen, onInput } = useContext(SearchContext);
  const [Children, setChildren] = useState<string | React.ReactNode>('');
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const actionKey = getActionKey();

  useEffect(() => {
    /**
     * @description It triggers the onInput event when a key is pressed and the search button is focused
     * @description It starts search with the key pressed
     * @param {KeyboardEvent} event - The keyboard event
     * @returns {void}
     */
    function onKeyDown(event: KeyboardEvent) {
      if (searchButtonRef && searchButtonRef.current === document.activeElement && onInput) {
        if (/[a-zA-Z0-9]/.test(event.key)) {
          onInput(event as unknown as React.KeyboardEvent);
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onInput, searchButtonRef]);

  useEffect(() => {
    if (typeof children === 'function') {
      setChildren(children({ actionKey }));
    } else {
      setChildren(children);
    }
  }, []);

  return (
    <button
      type='button'
      ref={searchButtonRef}
      onClick={() => {
        onOpen(indexName);
      }}
      {...props}
      data-testid='Search-Button'
    >
      {Children}
    </button>
  );
}
