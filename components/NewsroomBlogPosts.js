import { useRef } from 'react'
import BlogPostItem from './navigation/BlogPostItem'
import { getAllPosts } from '../lib/api'
import ArrowRight from './icons/ArrowRight'
import ArrowLeft from './icons/ArrowLeft'

export default function NewsroomBlogPosts() {
  const posts = getAllPosts()
    .filter(p => p.slug.startsWith('/blog/'))
    .sort((i1, i2) => {
      const i1Date = new Date(i1.date)
      const i2Date = new Date(i2.date)

      if (i1.featured && !i2.featured) return -1
      if (!i1.featured && i2.featured) return 1
      return i2Date - i1Date
    })
    .slice(0, 5)
  
  const blogContainer = useRef(null);
  const shiftLeft = (e) => {
    e.preventDefault()
    blogContainer.current.scrollLeft -= 350
  }
  const shiftRight = (e) => {
    e.preventDefault()
    blogContainer.current.scrollLeft += 350
  }
  let buttonClass = 'border-2 shadow-md rounded border-gray-100 text-gray-400 hover:border-secondary-500 hover:text-secondary-500 hover:bg-secondary-100 focus:outline-none mx-2'
  return (
    <div className="flex-col lg:flex lg:w-3/4 p-4 overflow-auto">
      <div className="flex gap-6 overflow-x-auto scroll-none list-none" ref={blogContainer}>
        {
          posts.map((post, index) => (
            <BlogPostItem className='scroll-ml-6' post={post} key={index} />
          ))
        }
      </div>
      <div className="flex flex-row mt-4 justify-content-center md:justify-content-start">
        <button className={`${buttonClass} py-4 px-8 ml-0`} onClick={shiftLeft}>
          <ArrowLeft className="w-4" />
        </button>
        <button className={`${buttonClass} py-2 px-6`} onClick={shiftRight}>
          <ArrowRight className="w-8" />
        </button>
      </div>
    </div>
  )
}
