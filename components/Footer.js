import IconTwitter from "./icons/Twitter"
import IconGithub from "./icons/Github"
import IconYoutube from "./icons/YouTube"
import IconLinkedIn from "./icons/LinkedIn"
import NewsletterSubscribe from "./NewsletterSubscribe"
import Container from "./layout/Container"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 mt-12">
      <div className="max-w-screen-xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
          <ul className="flex flex-wrap justify-center">
            <li className="px-5 py-2">
              <Link href="/about">
                <a className="text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">About</a>
              </Link>
            </li>
            <li className="px-5 py-2">
              <Link href="/blog">
                <a className="text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">Blog</a>
              </Link>
            </li>
            <li className="px-5 py-2">
              <a href="https://asyncapi.threadless.com" target="_blank" rel="noopener noreferrer" className="text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                Shop
              </a>
            </li>
            <li className="px-5 py-2">
              <Link href="/jobs">
                <a className="text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">Jobs</a>
              </Link>
            </li>
            <li className="px-5 py-2">
              <a href="mailto:press@asyncapi.io" className="text-base leading-6 text-gray-500 hover:text-white transition ease-in-out duration-300">
                Press
              </a>
            </li>
          </ul>
        </nav>
        <ul className="mt-8 flex justify-center" aria-label="AsyncAPI social media links">
          <li>
            <a href="https://twitter.com/AsyncAPISpec" target="_blank" rel="noopener noreferrer" className="text-gray-400 flex justify-center items-center hover:text-blue-500">
              <span className="sr-only">Twitter</span>
              <IconTwitter className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="https://github.com/asyncapi" target="_blank" rel="noopener noreferrer" className="ml-6 text-gray-400 flex justify-center items-center hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <IconGithub className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/company/asyncapi" rel="noopener noreferrer" target="_blank" className="ml-6 text-gray-400 flex justify-center items-center hover:text-blue-500">
              <span className="sr-only">LinkedIn</span>
              <IconLinkedIn className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="https://youtube.com/asyncapi" target="_blank" rel="noopener noreferrer" className="ml-6 text-gray-400 flex justify-center items-center hover:text-red-600">
              <span className="sr-only">YouTube</span>
              <IconYoutube className="h-6 w-6" />
            </a>
          </li>
        </ul>
        <div className="mt-8">
          <p className="text-center text-base leading-6 text-gray-400">
            Made with <span className="font-mono text-pink-500">:love:</span> by the AsyncAPI Initiative.
          </p>
          <p className="text-center text-base leading-6 text-gray-400 mt-4">
            <a href="https://netlify.com" target="_blank" rel="noopener noreferrer">
              <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" className="inline" alt="Deploys by Netlify"/>
            </a>
          </p>
          <p className="text-center text-base leading-6 text-gray-400 mt-4">
            Copyright &copy; AsyncAPI Project a Series of LF Projects, LLC.
          </p>
          <p className="text-center text-base leading-6 text-gray-400 mt-1">
            For web site terms of use, trademark policy and general project policies please see <a href="https://lfprojects.org" className="text-gray-600 hover:text-white transition ease-in-out duration-300 underline" target="_blank" rel="noopener noreferrer">https://lfprojects.org</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
