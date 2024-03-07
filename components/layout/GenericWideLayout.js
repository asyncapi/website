import Head from '../Head'
import AnnouncementHero from '../campaigns/AnnoucementHero'
import Row from './Row'

export default function GenericWideLayout({
  title,
  description,
  image,
  children,
  wide = true,
}) {
  if (!title || !description || !image)
    throw new Error(
      'Props `title`, `description`, and `image` are required at GenericLayout component.'
    );

  return (
    <>
      <Head title={title} description={description} image={image} />
      <Row>
        <AnnouncementHero className="text-center m-4" small={true} />
        {children}
      </Row>
    </>
  );
}
