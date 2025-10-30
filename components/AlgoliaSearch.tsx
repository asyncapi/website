/* eslint-disable no-underscore-dangle */
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
  hit: any;
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

// Dynamic import for DocSearchModal
const DocSearchModal = React.lazy(() => import('@docsearch/react').then(module => ({
  default: module.DocSearchModal
})));

function transformItems(items: any[]) {
  return items.map((item, index) => {
    const a = document.createElement('a');
    a.href = item.url;
    const hash = a.hash === '#content-wrapper' || a.hash === '#header' ? '' : a.hash;

    if (item.hierarchy?.lvl0) {
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

function AlgoliaModal({ onClose, initialQuery, indexName }: AlgoliaModalProps) {
  const router = useRouter();

  return createPortal(
    <React.Suspense fallback={
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-center">Loading search...</p>
        </div>
      </div>
    }>
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
      />
    </React.Suspense>,
    document.body
  );
}

function isEditingContent(event: KeyboardEvent) {
  const element = event.target;
  const { tagName } = element as HTMLElement;

  return (
    (element as HTMLElement).isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA'
  );
}

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

function useDocSearchKeyboardEvents({ isOpen, onOpen, onClose }: IUseDocSearchKeyboardEvents) {
  useEffect(() => {
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

// Lazy load AlgoliaSearch only when needed
export default function AlgoliaSearch({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [indexName, setIndexName] = useState<string>(INDEX_NAME);
  const [initialQuery, setInitialQuery] = useState<string>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [cssLoaded, setCssLoaded] = useState(false);

  const onOpen = useCallback(
    (_indexName?: string) => {
      if (_indexName) {
        setIndexName(_indexName);
      }
      setIsOpen(true);

      // Preload DocSearch when first opened
      if (!isLoaded) {
        import('@docsearch/react').then(() => {
          setIsLoaded(true);
        });
      }

      if (!cssLoaded) {
        loadDocSearchCSS();
      }
    },
      [setIsOpen, setIndexName, isLoaded, cssLoaded]
  );

  const loadDocSearchCSS = useCallback(() => {
    if (cssLoaded) return;
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/docsearch.css'; // Self-hosted path
    link.onload = () => setCssLoaded(true);
    link.onerror = () => console.warn('Failed to load DocSearch CSS');
    
    document.head.appendChild(link);
  }, [cssLoaded]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(
    (e: React.KeyboardEvent) => {
      setIsOpen(true);
      setInitialQuery(e.key);

      // Preload DocSearch when first opened
      if (!isLoaded) {
        import('@docsearch/react').then(() => {
          setIsLoaded(true);
        });
      }
    },
    [setIsOpen, setInitialQuery, isLoaded]
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
      {isOpen && isLoaded && <AlgoliaModal initialQuery={initialQuery ?? ''} onClose={onClose} indexName={indexName} />}
    </>
  );
}

export function SearchButton({ children, indexName = INDEX_NAME, ...props }: ISearchButtonProps) {
  const { onOpen, onInput } = useContext(SearchContext);
  const [Children, setChildren] = useState<string | React.ReactNode>('');
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const actionKey = getActionKey();

  useEffect(() => {
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