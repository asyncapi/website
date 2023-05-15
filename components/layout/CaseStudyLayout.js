import Head from '../Head';
import NavBar from '../navigation/NavBar';
import Container from './Container';
import Footer from '../Footer';
import AnnouncementHero from '../campaigns/AnnoucementHero';
import StickyNavbar from '../navigation/StickyNavbar';
import CaseTOC from '../CaseTOC';

export default function CaseStudyLayout({
  title,
  description,
  image,
  children,
  content,
  wide = true,
  hideBanner = false,
}) {
  if (!title || !description || !image)
    throw new Error(
      'Props `title`, `description`, and `image` are required at GenericLayout component.'
    );

  return (
    <>
      <Head title={title} description={description} image={image} />
      <StickyNavbar>
        <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>
      <Container wide={wide}>
        <AnnouncementHero
          className={`text-center m-4 ${hideBanner && 'hidden'}`}
          small={true}
        />
        <div id="main-content" className='flex'>
          {children}
          <CaseTOC toc={content} cssBreakingPoint="lg" className="bg-blue-100 mt-4 p-4 sticky top-20 overflow-y-auto max-h-screen lg:bg-transparent lg:mt-2 lg:pt-0 lg:pb-8 lg:top-24 lg:max-h-(screen-16) lg:border-l lg:border-gray-200 lg:min-w-40 lg:max-w-64 lg:-mr-20 xl:min-w-72 xl:-mr-36" />
        </div>
      </Container>
    </>
  );
}
