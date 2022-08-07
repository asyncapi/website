import GenericLayout from '../../components/layout/GenericLayout'
import Heading from "../../components/typography/Heading";
import Paragraph from "../../components/typography/Paragraph";
import Container from "../../components/layout/Container";
import TextLink from "../../components/typography/TextLink";
import FilterIcon from "../../components/icons/Filter";
import ArrowDown from "../../components/icons/ArrowDown";
import SearchIcon from "../../components/icons/Search"

export default function toolsDashboard() {
  const description = 'Tools Dashboard for AsyncAPI Initiative'
  const image = '/img/social/meetings.png'
  return (
    <div>
       <GenericLayout title="Tools" description={description} image={image}>
       <Container wide>
          <div className="text-center mt-12">
          <Heading
              level="h1"
              typeStyle="heading-lg"
            >
                AsyncAPI Tools Dashboard
            </Heading>
            <Paragraph className="my-3 sm:mt-4 max-w-2xl mx-auto">
              Here you can quickly discover various tools to optimize your journey with AsyncAPI! These tools are made by the community, for the community. Have an AsyncAPI tool that you want featured on this list?
              <TextLink href="https://github.com/asyncapi/website/issues/new?template=blog.md" target="_blank">Submit it here!</TextLink>
            </Paragraph>
          </div>
          <div className="flex flex-row gap-5 my-10">
            <div className="flex justify-center items-center gap-2 rounded-lg border w-1/12 border-gray-300 hover:bg-gray-300 text-gray-700 shadow text-sm cursor-pointer">
              <FilterIcon />
              <div>Filter</div>
            </div>
            <div className="p-3 flex justify-between gap-2 rounded-lg border w-3/12 border-gray-300 hover:bg-gray-300 text-gray-700 shadow text-sm cursor-pointer">
              <div>Jump to Category</div>
              <ArrowDown className="my-auto" />
            </div>
            <div className="p-3 flex gap-2 rounded-lg border w-8/12 border-gray-300 hover:border-gray-600 active:border-gray-600 text-gray-700 shadow text-sm">
              <SearchIcon className="my-auto opacity-70"/>
              <input className="border-none outline-none flex-1" placeholder="Search by name" type="text" />
            </div>
          </div>
        </Container>
       </GenericLayout>  
    </div>
  )
}
