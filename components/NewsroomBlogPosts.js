import { useState, useRef } from 'react'
import BlogPostItem from './navigation/BlogPostItem'
import { getAllPosts } from '../lib/api'
import ArrowRight from './icons/ArrowRight'
import ArrowLeft from './icons/ArrowLeft'

export default function NewsroomBlogPosts() {
  const [current, setCurrent] = useState(0);
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
  const blog = useRef();
  const shiftLeft = (e) => {
    e.preventDefault()
    if(current>0) setCurrent(current-1);
    const width = blog.current.clientWidth
    blogContainer.current.scrollLeft -= (width+16)
  }
  const shiftRight = (e) => {
    e.preventDefault()
    if(current<3) setCurrent(current+1)
    const width = blog.current.clientWidth
    blogContainer.current.scrollLeft += (width+16)
  }
  let buttonClass = 'shadow-md rounded border mx-2 focus:outline-none'
  return (
    <div className="flex-col lg:flex lg:w-3/4 overflow-auto">
      <div className="flex overflow-x-auto scroll-none list-none gap-4" ref={blogContainer}>
        {
          posts.map((post, index) => (
              <BlogPostItem post={post} key={index} className="min-w-full md:min-w-76" ref={blog} id={`post${index}`}/>
          ))
        }
      </div>
      <div className="flex flex-row mt-4 justify-content-center md:justify-content-start">
        <button className={`${buttonClass} py-3 px-6 ml-0 ${ current === 0 ? 'cursor-not-allowed bg-white border-gray-400 text-gray-400' : 'bg-secondary-100  hover:bg-secondary-500 border-secondary-500  text-secondary-500 hover:text-white'}`} onClick={shiftLeft}>
          <ArrowLeft className='w-4' />
        </button>
        <button className={`${buttonClass} py-1 px-4 ${ current === 3 ? 'cursor-not-allowed bg-white border-gray-400 text-gray-400' : 'bg-secondary-100  hover:bg-secondary-500 border-secondary-500  text-secondary-500 hover:text-white'}`} onClick={shiftRight}>
          <ArrowRight className='w-8' />
        </button>
      </div>
    </div>
  )
}
