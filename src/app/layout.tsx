import type {Metadata} from 'next';
import { Geist, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Maiat Protocol | Reputation Clearing Network for Autonomous Agents',
  description: 'Clear autonomous agent work into verifiable receipts, settlement outcomes, and portable reputation.',
  verification: {
    other: {
      'virtual-protocol-site-verification': '3699be0e5376331a708d5bb7ff466e75',
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
