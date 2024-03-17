import ToolsCard from './ToolsCard';
import Heading from '../typography/Heading'
import { useRef, useEffect } from 'react';
import Paragraph from '../typography/Paragraph'
export default function toolsList({ toolsData }) {
  const categoryRefs = useRef({});

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const decodedHash = decodeURIComponent(hash.slice(1));
      const categoryRef = categoryRefs.current[decodedHash];
      if (categoryRef) {
        categoryRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);
  return (
    <div className="" data-testid="ToolsList-main" >
      {Object.keys(toolsData).map((categoryName, index) => {
        if(toolsData[categoryName].toolsList.length > 0) return (
          <div className='my-8' key={index} id={categoryName} ref={el => categoryRefs.current[categoryName] = el}>
          <Heading typeStyle='heading-md-semibold' className='my-2' >
            {categoryName}
          </Heading>
          <Paragraph typeStyle='body-md'>
            {toolsData[categoryName].description}
          </Paragraph>
          <hr className='my-8' />
          <div className="flex flex-col lg:grid grid-cols-3 gap-8">
            {toolsData[categoryName].toolsList.map((tool, toolIndex) => (
              <ToolsCard key={toolIndex} toolData={tool} />
            ))}
          </div>
        </div>)
    })}
    </div>
  );
}
