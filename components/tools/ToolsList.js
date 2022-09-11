import ToolsCard from './ToolsCard';
import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'
export default function toolsList() {
  return (
    <div className="">
      <div className="mt-4">
        <Heading typeStyle='heading-md-semibold' className='my-4'>
            Code First Tools
        </Heading>
        <Paragraph typeStyle='body-md'>
          The following is a list of tools that generate AsyncAPI documents from your code.
        </Paragraph>
        <hr className='my-8' />
        <div className="lg:grid grid-cols-3 gap-8">
          <ToolsCard />
        </div>
      </div>
    </div>
  );
}
