import YoutubeButton from './buttons/YoutubeButton';
import Paragraph from './typography/Paragraph';
import TextLink from './typography/TextLink';
import Heading from './typography/Heading';
import { ArrowRightIcon } from '@heroicons/react/outline';

export default function Meeting({ 
    name = '', 
    purpose = '',
    host = '',
    hostProfile = '',
    youtube = '', 
    bg = ''
}) {

  return (
    <a href={youtube} target="_blank" rel="noreferrer"  data-testid="Meeting-link">
      <div
        className={`meeting-card overflow-hidden p-4 bg-${bg} w-full lg:w-[300px] h-[300px] cursor-pointer hover:bg-dark hover:text-white flex flex-col justify-between`}
      >
        <div>
          <h3 className="text-xl" data-testid="Meeting-heading">{name}</h3>
          <div data-testid="Meeting-paragraph">
            <Paragraph typeStyle="body-sm" className="my-4" textColor="white">
              {purpose}
            </Paragraph>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Paragraph typeStyle="body-md" className="my-4">
            <strong  data-testid="Meeting-host">Host:</strong>
            {hostProfile ? (
              <TextLink
                href={hostProfile}
                target="_blank"
                className="hover:text-primary-500"
              >
                {host}
              </TextLink>
            ) : (
              ` ${host}.`
            )}
          </Paragraph>
          <div>
            <ArrowRightIcon className="w-[20px] ml-3 text-slate-400" />
          </div>
        </div>
      </div>
    </a>
  );
}
