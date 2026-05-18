import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
