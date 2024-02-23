import { Inter } from 'next/font/google';
import { buttonComps, iconComps } from '@/data/temp';
import ChapterSuggestion from '@/components/buttons/ChapterSuggestion';
import ChapterSuggestions from '@/components/buttons/ChapterSuggestions';

const inter = Inter({ subsets: ['latin'] });
let buttons: any[][]
let icons: any[][] 
Promise.all(
  buttonComps.map(async (file) => {
    return [await import(`../components/buttons/${file}`), file];
  }
  )).then((res) => {
    console.log(res);
    buttons = res;
  });

Promise.all(
  iconComps.map(async (file) => {
    return [await import(`../components/icons/${file}`), file];
  }
  )).then((res) => {
    icons = res;
  });

export default function Home() {

  return (
    <main
      className={`min-h-screen p-24 ${inter.className}`}
    >
      <ChapterSuggestion
        href='/'
        title='Chapter Title'
        description='Chapter Description'
        linkText='Chapter Link'
      />
      <ChapterSuggestions suggestions={[
        {
          href: '/',
          title: 'Chapter Title',
          description: 'Chapter Description',
          linkText: 'Chapter Link'
        },
        {
          href: '/',
          title: 'Chapter Title',
          description: 'Chapter Description',
          linkText: 'Chapter Link'
        },
        {
          href: '/',
          title: 'Chapter Title',
          description: 'Chapter Description',
          linkText: 'Chapter Link'
        }
      ]} />

      <div className='grid grid-cols-2 gap-4 w-auto'>
        {buttons?.map(([Button, file]) => (
          <div className='flex flex-col items-center' key={file}>
            {Button.default && <Button.default key={file} text='Button' className='mb-4 w-full' />}
            <span key={file}>{file}</span>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-5 gap-4 w-auto mt-6'>
        {icons?.map(([Icon, file]) => (
          <div className='flex flex-col items-center' key={file}>
            {Icon.default && <Icon.default key={file} className='mb-4 w-8 h-8' />}
            <span key={file}>{file}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
