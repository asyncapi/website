import { Inter, Work_Sans } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-work-sans',
  preload: true,
})
