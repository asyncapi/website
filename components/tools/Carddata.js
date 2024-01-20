import React, {useEffect, useRef, useState} from 'react'
import InfoIcon from '../icons/InfoIcon'
import TextTruncate from 'react-text-truncate';

export const CardData = ({ className, visible, heading, data, read, setRead, setVisible, type }) => {
  const [outsideClick, setOutsideClick] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const initialVisible = {
    lang: false,
    tech: false,
    category: false,
    pricing : false,
    ownership : false
  };
  const domNode = useRef();

  useEffect(() => {
    const handleDescription = () => {
      const divHeight = domNode.current?.offsetHeight;
      const numberOfLines = divHeight / 20;
      setShowDescription(numberOfLines > 3);
    };
    handleDescription();
  }, [visible]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      setOutsideClick(true);
      if (domNode.current && !domNode.current.contains(event.target)) {
        setOutsideClick(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={className || "text-sm text-gray-500 text-left"}>
      {heading}
      <span className="group relative">
        {outsideClick && visible[type] && (
          <span ref={domNode} data-testid="CardData-description" className="w-48 text-xs border z-10 bg-white border-gray-200 shadow-md -left-2/3 absolute translate-x-1/3 -top-4 rounded px-2 py-1">
            {read ? data : (
              <div>
                <TextTruncate
                  element="span"
                  line={4}
                  text={data}
                />
              </div>
            )}
            {showDescription && (
              <button className='cursor-pointer text-cyan-600' onClick={() => {setOutsideClick(true); setRead(!read)}}>
                {read ? " Show Less" : " Show More"}
              </button>
            )}
          </span>
        )}
        <button onClick={() => {setRead(false); setVisible({ ...initialVisible, [type]: !visible[type] })}} className="mx-1" data-testid="CardData-button">
          <InfoIcon />
        </button>
      </span>
    </div>
  );
}
