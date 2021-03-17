import { useState, useEffect } from "react"
import QuestionMark from './icons/QuestionMark'
import { registerClickAway } from './helpers/click-away'

export default function InlineHelp({
  className = 'lg:relative inline-block',
  text,
}) {
  const [isHelpVisible, setIsHelpVisible] = useState(false)

  useEffect(() => {
    if (isHelpVisible) registerClickAway(() => {
      setIsHelpVisible(false)
  })
  }, [isHelpVisible])

  return (
    <div className={className}>
      {
        isHelpVisible && (
          <div className="absolute left-0 right-0 mt-6 p-2 bg-gray-800 text-center text-white text-xs rounded normal-case lg:-ml-4 lg:w-48">{text}</div>
        )
      }
      <QuestionMark className="cursor-pointer h-4 -mt-0.5 inline-block text-gray-500" onClick={() => setIsHelpVisible(!isHelpVisible)} onMouseEnter={() => setIsHelpVisible(true)} onMouseLeave={() => setIsHelpVisible(false)} />
    </div>
  )
}