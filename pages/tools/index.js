import ToolDashboard from '../../components/tools/ToolDashboard';
import ToolFilter from '../../context/ToolFilterContext';
import GenericLayout from '../../components/layout/GenericLayout';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';
import Container from '../../components/layout/Container';
import TextLink from '../../components/typography/TextLink';

export default function toolsDashboard() {
  const description = 'Tools Dashboard for AsyncAPI Initiative';
  const image = '/img/social/meetings.png';
  
  return (
    <div>
      <GenericLayout title="Tools" description={description} image={image}>
        <Container wide>
          <div className="text-center mt-12">
            <Heading level="h1" typeStyle="heading-lg">
              AsyncAPI Tools Dashboard
            </Heading>
            <Paragraph className="my-3 sm:mt-4 max-w-2xl mx-auto">
              Here you can quickly discover various tools to optimize your
              journey with AsyncAPI! These tools are made by the community, for
              the community. Have an AsyncAPI tool that you want featured on
              this list?
              <TextLink href="https://github.com/asyncapi/website/issues/new?template=blog.md" target="_blank">
                Submit it here!
              </TextLink>
            </Paragraph>
          </div>
          <ToolFilter>
            <ToolDashboard />
        </ToolFilter>
        </Container>
      </GenericLayout>
    </div>
  );
}
