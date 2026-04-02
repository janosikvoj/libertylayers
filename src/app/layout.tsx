import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Header } from '@/components/navigation/Header';

export const metadata: Metadata = {
  title: '¤ Liberty Layers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body className="min-h-full font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
