import Head from '../Head';
import Container from './Container';
import AnnouncementHero from '../campaigns/AnnouncementHero';

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
