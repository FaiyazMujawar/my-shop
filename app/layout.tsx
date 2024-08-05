import Navigation from '@components/navigation';
import '@styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MyShop',
  description: 'A shop that provides services',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`flex flex-col min-h-screen bg-background font-sans antialiased ${inter.className}`}
      >
        <Providers>
          <Navigation />
          <div className='h-full'>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
