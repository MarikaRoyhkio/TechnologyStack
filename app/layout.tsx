export const metadata = {
  title: 'Teknologiasuosittelija',
  description: 'Valitse projektisi teknologiat helposti',
};

import './global.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fi">
      <body>{children}</body>
    </html>
  )
}
