import NavBar from '../components/navigation/NavBar'
import Head from '../components/Head'
import StickyNavbar from '../components/navigation/StickyNavbar'
import { languageDetection } from "../lib/i18n";

function HomePage() {
  const loader = 'img/loaders/loader.png'; // preloader image for the tools
  languageDetection();

  return (
    <>
      <Head />
      <StickyNavbar>
        <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>
      <div className="h-screen">
        <div className="flex animate-pulse w-fit mx-auto my-60 gap-4 text-black">
          <img src={loader} className="mx-auto w-16" />
          <div className="text-xl my-auto">Loading...</div>
        </div>
      </div>
    </>
  )
}

export default HomePage
