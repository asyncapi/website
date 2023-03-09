import { useState, useRef, useEffect } from 'react'
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import Tag from './Tags';
import TextTruncate from 'react-text-truncate';
import Data from "../../scripts/tools/tools-schema.json"
import { Carddata } from './Carddata';

export default function ToolsCard({ toolData }) {
  const [showDescription, setShowDescription] = useState(false)
  const [showMoreDescription, setShowMoreDescription] = useState(false)
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

  const [visible, setVisible] = useState({
    lang : false,
    tech: false,
    desc : false
  })

  return (
    <div className="border shadow-md h-auto flex flex-col rounded-lg">
      <div className="pt-8 px-6 mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 justify-between w-full">
            <Heading typeStyle="heading-sm-semibold">{toolData.title}</Heading>
            <div className='bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs w-fit min-w-[5.3rem] h-fit rounded-md' onMouseEnter={()=> (setTimeout(()=>{if (!visible.desc) setVisible({...visible, "desc": true})}, 400))}>
              <span className="group relative" onMouseLeave={()=>(setTimeout(()=>{if (visible.desc) setVisible({...visible, "desc": false})}, 300))}>
                {toolData.filters.hasCommercial === false ? 'Open Source' : 'Commercial'}
                {visible.desc && <span className="w-48 absolute text-left top-8 border border-gray-200 shadow-md rounded px-2 py-1 -translate-x-12 text-gray-700 -left-2/3 bg-white z-10">
                  {Data.properties.filters.properties.hasCommercial.description}
                </span>}
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
          <Carddata  classes= 'text-sm text-gray-700'  heading="LANGUAGE" data = {Data.properties.filters.properties.language.description} type="lang" visible = {visible} setVisible = {setVisible} read={readMore} setRead ={setReadMore} />
            <div className="flex gap-2">
              <Tag
                name={toolData.filters.language.name}
                bgColor={toolData.filters.language.color}
                borderColor={toolData.filters.language.borderColor}
              />
            </div>
          </div>}
          {toolData.filters.technology.length > 0 && <div className="flex flex-col gap-2 my-4 mx-6">
          <Carddata classes= 'text-sm text-gray-700' heading="TECHNOLOGIES" data={Data.properties.filters.properties.technology.description} type="tech" visible={visible} setVisible={setVisible} read={readMore} setRead={setReadMore} />
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
