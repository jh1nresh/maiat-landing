import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Maiat — The Trust Layer for AI Agents",
  description:
    "The native trust and reputation infrastructure for AI agents on Base Mainnet. Verified reviews, on-chain trust scores, and trust‑gated swaps.",
  openGraph: {
    title: "Maiat — Trust Infrastructure for AI Agents",
    description: "Query any address. Get a trust score. Trade with confidence.",
    url: "https://maiat-protocol.vercel.app",
    siteName: "Maiat Protocol",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maiat — The Trust Layer for AI Agents",
    description: "The native trust and reputation infrastructure for AI agents on Base Mainnet.",
    creator: "@0xmaiat",
  },
  icons: {
    icon: "/maiat-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
