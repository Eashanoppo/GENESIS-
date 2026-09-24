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
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
