export default function SlackMessage({
  className = '',
  avatar,
  name,
  text,
  reactions = [],
}) {
  return (
    <div className={`flex pl-2 my-2 text-left ${className}`} data-testid="SlackMessage-main-div">
      <img className="block w-9 h-9 mr-2 rounded object-cover" src={avatar} alt={name} data-testid="SlackMessage-img"/>
      <div>
        <div className="font-bold text-sm -mt-1"  data-testid="SlackMessage-name">{name}</div>
        <p className="text-sm" data-testid="SlackMessage-text">
          {text}
        </p>
        <div className="mt-0.5">
          {
            reactions.map((reaction, index) => (
              <div key={index} className={`inline px-2 py-0.5 mr-1 rounded-xl ${reaction.mine ? 'bg-blue-50 border border-blue-500' : 'bg-gray-100'}`} data-testid="SlackMessage-reaction">
                { reaction.icon ? (<img className="inline-block -mt-0.5 w-4 h-4 object-contain" src={reaction.icon} alt={reaction.name} data-testid="reactionIcon" />) : (<span className="text-xs mr-1" data-testid="SlackMessage-span">{reaction.emoji}</span>) }
                <span className="inline-block text-blue-500 font-bold ml-1 text-xs" data-testid="SlackMessage-count">{reaction.count}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
