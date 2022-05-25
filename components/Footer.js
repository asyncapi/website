import IconTwitter from "./icons/Twitter"
import IconGithub from "./icons/Github"
import IconYoutube from "./icons/YouTube"
import IconLinkedIn from "./icons/LinkedIn"
import AsyncAPILogoLight from "./icons/AsyncAPILogoLight"
import NewsletterSubscribe from "./NewsletterSubscribe"
import Container from "./layout/Container"
import Link from "next/link"
import IconSlack from "./icons/Slack"
import IconTwitch from "./icons/Twitch"

export default function Footer() {
  return (
    <footer className="bg-gray-900">
    
      <div className="max-w-screen-xl py-12 overflow-hidden">
        <nav className=" flex flex-wrap justify-center">
          <div className="pl-15 pr-10 w-full items-center md:w-2/5 md:ml-10 md:p-0 md:pl-5 ">
            <div className="pt-3">
              <Link href="/">
                <a className="cursor-pointer">
                  <AsyncAPILogoLight className="h-8 w-auto sm:h-8" />
                </a>
              </Link>
            </div>
            <div className="">
              <p className="text-gray-400 mt-5 mb-15">
                Building the future of <br/> Event-Driven Architectures (EDA)
              </p>
            </div>
          </div>
          <div className="w-full pl-15 md:pl-5 md:w-1/6">
            <div className="px-6 py-2">
              <div className="mb-1 text-base text-white">
                <p>The Initiative</p>
              </div>
            </div>
            <div className="px-10 py-0.5">
              <div className="mb-2.5 text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                <Link href="/about">
                  <a>About</a>
                </Link>
              </div>
              <div className="mb-2.5 text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                <Link href="/blog">
                <a>Blog</a>
                </Link>
              </div>
              <div className="mb-2.5 text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                <a href="https://asyncapi.threadless.com" target="_blank" rel="noopener noreferrer" className="text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                  Shop
                </a>
              </div>
              <div className="mb-2.5 text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                <Link href="/jobs">
                <a>Jobs</a>
                </Link>
              </div>
              <div className="mb-2.5 text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                <a href="https://github.com/asyncapi/brand/blob/master/brand-guidelines/README.md" target="_blank" rel="noopener noreferrer" className="text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                  Brand
                </a>
              </div>
            </div>
          </div>
          <div className="w-full pl-15 md:pl-5 md:w-1/6">
            <div className="px-6 py-2">
              <div className="mb-1 text-base text-white">
                <p>News</p>
              </div>
            </div>
            <div className="px-10 py-0.5">
              <div className="mb-2.5 text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                {/* <Link href=""> */}
                  <a>Press</a>
                {/* </Link> */}
              </div>
              <div className="mb-2.5 text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                <a href="mailto:press@asyncapi.io">
                  Email Us
                </a>
              </div>
            </div>
          </div>
          <div className="w-full pl-15 md:pl-5 md:w-1/6">
            <div className="px-7 py-2">
              <div className="mb-0 text-base text-white">
                <p>Social</p>
              </div>
            </div>
            <div className="px-6 py-0.5">
              <a href="https://twitter.com/AsyncAPISpec" target="_blank" rel="noopener noreferrer" className="text-gray-400">
                <div className="pt-1 p-2">
                  <div className="flex fit-content hover:text-blue-500">
                    <span className="sr-only">Twitter</span>
                    <IconTwitter className="h-6 w-6" />
                    <span className="pl-2 text-gray-400 hover:text-blue-400">Twitter</span>
                  </div>
                </div>
              </a>
              <a href="https://github.com/asyncapi" target="_blank" rel="noopener noreferrer" className="text-gray-400">
                <div className="p-2">
                  <div className="flex fit-content hover:text-gray-600">
                    <span className="sr-only">GitHub</span>
                    <IconGithub className="h-6 w-6" />
                    <span className="pl-2 text-gray-400 hover:text-gray-600">GitHub</span>
                  </div>
                </div>
              </a>
              <a href="https://linkedin.com/company/asyncapi" rel="noopener noreferrer" target="_blank" className=" text-gray-400">
                <div className="p-2">
                  <div className="flex fit-content hover:text-blue-500">
                    <span className="sr-only">LinkedIn</span>
                    <IconLinkedIn className="h-5 w-5 ml-0.5 mt-0.5" />
                    <span className="pl-2 text-gray-400 hover:text-blue-500">LinkedIn</span>
                  </div>
                </div>
              </a>
              <a href="https://youtube.com/asyncapi" target="_blank" rel="noopener noreferrer" className="text-gray-300">
                <div className="p-2">
                  <div className="flex fit-content hover:text-red-600">
                    <span className="sr-only">YouTube</span>
                    <IconYoutube className="h-6 w-6" /> 
                    <span className="pl-2 text-gray-300 hover:text-white">YouTube</span>
                  </div>
                </div>
              </a>
              <a href="https://asyncapi.com/slack-invite" target="_blank" rel="noopener noreferrer" className="text-gray-400">
                <div className="p-2">
                  <div className="flex fit-content hover:text-white">
                    <span className="sr-only">Slack</span>
                    <IconSlack className="h-6 w-6" /> 
                    <span className="pl-2 text-gray-400 hover:text-white">Slack</span>
                  </div>
                </div>
              </a>
              <a href="https://www.twitch.tv/asyncapi" target="_blank" rel="noopener noreferrer" className="text-gray-300">
                <div className="p-2">
                  <div className="flex fit-content hover:text-purple-500">
                    <span className="sr-only">Twitch</span>
                    <IconTwitch className="h-6 w-5" /> 
                    <span className="pl-2 text-gray-300 hover:text-purple-500">Twitch</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </nav>
        <div className="flex justify-center mt-20">
          <div className="w-3/4">
            <p className="text-left text-sm leading-6 text-gray-400">
              Made with <span className="font-mono text-pink-500">:love:</span> by the AsyncAPI Initiative.
            </p>
            <p className="text-left text-sm leading-6 text-gray-400 mt-1">
              Copyright &copy; AsyncAPI Project a Series of LF Projects, LLC.
            </p>
            <p className="text-left text-sm leading-6 text-gray-400 mt-1">
              For web site terms of use, trademark policy and general project policies please see <a href="https://lfprojects.org" className="text-gray-600 hover:text-white transition ease-in-out duration-300 underline" target="_blank" rel="noopener noreferrer">https://lfprojects.org</a>
            </p>
          </div>
          <div className="mt-4">
            <p className="text-center text-sm leading-6 text-gray-400">
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
