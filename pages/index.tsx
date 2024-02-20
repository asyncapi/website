import { Inter } from 'next/font/google';
import Paragraph from '@/components/typography/Paragraph';
import TextLink from '@/components/typography/TextLink';
import Heading from '@/components/typography/Heading';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Heading typeStyle="heading-xl" textColor="text-blue-500">Welcome to my website!</Heading>
      <Paragraph typeStyle="body-lg" textColor="text-gray-700">This is a sample paragraph.</Paragraph>
      <TextLink href="https://www.google.com" className="underline">fw</TextLink>
    </main>
  );
}
