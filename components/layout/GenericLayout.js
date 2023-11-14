import Head from '../Head';
import NavBar from '../navigation/NavBar';
import Container from './Container';
import AnnouncementHero from '../campaigns/AnnoucementHero';
import StickyNavbar from '../navigation/StickyNavbar';

export default function GenericLayout({
  title,
  description,
  image,
  children,
  wide = true,
  hideBanner = false,
}) {
  if (!title || !description || !image)
    throw new Error(
      'Props `title`, `description`, and `image` are required at GenericLayout component.'
    );

  return (
    <div data-testid="GenericLayout">
      <Head title={title} description={description} image={image} />
      <StickyNavbar>
        <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>
      <Container wide={wide}>
        <div data-testid="GenericLayout-banner">
        <AnnouncementHero
          className={`text-center m-4 ${hideBanner && 'hidden'}`}
          small={true}
        />
        </div>
        <div id="main-content" data-testid="Generic-main">
          {children}
        </div>
      </Container>
    </div>
  );
}
