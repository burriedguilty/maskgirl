import type { Metadata } from "next";
import { URL } from "url";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mask Girl",
  description: "Mask Girl fan website - Explore the world of Mask Girl",
  metadataBase: new URL('https://yourdomain.com'),
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Mask Girl',
    title: 'Mask Girl',
    description: 'Mask Girl fan website - One and only maskgirl on solana',
    images: ['/opengraph-image.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mask Girl',
    description: 'Mask Girl fan website - One and only maskgirl on solana',
    images: ['/opengraph-image.jpg'],
    creator: '@bby_kimzen'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
