import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GENESIS — The Beginning of a New Era | Rotaract Club of DIU",
  description:
    "Join GENESIS — A Day of Ideas & Inspiration organized by the Rotaract Club of Daffodil International University. 03 November 2026 at ICH, Daffodil International University.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.rotaract.org.bd"),
  openGraph: {
    title: "GENESIS — The Beginning of a New Era",
    description: "A Day of Ideas & Inspiration. 03 November 2026. Rotaract Club of DIU.",
    type: "website",
    locale: "en_US",
    siteName: "GENESIS 2026",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
