import Link from "next/link"
import AsyncAPILogoLight from "../AsyncAPILogoLight"
import Heading from "../typography/Heading"
import { socialMediaLinks, initiativeLinks } from "./FooterList"

export default function Footer() {
  return (
    <footer className="bg-dark mt-12 margin: 0 auto">
      <div className="max-w-screen-xl mx-auto py-4 sm:py-6 md:py-12 xl:py-16 px-3 overflow-hidden sm:px-6 lg:px-8 divide-y divide-cool-gray">
        <nav className="py-4 sm:py-10 flex flex-wrap justify-between">

          <div className="mr-14 w-full md:w-auto">
            <div className="">
              <Link href="/">
                <a className="cursor-pointer" aria-label="AsyncAPI" data-testid="Footer-logo-link">
                  <AsyncAPILogoLight className="h-10 w-auto mt-3" />
                </a>
              </Link>
            </div>
            <div className="">
              <Heading className="mt-12 mb-14 text-white" typeStyle="heading-sm-semibold">
                Building the future of <br /> Event-Driven Architectures.
              </Heading>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row">

            <div className="flex">

              <div className="px-0 lg:px-10 lg:ml-5 mb-5">
                <div className="py-2">
                  <div className="text-white">
                    <Heading typeStyle="heading-sm-semibold">The Initiative</Heading>
                  </div>
                </div>
                <ul className="justify-center">
                  {initiativeLinks.map((link, index) => (
                    <li className="py-2" key={index} data-testid="Footer-initiative-links">
                      <Link href={link.url}>
                        <a className="text-base leading-6 text-cool-gray hover:text-white transition ease-in-out duration-300">{link.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-14 sm:px-8 sm:ml-10 md:ml-5 mb-5">
                <div className="py-2">
                  <div className="text-white">
                    <Heading typeStyle="heading-sm-semibold">News</Heading>
                  </div>
                </div>
                <ul className="justify-center">
                  {/* <li className="py-2">
                    <div className="text-base leading-6 text-cool-gray hover:text-white transition ease-in-out duration-300">
                      <Link href="">
                        <a>Press</a>
                      </Link>
                    </div>
                  </li> */}
                  <li className="py-2">
                    <div className="text-base leading-6 text-cool-gray hover:text-white transition ease-in-out duration-300">
                      <a href="mailto:press@asyncapi.io">
                        Email Us
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

            </div>

            <div className="px-0 sm:px-10 sm:ml-5 mb-5" >
              <div className="py-2 hidden sm:block">
                <div className="mr-12 text-white">
                  <Heading typeStyle="heading-sm-semibold">Social</Heading>
                </div>
              </div>
              <ul className="justify-start flex sm:flex-col" aria-label="AsyncAPI social media links">
                {socialMediaLinks.map((link, index) => (
                  <li className="py-2 mr-3 sm:mr-0" key={index} data-testid="Footer-social-media-links">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center text-cool-gray hover:text-white transition ease-in-out duration-300">
                        <span className="sr-only">{`Follow AsyncAPI on ${link.label}`}</span>
                        {link.icon}
                        <span className="absolute pl-8 pr-5 hidden sm:block">{link.label}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <div className="sm:flex justify-between xl:mt-20 py-8 sm:py-12" data-testid="Footer-content">
          <div className="w-full sm:w-2/3">
            <p className="text-left text-base leading-6 mb-3 text-cool-gray">
              Made with <span>❤️</span> by the AsyncAPI Initiative.
            </p>
            <p className="text-left text-sm leading-6 text-cool-gray w-full sm:w-2/3" data-testid="Footer-copyright">
              Copyright &copy; AsyncAPI Project a Series of LF Projects, LLC.
              For web site terms of use, trademark policy and general project policies please see <a href="https://lfprojects.org" className="text-secondary-500 hover:text-white transition ease-in-out duration-300 underline" target="_blank" rel="noopener noreferrer">https://lfprojects.org</a>
            </p>
          </div>
          <div className="block mt-8 sm:mt-0">
            <p className="block text-sm leading-6">
              <a href="https://netlify.com" target="_blank" rel="noopener noreferrer">
                <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" className="inline" alt="Deploys by Netlify" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}