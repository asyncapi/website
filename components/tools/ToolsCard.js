import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'
import TextTruncate from 'react-text-truncate'

export default function toolsCard() {
  return (
    <div className="border shadow-md rounded">
      <div className="flex gap-4 pt-8 px-6">
        {/* <img src="https://unsplash.com/photos/MRjjcDIk3Gw" className="w-20 rounded-full" /> */}
        <div className="w-2/5 h-20 rounded-full bg-gray-500"></div>
        <div className="flex flex-col gap-2">
            <Heading typeStyle="heading-sm-semibold">Go AsyncAPI</Heading>
            <Paragraph typeStyle="body-sm">
                <TextTruncate element="span" line={2} text="It uses reflection to translate Go structures in JSON Schema definitions and arrange them in AsyncAPI schema. Thanks to @vearutop." />
            </Paragraph>
        </div>
      </div>
      <hr className="my-6 mx-6" />
      <div className="text-xs text-gray-700 mx-6">LANGUAGES</div>
      <div className="flex gap-2">
        
      </div>
    </div>
  );
}
