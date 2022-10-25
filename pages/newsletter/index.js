import NavBar from "../../components/navigation/NavBar";
import Head from "../../components/Head";
import Container from '../../components/layout/Container'
import StickyNavbar from "../../components/navigation/StickyNavbar"
import NewsletterSubscribe from '../../components/NewsletterSubscribe'

export default function NewsletterIndexPage() {
  return (
    <div>
      <Head title="Newsletter"/>
      <StickyNavbar>
        <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>
      <div className="py-12 mt-12">
        <Container wide>
          <NewsletterSubscribe />
        </Container>
      </div>
    </div>
  );
}
