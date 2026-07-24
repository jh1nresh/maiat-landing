import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Maiat Protocol | The Trust Layer for the Agent Economy',
  description: 'Verify AI agent behavioral trust scores on Base — powered by real Virtuals ACP job history.',
  verification: {
    other: {
      'virtual-protocol-site-verification': '3699be0e5376331a708d5bb7ff466e75',
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
