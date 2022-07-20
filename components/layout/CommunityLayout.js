import Head from '../Head';
import Container from './Container';
import StickyNavbar from '../navigation/StickyNavbar';
import IconAsyncAPI from '../icons/AsyncAPI';
import Link from 'next/link';

const links = [
  {
    name: 'Tutorials',
  },
  {
    name: 'Tech Talks',
  },
  {
    name: 'Get Involved',
  },
  {
    name: 'Community Docs',
  },
];

function CommunityNav() {
  return (
    <div className="p-5 top-0 w-full p-1 bg-gray border-none sticky z-50">
      <nav className="flex items-center justify-between z-50">
        <div className="flex items-center justify-between cursor-pointer">
          <Link href="/">
            <a>
              <IconAsyncAPI />
            </a>
          </Link>
          {/* <div>
            <span className="text-gray-400 text-2xl font-bold">Community</span>
          </div> */}
          <div className="flex">
            {links.map((link) => (
              <div className="ml-10 text-sm" key={link.name}>
                {link.name}
              </div>
            ))}
          </div>
        </div>
        <div>Login</div>
      </nav>
    </div>
  );
}

export default function CommunityLayout({
  title,
  description,
  children,
  wide = true,
}) {
  if (!title || !description)
    throw new Error(
      'Props `title`, `description`, and `image` are required at GenericLayout component.'
    );
  return (
    <>
      <Head title={title} description={description} />
      <Container wide={wide}>
        <CommunityNav />
        {children}
      </Container>
    </>
  );
}
