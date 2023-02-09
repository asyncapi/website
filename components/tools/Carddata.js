import React, {useEffect, useRef, useState} from 'react'
import InfoIcon from '../icons/InfoIcon'
import TextTruncate from 'react-text-truncate';

export const Carddata = (props) => {
  const { classes, visible, heading, data, read, setRead, setVisible, type } = props
  const [outsideClick, setOutsideClick] = useState(true)
  const initial = {
    lang: false,
    tech: false,
    category: false,
    pricing : false,
    ownership : false
  } 
  const domNode = useRef() 
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
      <span className="group relative"  ref={domNode} >
        {outsideClick && visible[type] && <span className="w-48 text-xs border z-10 bg-white border-gray-200 shadow-md -left-2/3 absolute translate-x-1/3 -top-4 rounded px-2 py-1">
          {read ? <div>{data}</div> : <TextTruncate
            element="div"
            line={3}
            text={data}
          />}
          <button className='cursor-pointer text-cyan-600' onClick={() => {setOutsideClick(true);setRead(!read)}}>{read ? " Show Less" : " Show More"}</button>
        </span>}
        <button onClick={() =>{setRead(false);setVisible({ ...initial, [type]: !visible[type] }) }} className="mx-1" >
          <InfoIcon />
        </button>
      </span>
    </div>
  )
}
