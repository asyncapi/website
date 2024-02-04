import { languageDetection } from "../lib/i18n";

function HomePage() {
  const loader = 'img/loaders/loader.png'; // preloader image for the tools
  languageDetection();

  return (
    <div className="flex animate-pulse w-fit mx-auto my-24 gap-4 text-black">
      <img src={loader} className="mx-auto w-16" />
      <div className="text-xl my-auto">Loading...</div>
    </div>
  )
}

export default HomePage
