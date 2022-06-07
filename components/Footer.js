import IconTwitter from "./icons/Twitter"
import IconGithub from "./icons/Github"
import IconYoutubeGray from "./icons/YouTubeGray"
import IconLinkedIn from "./icons/LinkedIn"
import NewsletterSubscribe from "./NewsletterSubscribe"
import Container from "./layout/Container"
import Link from "next/link"
import AsyncAPILogoLight from "./AsyncAPILogoLight"
import IconSlack from "./icons/Slack"
import IconTwitch from "./icons/Twitch"
import Heading from "./typography/Heading"

export default function Footer() {
  return (
    <footer className="bg-dark mt-12 margin: 0 auto">
      <div className="max-w-screen-xl mx-auto py-16 px-4 overflow-hidden sm:px-6 lg:px-8 divide-y divide-cool-gray">
        <nav className="-mx-5 -my-2 py-10 px-5 mt-2 flex flex-wrap justify-between ">
          <div className="mr-5 w-full md:w-auto">
            <div className="">
              <Link href="/">
                <a className="cursor-pointer">
                  <AsyncAPILogoLight className="h-13 w-auto mt-3" />
                </a>
              </Link>
           </div>
            <div className="">
              {/* <p className="text-lg font-medium text-white mt-8 mb-15"> */}
              <Heading className="mt-12 mb-15 text-white" typeStyle="heading-sm-semibold">
                Building the future of <br/> Event-Driven Architectures (EDAs).
              </Heading>
              {/* </p> */}
            </div>
          </div>

        
          <div className="flex flex-col md:flex-row">
            
            <div className="flex">

              <div className="px-5 md:px-10 md:px-5 ml-5 mb-5">
                <div className="py-2">
                  <div className="text-white">
                    <Heading typeStyle="heading-sm-semibold">The Initiative</Heading>
                  </div>
                </div>
                <ul className="justify-center">
                  <li className="py-2">
                    <Link href="/about">
                      <a className="text-base leading-6 text-cool-gray hover:text-white transition ease-in-out duration-300">About</a>
                    </Link>
                  </li>
                  <li className="py-2">
                    <Link href="/blog">
                      <a className="text-base leading-6 text-cool-gray hover:text-white transition ease-in-out duration-300">Blog</a>
                    </Link>
                  </li>
                  <li className="py-2">
                    <a href="https://asyncapi.threadless.com" target="_blank" rel="noopener noreferrer" className="text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                      Shop
                    </a>
                  </li>
                  <li className="py-2">
                    <Link href="/jobs">
                      <a className="text-base leading-6 text-cool-gray hover:text-white transition ease-in-out duration-300">Jobs</a>
                    </Link>
                  </li>
                  <li className="py-2">
                    <a href="https://github.com/asyncapi/brand/blob/master/brand-guidelines/README.md" target="_blank" rel="noopener noreferrer" className="text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                      Brand
                    </a>
                  </li>
                </ul>
              </div>

              <div className="px-5 md:px-10 ml-5 mb-5">
                <div className="py-2">
                  <div className="text-white">
                    <Heading typeStyle="heading-sm-semibold">News</Heading>
                  </div>
                </div>
                <ul className="justify-center">
                  <li className="py-2">
                    <div className="text-base leading-6 text-cool-gray hover:text-white transition ease-in-out duration-300">
                      {/* <Link href=""> */}
                        <a>Press</a>
                      {/* </Link> */}
                    </div>
                  </li>
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

            <div className="px-5 md:px-10 ml-5 mb-5">
              <div className="py-2">
                <div className="mr-15 text-white">
                  <Heading typeStyle="heading-sm-semibold">Social</Heading>
                </div>
              </div>
              <ul className="justify-start" aria-label="AsyncAPI social media links">
                <li className="py-2">
                  <a href="https://twitter.com/AsyncAPISpec" target="_blank" rel="noopener noreferrer" className="text-gray-500 flex">
                    <div className="">
                      <div className="flex fit-content items-center hover:text-blue-500">
                        <span className="sr-only">Twitter</span>
                        <IconTwitter className="h-6 w-6" />
                        <span className="text-cool-gray absolute ml-8 hover:text-blue-500">Twitter</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="py-2">
                  <a href="https://github.com/asyncapi" target="_blank" rel="noopener noreferrer" className="text-gray-500 flex">
                    <div className="">
                      <div className="flex fit-content items-center  hover:text-gray-700">
                        <span className="sr-only">GitHub</span>
                        <IconGithub className="h-6 w-6" />
                        <span className="text-cool-gray absolute ml-8 hover:text-gray-700">GitHub</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="py-2">
                  <a href="https://linkedin.com/company/asyncapi" rel="noopener noreferrer" target="_blank" className="text-gray-500 flex">
                    <div className="">
                      <div className="flex fit-content items-center hover:text-blue-500">
                        <span className="sr-only">LinkedIn</span>
                        <IconLinkedIn className="h-5 w-5 ml-1" />
                        <span className="text-cool-gray absolute ml-8 hover:text-blue-500">LinkedIn</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="py-2">
                  <a href="https://youtube.com/asyncapi" target="_blank" rel="noopener noreferrer" className="text-gray-500 flex">
                    <div className="">
                      <div className="flex fit-content items-center hover:text-red-600">
                        <span className="sr-only">YouTube</span>
                        <IconYoutubeGray className="h-6 w-6 " /> 
                        <span className="text-cool-gray absolute ml-8 hover:text-white">YouTube</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="py-2">
                  <a href="https://asyncapi.com/slack-invite" target="_blank" rel="noopener noreferrer" className="text-gray-500">
                    <div className="">
                      <div className="flex fit-content items-center hover:text-white">
                        <span className="sr-only">Slack</span>
                        <IconSlack className="h-6 w-6" /> 
                        <span className="text-cool-gray absolute ml-8 hover:text-white">Slack</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="py-2">
                  <a href="https://www.twitch.tv/asyncapi" target="_blank" rel="noopener noreferrer" className="text-gray-500">
                    <div className="">
                      <div className="flex fit-content items-center hover:text-purple-500">
                        <span className="sr-only">Twitch</span>
                        <IconTwitch className="h-6 w-5" /> 
                        <span className="text-cool-gray absolute ml-8 hover:text-purple-500">Twitch</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        <div className="md:flex justify-between items-center mt-20 py-10">
          <div className="">
            <p className="text-left text-sm leading-6 text-cool-gray">
              Made with <span className="font-mono text-secondary-500">:love:</span> by the AsyncAPI Initiative.
            </p>
            <p className="text-left text-sm leading-6 text-cool-gray mt-1">
              Copyright &copy; AsyncAPI Project a Series of LF Projects, LLC.
            </p>
            <p className="text-left text-sm leading-6 text-cool-gray mt-1">
              For web site terms of use, trademark policy and general project policies please see <a href="https://lfprojects.org" className="text-secondary-500 hover:text-white transition ease-in-out duration-300 underline" target="_blank" rel="noopener noreferrer">https://lfprojects.org</a>
            </p>
          </div>
          <div className="block mt-10 md:mt-0">
            <p className="text-center text-sm leading-6">
              <a href="https://netlify.com" target="_blank" rel="noopener noreferrer">
                <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" className="inline" alt="Deploys by Netlify"/>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
