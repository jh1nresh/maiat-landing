import type {Metadata, Viewport} from 'next';
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
  metadataBase: new URL('https://maiat.io'),
  title: 'Maiat | Financial Control for Autonomous Teams',
  description:
    "Bound every agent's budget, reconcile every payment, and trace each spend to the task and accepted work.",
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: 'https://maiat.io',
    siteName: 'Maiat',
    title: 'Financial control for autonomous teams.',
    description:
      "Bound every agent's budget, reconcile every payment, and trace each spend to the task and accepted work.",
    images: [
      {
        url: 'https://maiat.io/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Maiat Agent Spend Control Plane',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Financial control for autonomous teams.',
    description:
      "Bound every agent's budget, reconcile every payment, and trace each spend to the task and accepted work.",
    images: ['https://maiat.io/opengraph-image'],
  },
  verification: {
    other: {
      'virtual-protocol-site-verification': '3699be0e5376331a708d5bb7ff466e75',
    },
  },
};

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
