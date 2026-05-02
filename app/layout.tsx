import './globals.css';
import type { Metadata } from 'next';
import HeaderWrapper from './components/HeaderWrapper';
import dynamic from 'next/dynamic';

const LenisProvider = dynamic(() => import('../components/animations/LenisProvider'), { ssr: false });

export const metadata: Metadata = {
  title: 'Zeex AI 3D Flow',
  description: 'A 3D Next.js landing experience with scroll-driven flow and interactive motion.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider />
        <HeaderWrapper />
        <div className="page-root">{children}</div>
      </body>
    </html>
  );
}
