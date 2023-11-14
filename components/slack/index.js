import SlackMessage from "./Message";

export default function Slack({
  className = ''
}) {
  return (
    <div className={`flex rounded-md border border-gray-200 overflow-hidden bg-white ${className}`}>
      <div className="hidden bg-slack p-2 w-1/5 sm:block">
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-3/4"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-1/3"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-1/2"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-1/4"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-1/3"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-3/4"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-1/3"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-1/2"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-1/2"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-1/4"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-1/3"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-3/4"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-1/2"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-1/4"></div>
        <div className="mb-1 h-2 rounded-xl bg-white bg-opacity-25 w-1/3"></div>
      </div>
      <div className="flex-1 py-2"   data-testid="SlackMessage">
        <SlackMessage
          avatar="/img/homepage/lukasz-homepage-slack.webp"
          name="Lukasz Gornicki"
          text={
            <>
              Good Morning
              <img className="inline-block ml-1 w-5 h-5" src="/img/homepage/grain.png" alt="grain"/>
              <img className="inline-block ml-1 w-5 h-5" src="/img/homepage/coffee.png" alt="coffee"/>
            </>
          }
          reactions={[
            { icon: '/img/homepage/coffee.png', name: 'coffee', count: 6, mine: true },
            { icon: '/img/homepage/coffee-parrot.gif', name: 'coffee-parrot', count: 4, mine: true },
            { icon: '/img/homepage/coffee-bean.png', name: 'coffee-bean', count: 6, mine: true },
            { icon: '/img/homepage/parrotsleep.gif', name: 'parrotsleep', count: 1, mine: false },
          ]}
        />
        <SlackMessage
          avatar="/img/homepage/eve-and-chan.webp"
          name="Eve & Chan"
          text={
            <span className="text-gray-500">
              Joined #general.
            </span>
          }
        />
        <SlackMessage
          avatar="/img/homepage/eve-and-chan.webp"
          name="Eve & Chan"
          text={
            <>
              Hey folks! 👋
            </>
          }
          reactions={[
            { emoji: '👋', count: 21, mine: true },
          ]}
        />
        <SlackMessage
          avatar="/img/avatars/fmvilas.webp"
          name="fmvilas"
          text={
            <>
              Hey Eve & Chan! Welcome to the AsyncAPI workspace!
            </>
          }
        />
      </div>
    </div>
  )
}
