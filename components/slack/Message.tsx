import React from 'react';

interface ISlackMessageProps {
  className?: string;
  avatar: string;
  name: string;
  text: React.ReactNode;
  reactions?: {
    emoji?: string;
    icon?: string;
    count: number;
    mine?: boolean;
    name?: string;
  }[];
}

/**
 * @description Component to render a Slack message.
 * @param {Object} props - The component props.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {string} props.avatar - URL of the user's avatar.
 * @param {string} props.name - Name of the user.
 * @param {React.ReactNode} props.text - Text of the message.
 * @param {Object[]} props.reactions - Array of reaction objects.
 * @param {string} props.reactions[].emoji - Emoji representing the reaction.
 * @param {string} props.reactions[].icon - URL of the reaction icon.
 * @param {string} props.reactions[].name - Name of the reaction icon.
 * @param {number} props.reactions[].count - Number of reactions.
 * @param {boolean} props.reactions[].mine - Indicates if the reaction is from the current user.
 */
export default function SlackMessage({ className = '', avatar, name, text, reactions = [] }: ISlackMessageProps) {
  return (
    <div className={`my-2 flex pl-2 text-left ${className}`} data-testid='SlackMessage-main-div'>
      <img className='mr-2 block size-9 rounded object-cover' src={avatar} alt={name} data-testid='SlackMessage-img' />
      <div>
        <div className='-mt-1 text-sm font-bold' data-testid='SlackMessage-name'>
          {name}
        </div>
        <p className='text-sm' data-testid='SlackMessage-text'>
          {text}
        </p>
        <div className='mt-0.5'>
          {reactions.map((reaction, index) => (
            <div
              key={index}
              className={`mr-1 inline rounded-xl px-2 py-0.5 ${reaction.mine ? 'border border-blue-500 bg-blue-50' : 'bg-gray-100'}`}
              data-testid='SlackMessage-reaction'
            >
              {reaction.icon ? (
                <img
                  className='-mt-0.5 inline-block size-4 object-contain'
                  src={reaction.icon}
                  alt={reaction.name}
                  data-testid='reactionIcon'
                />
              ) : (
                <span className='mr-1 text-xs' data-testid='SlackMessage-span'>
                  {reaction.emoji}
                </span>
              )}
              <span className='ml-1 inline-block text-xs font-bold text-blue-500' data-testid='SlackMessage-count'>
                {reaction.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
