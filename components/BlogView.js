import BlogPostItem from './navigation/BlogPostItem'
import { getAllPosts } from '../lib/api'

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
  return (
    <div className="lg:flex flex-col lg:w-4/5 p-4 overflow-auto">
        <div className="flex flex-row snap-x overflow-x-scroll">
            {
                posts.map((post, index) => (
                     <BlogPostItem className='snap-start mx-4 w-1/2 scroll-ml-6' post={post} key={index} /> 
                  ))
            }
        </div>
       <div className="d-flex flex-row">
           
        </div>   
    </div>
  )
}
