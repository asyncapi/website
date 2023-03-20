import ToolsCard from './ToolsCard';
import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'
export default function toolsList({ toolsData }) {
  return (
    <div className="">
      {Object.keys(toolsData).map((categoryName, index) => {
        if(toolsData[categoryName].toolsList.length > 0) return (
        <div className='my-8' key={index} id={categoryName}>
          <Heading typeStyle='heading-md-semibold' className='my-2'>
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
