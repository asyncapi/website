import { useEffect, useRef } from 'react'

export default function Modal({
  title,
  children,
  onModalClose = () => {},
}) {
  const modalRef = useRef(null)

  useEffect(() => {
    modalRef.current.focus()
  }, [])

  function backdropClickHandler(e) {
    if (modalRef.current && (modalRef.current === e.target || !modalRef.current.contains(e.target))) {
      onModalClose()
    }
  }

  function onKeyUpHandler(e) {
    if (e.key === 'Escape') onModalClose()
  }
  
  return (
    <div ref={modalRef} tabIndex={-1} className="backdrop-blur bg-black/30 fixed inset-0 z-30 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" onClick={backdropClickHandler} onKeyUp={onKeyUpHandler}>
      <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold truncate mr-4">{title}</h1>
          <button onClick={() => onModalClose()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="w-full overflow-auto max-h-120">
          {children}
        </div>
      </div>
    </div>
  )
}