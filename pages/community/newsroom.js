import GenericLayout from "../../components/layout/GenericLayout";
import Container from '../../components/layout/Container'
import Newsroom from "../../components/newsroom/Newsroom"

function newsroom() {
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
            <Newsroom />
        </Container>

    </GenericLayout>
  )
}

export default newsroom