import './globals.css'
import { Inter, Noto_Sans_JP} from 'next/font/google'
import { config } from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Metadata } from 'next';
config.autoAddCss = false; 
const inter = Inter({ subsets: ['latin'] })

const noto = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: 'Himagaku',
  description: 'Learn Kanji on your freetime.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${noto.className}`}>
      {children}
      </body>
    </html>
  )
}
