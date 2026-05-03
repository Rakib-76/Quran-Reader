import type { Metadata } from 'next';
import { Amiri, Scheherazade_New } from 'next/font/google';
import './globals.css';

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-amiri',
  display: 'swap',
});

const scheherazade = Scheherazade_New({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-scheherazade',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Quran Reader',
  description: 'A beautiful Quran reader app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`h-screen w-screen overflow-hidden bg-background text-text-dark flex ${amiri.variable} ${scheherazade.variable}`}>
        {children}
      </body>
    </html>
  );
}
