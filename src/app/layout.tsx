import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '~/components/navigation';
import { Toaster } from '~/components/ui/sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navigation />
        <div className='w-4/5 mx-auto py-10'>{children}</div>
        <Toaster richColors closeButton duration={2000} />
      </body>
    </html>
  );
}
