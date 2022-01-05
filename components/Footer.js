import IconTwitter from "./icons/Twitter"
import IconGithub from "./icons/Github"
import IconYoutube from "./icons/YouTube"
import IconLinkedIn from "./icons/LinkedIn"
import NewsletterSubscribe from "./NewsletterSubscribe"
import Container from "./layout/Container"

export default function Footer() {
  return (
    <div className="bg-gray-900 mt-12">
      <div className="max-w-screen-xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
          <div className="px-5 py-2">
            <a href="/about" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              About
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="/blog" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Blog
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="https://asyncapi.threadless.com" target="_blank" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Shop
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="/jobs" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Jobs
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="mailto:press@asyncapi.io" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Press
            </a>
          </div>
        </nav>
        <div className="mt-8 flex justify-center">
          <a href="https://twitter.com/AsyncAPISpec" target="_blank" className="text-gray-400 hover:text-blue-500">
            <span className="sr-only">Twitter</span>
            <IconTwitter className="h-6 w-6" />
          </a>
          <a href="https://github.com/asyncapi" target="_blank" className="ml-6 text-gray-400 hover:text-gray-500">
            <span className="sr-only">GitHub</span>
            <IconGithub className="h-6 w-6" />
          </a>
          <a href="https://linkedin.com/company/asyncapi" target="_blank" className="ml-6 text-gray-400 hover:text-blue-500">
            <span className="sr-only">LinkedIn</span>
            <IconLinkedIn className="h-6 w-6" />
          </a>
          <a href="https://youtube.com/asyncapi" target="_blank" className="ml-6 text-gray-400 hover:text-red-600">
            <span className="sr-only">YouTube</span>
            <IconYoutube className="h-6 w-6" />
          </a>
        </div>
        <div className="mt-8">
          <p className="text-center text-base leading-6 text-gray-400">
            Made with <span className="font-mono text-pink-500">:love:</span> by the AsyncAPI Initiative.
          </p>
          <p className="text-center text-base leading-6 text-gray-400 mt-4">
            <a href="https://netlify.com" target="_blank">
              <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" className="inline" />
            </a>
          </p>
          <p className="text-center text-base leading-6 text-gray-400 mt-4">
            Copyright &copy; AsyncAPI Project a Series of LF Projects, LLC.
          </p>
          <p className="text-center text-base leading-6 text-gray-400 mt-1">
            For web site terms of use, trademark policy and general project policies please see <a href="https://lfprojects.org" className="text-gray-700 underline" target="_blank">https://lfprojects.org</a>
          </p>
        </div>
      </div>
    </div>
  )
}