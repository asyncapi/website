import { TwitterTimelineEmbed } from 'react-twitter-embed'
import NewsroomBlogPosts from './NewsroomBlogPosts'
import NewsroomArticle from './NewsroomArticle'
import NewsroomYoutube from './NewsroomYoutube'
import ArrowRight from '../icons/ArrowRight'
import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'
import TextLink from '../typography/TextLink'

export default function Newsroom() {
  return (
    <> 
      <div className="text-center">
        <Heading
          level="h2"
          typeStyle="heading-lg"
        >
          Latest Updates
        </Heading>
        <Paragraph typeStyle="body-md" className="max-w-2xl mx-auto mt-5">
          Get a glimpse of latest news, events, and blog posts. Want to publish a blog post? We love community stories.
          <TextLink href="https://github.com/asyncapi/website/issues/new?template=blog.md" target="_blank">
            Submit yours!
          </TextLink>
        </Paragraph>
      </div>

      <div className="lg:flex flex-row my-20 -mr-2">
        <div className="text-center lg:text-left lg:w-1/4 pt-4">
          <Heading level="h4" typeStyle="heading-md-semibold">
            From the blog
          </Heading>
          <Paragraph typeStyle="body-md" className="mt-5">
            Check out these articles written by community members
          </Paragraph>
          <div className="my-5">
            <TextLink href="/blog" className="mt-5">
              Read all blog posts
              <ArrowRight className="inline w-6" />
            </TextLink>
          </div>
        </div>
        <div className='lg:w-3/4'>
          <NewsroomBlogPosts />
        </div>
      </div>

      <hr />

      <div className="flex flex-col lg:flex-row my-20">
        <div className="text-center lg:text-left lg:w-1/4 pt-4">
          <Heading level="h4" typeStyle="heading-md-semibold">
            Latest News
          </Heading>
          <Paragraph typeStyle="body-md" className="mt-5">
            Read about what people are <br /> saying about AsyncAPI
          </Paragraph>
          <div className="my-5">
            <TextLink href="https://twitter.com/AsyncAPISpec" className="mt-4" target="_blank">
              Follow us on Twitter
              <ArrowRight className="inline w-6" />
            </TextLink>
          </div>
        </div>

        <div className='md:flex flex-row items-stretch justify-between w-full lg:w-3/4'>
          <div className="flex flex-col w-full md:w-1/2 relative overflow-y-auto">
            <div className='min-h-0'>
              <div className='md:absolute md:t-0 md:b-0 md:l-0 md:r-0 w-full h-full max-h-120'>
                <NewsroomArticle /> 
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 px-2 md:pr-0 md:pl-4'>
            <div className="rounded-xl shadow-md mt-8 w-full mx-auto md:mt-0">
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="AsyncAPISpec"
                options={{ tweetLimit: '2' }}
              />
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="lg:flex flex-row my-20 -mr-2">
        <div className="text-center lg:text-left lg:w-1/4 pt-4">
          <Heading level="h4" typeStyle="heading-md-semibold">
            Video & Live Streams
          </Heading>
          <Paragraph typeStyle="body-md" className="mt-5">
            Watch our latest videos and live streams on the AsyncAPI YouTube channel
          </Paragraph>
          <div className="my-5">
            <TextLink href="https://www.youtube.com/c/AsyncAPI" className="mt-4" target="_blank">
              Visit our YouTube channel
              <ArrowRight className="inline w-6" />
            </TextLink>
          </div>
        </div>
        <div className='lg:w-3/4'>
          <NewsroomYoutube />
        </div>
      </div>
    </>
  );
}