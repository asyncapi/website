import { Fira_Code, Fira_Mono, Inter, Work_Sans } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter'
});

export const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-work-sans'
});

export const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fira-code'
});

export const firaMono = Fira_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-fira-code-mono'
});
