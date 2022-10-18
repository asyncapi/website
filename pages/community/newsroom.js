import GenericLayout from "../../components/layout/GenericLayout";
import Container from '../../components/layout/Container'
import NewsroomSection from "../../components/newsroom/Newsroom"

function Newsroom() {
    const description =
    "Learn about what's happening in AsyncAPI.";
  const image = "/img/social/meetings.png";
  return (
    <GenericLayout
      title="AsyncAPI Newsroom"
      description={description}
      image={image}
      wide
    >
        <Container wide>
            <NewsroomSection />
        </Container>

    </GenericLayout>
  )
}

export default Newsroom