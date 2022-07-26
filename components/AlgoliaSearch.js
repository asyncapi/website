import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { DocSearchModal } from '@docsearch/react'
import clsx from 'clsx'

const INDEX_NAME = 'asyncapi';
const APP_ID = 'Z621OGRI9Y';
const API_KEY = '09fe8dc96d776bfaf2da47a6d5f57a3f';

const SearchContext = createContext()

export default function AlgoliaSearch({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState(null);

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen]);

  const onInput = useCallback(
    (e) => {
      setIsOpen(true)
      setInitialQuery(e.key)
    },
    [setIsOpen, setInitialQuery]
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
  });

  return (
    <>
      <Head>
        <link rel="preconnect" href={`https://${APP_ID}-dsn.algolia.net`} crossOrigin="true" />
      </Head>
      <SearchContext.Provider
        value={{
          isOpen,
          onOpen,
          onClose,
          onInput,
        }}
      >
        {children}
      </SearchContext.Provider>
      {isOpen && <AlgoliaModal initialQuery={initialQuery} onClose={onClose} />}
    </>
  );
}

function AlgoliaModal({ onClose, initialQuery }) {
  const router = useRouter();

  return createPortal(
    <DocSearchModal
      initialQuery={initialQuery}
      initialScrollY={window.scrollY}
      searchParameters={{
        distinct: 1,
      }}
      placeholder="Search documentation"
      onClose={onClose}
      indexName={INDEX_NAME}
      apiKey={API_KEY}
      appId={APP_ID}
      navigator={{
        navigate({ itemUrl }) {
          onClose();
          router.push(itemUrl)
        },
      }}
      hitComponent={Hit}
      transformItems={transformItems}
    />,
    document.body,
  );
}

function Hit({ hit, children }) {
  return (
    <Link href={hit.url}>
      <a
        className={clsx({
          'DocSearch-Hit--Result': hit.__is_result?.(),
          'DocSearch-Hit--Parent': hit.__is_parent?.(),
          'DocSearch-Hit--FirstChild': hit.__is_first?.(),
          'DocSearch-Hit--LastChild': hit.__is_last?.(),
          'DocSearch-Hit--Child': hit.__is_child?.(),
        })}
      >
        {children}
      </a>
    </Link>
  )
}

function useDocSearchKeyboardEvents({ isOpen, onOpen, onClose }) {
  useEffect(() => {
    function onKeyDown(event) {
      if (
        (event.keyCode === 27 && isOpen) ||
        (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
        (!isEditingContent(event) && event.key === '/' && !isOpen)
      ) {
        event.preventDefault();

        if (isOpen) {
          onClose()
        } else if (!document.body.classList.contains('DocSearch--active')) {
          onOpen()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onOpen, onClose])
}

export function SearchButton({ children, ...props }) {
  const { onOpen, onInput } = useContext(SearchContext);
  const searchButtonRef = useRef();
  const actionKey = getActionKey();

  useEffect(() => {
    function onKeyDown(event) {
      if (searchButtonRef && searchButtonRef.current === document.activeElement && onInput) {
        if (/[a-zA-Z0-9]/.test(String.fromCharCode(event.keyCode))) {
          onInput(event)
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onInput, searchButtonRef])

  return (
    <button type="button" ref={searchButtonRef} onClick={onOpen} {...props}>
      {typeof children === 'function' ? children({ actionKey }) : children}
    </button>
  );
}

function isEditingContent(event) {
  const element = event.target;
  const tagName = element.tagName;

  return (
    element.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  )
}

function getActionKey() {
  if (typeof navigator !== 'undefined') {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgentData?.platform || navigator.platform)) {
      return {
        shortKey: '⌘',
        key: 'Command',
      }
    }
    return {
      shortKey: 'Ctrl',
      key: 'Control',
    }
  }
}

function transformItems(items) {
  return items.map((item, index) => {
    // We transform the absolute URL into a relative URL to
    // leverage Next's preloading.
    const a = document.createElement('a')
    a.href = item.url

    const hash = a.hash === '#content-wrapper' || a.hash === '#header' ? '' : a.hash

    if (item.hierarchy?.lvl0) {
      item.hierarchy.lvl0 = item.hierarchy.lvl0.replace(/&amp;/g, '&')
    }

    if (item._highlightResult?.hierarchy?.lvl0?.value) {
      item._highlightResult.hierarchy.lvl0.value =
        item._highlightResult.hierarchy.lvl0.value.replace(/&amp;/g, '&')
    }

    return {
      ...item,
      url: `${a.pathname}${hash}`,
      __is_result: () => true,
      __is_parent: () => item.type === 'lvl1' && items.length > 1 && index === 0,
      __is_child: () =>
        item.type !== 'lvl1' &&
        items.length > 1 &&
        items[0].type === 'lvl1' &&
        index !== 0,
      __is_first: () => index === 1,
      __is_last: () => index === items.length - 1 && index !== 0,
    }
  });
}