import YoutubeButton from './buttons/YoutubeButton';
import Paragraph from './typography/Paragraph';
import TextLink from './typography/TextLink';
import Heading from './typography/Heading';

export default function Meeting({ 
    name = '', 
    purpose = '',
    host = '',
    hostProfile = '',
    youtube = '' 
}) {

  return (
    <div className="rounded-md border border-gray-200 overflow-hidden bg-white p-4">
        <Heading level="h2" typeStyle="heading-md-semibold">
            { name }
        </Heading>   
        <Paragraph typeStyle="body-md" className="my-4">
            <strong>Purpose:</strong> { purpose }
        </Paragraph>
        <Paragraph typeStyle="body-md" className="my-4">
            <strong>Host:</strong> 
            { hostProfile 
                ? (<TextLink href={ hostProfile } target="_blank">
                { host }
                </TextLink>)
                : ` ${host}.`
            }
        </Paragraph>
        <YoutubeButton text="Watch recordings" href={ youtube }/>
    </div>
  );
}
