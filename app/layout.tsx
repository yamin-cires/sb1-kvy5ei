import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Providers from './providers';
import FloatingCart from '@/components/FloatingCart';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Delicious Eats',
  description: 'Order your favorite meals online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <FloatingCart />
          </div>
        </Providers>
      </body>
    </html>
  );
}