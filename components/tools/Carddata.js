import React, {useEffect, useRef, useState} from 'react'
import InfoIcon from '../icons/InfoIcon'
import TextTruncate from 'react-text-truncate';

export const Carddata = (props) => {
  const { classes, visible, heading, data, read, setRead, setVisible, type } = props
  const [outsideClick, setOutsideClick] = useState(true)
  const [description, setshowDescription] = useState(false)
  const initial = {
    lang: false,
    tech: false,
    category: false,
    pricing : false,
    ownership : false
  } 
  const domNode = useRef() 

  useEffect(()=>{
    let divHeight = domNode.current?.offsetHeight;
    let numberOfLines = divHeight / 20;
    if (numberOfLines > 3) setshowDescription(true)
    else setshowDescription(false)
  },[visible])

  useEffect(()=>{
    let maybeHandler = (event) => {
      setOutsideClick(true) 
      if(domNode.current && !domNode.current.contains(event.target)){
        setOutsideClick(false)
      }
    }
    document.addEventListener("mousedown", maybeHandler);
    return ()=>{ document.removeEventListener("mousedown", maybeHandler)}
  },[])
  
  return (
    <div className={classes || "text-sm text-gray-500"}>
      {heading}
      <span className="group relative" >
        {outsideClick && visible[type] && <span ref={domNode} className="w-48 text-xs border z-10 bg-white border-gray-200 shadow-md -left-2/3 absolute translate-x-1/3 -top-4 rounded px-2 py-1">
       {read ? data :<div >
                <TextTruncate
                  element="span"
                  line={4}
                  text={data}
                /></div>}
          {description && <button className='cursor-pointer text-cyan-600' onClick={() => {setOutsideClick(true);setRead(!read)}}>{read ? " Show Less" : " Show More"}</button>}
        </span>}
        <button onClick={() =>{setRead(false);setVisible({ ...initial, [type]: !visible[type] }) }} className="mx-1" >
          <InfoIcon />
        </button>
      </span>
    </div>
  )
}
