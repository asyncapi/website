import {useEffect} from 'react'
import BlogPostItem from './navigation/BlogPostItem'
import { getAllPosts } from '../lib/api'
import ArrowRight from './icons/ArrowRight'
import ArrowLeft from './icons/ArrowLeft'

export default function BlogView() {
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
    let blogContainer
    useEffect(() => {
      blogContainer = document.getElementById('blog-container')
    }, [])
    
    const shiftLeft = (e) =>{
      e.preventDefault()
      blogContainer.scrollLeft-=350
     }
    const shiftRight = (e) =>{
    e.preventDefault()
    blogContainer.scrollLeft+=350
    }  
  return (
    <div className="flex-col lg:flex lg:w-4/5 p-4 overflow-auto">
        <div className="flex snap-x gap-6 overflow-x-auto" id="blog-container">
            {
                posts.map((post, index) => (
                     <BlogPostItem className='snap-start scroll-ml-6' post={post} key={index} /> 
                  ))
            }
        </div>
       <div className="flex flex-row mt-4">
           <div className="border-2 py-4 px-8 shadow-md rounded border-gray-100 text-gray-400 hover:border-secondary-500 hover:text-secondary-500 hover:bg-secondary-100 mx-2" onClick={shiftLeft}>
                <ArrowLeft className="w-5" />
           </div>
           <div className="border-2 py-2 px-6 shadow-md rounded border-gray-100 text-gray-400 hover:border-secondary-500 hover:text-secondary-500 hover:bg-secondary-100 mx-2" onClick={shiftRight}>
                <ArrowRight className="w-8" />
           </div>
        </div>   
    </div>
  )
}
