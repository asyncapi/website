import { useState, useRef, useEffect } from 'react'
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import Tag from './Tags';
import TextTruncate from 'react-text-truncate';
import Data from "../../scripts/tools/tools-schema.json"

export default function ToolsCard({ toolData }) {
  const [showDescription, setShowDescription] = useState(false)
  const [showMoreDescription, setShowMoreDescription] = useState(false)
  const [lang, setLang] = useState(false)
  const [tech, setTech] = useState(false)
  const [readMore, setReadMore] = useState(false)
  const descriptionRef = useRef(null)
  useEffect(() => {
    let divHeight = descriptionRef.current.offsetHeight;
    let numberOfLines = divHeight / 20;
    if (numberOfLines > 3) setShowMoreDescription(true)
    else setShowMoreDescription(false)
  }, [])

  let onGit = false;
  if (toolData.links.repoUrl) {
    const url = new URL(toolData.links.repoUrl)
    if (url.host == 'github.com') onGit = true
    else onGit = false
  }

  return (
    <div className="border shadow-md h-auto flex flex-col rounded-lg">
      <div className="pt-8 px-6 mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 justify-between w-full">
            <Heading typeStyle="heading-sm-semibold">{toolData.title}</Heading>
            <div className='bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs w-fit min-w-[5.3rem] h-fit rounded-md'>
              <span className="group relative">
                <span className="w-48 absolute top-8 border border-gray-200 shadow-md rounded px-2 py-1 -translate-x-12 text-gray-700 -left-2/3 transition delay-300 bg-white z-10 hidden group-hover:inline">
                  {Data.properties.filters.properties.hasCommercial.description}
                </span>
                {toolData.filters.hasCommercial === false ? 'Open Source' : 'Commercial'}
              </span>
            </div>
          </div>
          <div className='relative'>
            <Paragraph typeStyle="body-sm">
              <div ref={descriptionRef} className={`w-full ${showMoreDescription ? 'cursor-pointer' : ''}`} onMouseEnter={() => (setTimeout(() => { if (showMoreDescription) setShowDescription(true) }, 500))}>
                <TextTruncate
                  element="span"
                  line={3}
                  text={toolData.description}
                /></div>
            </Paragraph>
            {showDescription && <div className="absolute top-0 p-2 z-10 bg-white w-full border border-gray-200 shadow-md" onMouseLeave={() => (setShowDescription(false))}>
              <Paragraph typeStyle="body-sm" className=''>
                {toolData.description}
              </Paragraph>
            </div>}
          </div>
        </div>
      </div>
      <hr className="mx-6" />
      <div className="grow">
        {(toolData?.filters?.language || toolData?.filters?.technology?.length > 0) ? <div className="my-6">
          {toolData.filters.language && <div className="flex flex-col gap-2 mx-6">
            <div className="text-gray-700 text-sm font-semibold">LANGUAGES
              <span className="group relative">
                {lang && <span className="w-48 text-xs border z-10 bg-white border-gray-200 shadow-md -left-2/3 absolute translate-x-1/3 -top-4 rounded px-2 font-light py-1">
                  {Data.properties.filters.properties.language.description.length >= 130 ?
                    <div>{!readMore ? Data.properties.filters.properties.language.description.slice(0, 118) + "... " : Data.properties.filters.properties.language.description}<button className='cursor-pointer text-cyan-600' onClick={() => { setReadMore(!readMore) }} >{readMore ? " Show Less" : " Show More"}</button></div> :
                    Data.properties.filters.properties.language.description}
                </span>}
                <button onClick={() => { setLang(!lang); setTech(false) }} className="mx-1" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 translate-y-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg></button>
              </span>
            </div>
            <div className="flex gap-2">
              <Tag
                name={toolData.filters.language.name}
                bgColor={toolData.filters.language.color}
                borderColor={toolData.filters.language.borderColor}
              />
            </div>
          </div>}
          {toolData.filters.technology.length > 0 && <div className="flex flex-col gap-2 my-4 mx-6">
            <div className="text-gray-700 text-sm font-semibold">TECHNOLOGIES
              <span className="group relative">
                {tech && <span className="w-48 text-xs bg-white absolute left-1 font-light -top-2 border border-gray-200 shadow-md rounded px-2 py-1 translate-x-8 z-10">
                  {Data.properties.filters.properties.technology.description}
                </span>}
                <button onClick={() => { setTech(!tech); setLang(false) }} className="mx-1" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 translate-y-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                </button>
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {toolData.filters.technology.map((item, index) => (
                <Tag key={index}
                  name={item.name}
                  bgColor={item.color}
                  borderColor={item.borderColor}
                />
              ))}
            </div>
          </div>}
        </div> :
          <div className="w-full relative p-8 text-center h-full text-gray-700">
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'> No further details provided </div>
          </div>}
      </div>
      {(toolData.links.repoUrl || toolData.links.websiteUrl || toolData.links.docsUrl) && <>
        <hr className="" />
        <div className="flex">
          {toolData.links.repoUrl && <>
            {onGit ?
              <a className="w-full text-center border-x py-6 px-1 hover:bg-gray-200 cursor-pointer" href={toolData.links.repoUrl} target='_blank' rel='noreferrer'>
                <div className="m-auto flex w-fit gap-2">
                  <img src="/img/logos/github-black.svg" className="w-5" />
                  <div className="text-gray-700 text-sm">View Github</div>
                </div>
              </a> :
              <a className="w-full text-center border-x border-gray-200 py-6 px-1 hover:bg-gray-200 cursor-pointer" href={toolData.links.repoUrl} target='_blank' rel='noreferrer'>
                <div className="m-auto flex w-fit gap-2">
                  <div className="text-gray-700 text-sm">View Source Code</div>
                </div>
              </a>
            }
          </>}
          {toolData.links.websiteUrl && (
            <a className="w-full text-center py-6 px-1 hover:bg-gray-200 border-x border-gray-200 cursor-pointer" href={toolData.links.websiteUrl} target='_blank' rel='noreferrer'>
              <div className="m-auto flex w-fit gap-2">
                <img src="/img/illustrations/icons/share.svg" className="w-5" />
                <div className="text-gray-700 text-sm">Visit Website</div>
              </div>
            </a>
          )}
          {toolData.links.docsUrl && (
            <a className="w-full text-center py-6 px-1 hover:bg-gray-200 border-x border-gray-200 cursor-pointer" href={toolData.links.docsUrl} target='_blank' rel='noreferrer'>
              <div className="m-auto flex w-fit gap-2">
                <img src="/img/illustrations/icons/docs-icon.svg" className="w-5" />
                <div className="text-gray-700 text-sm">Visit Docs</div>
              </div>
            </a>
          )}
        </div>
      </>}
    </div>
  );
}
