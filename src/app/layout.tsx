import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Goldman } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const goldman = Goldman({
  weight: ['400', '700'],
  variable: "--font-goldman",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amir Darabi - Software Developer",
  description: "Personal portfolio website showcasing projects and skills",
  keywords: "software developer, web development, portfolio, react, next.js",
  authors: [{ name: "Amir Darabi" }],
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${goldman.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
