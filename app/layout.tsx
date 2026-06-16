import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { getPublicRobots, getSiteUrl } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Digital Clip Agency",
    template: "%s | Digital Clip Agency",
  },
  description: "Digital Clip Agency",
  applicationName: "Digital Clip Agency",
  creator: "Digital Clip Agency",
  publisher: "Digital Clip Agency",
  robots: getPublicRobots(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip">{children}</body>
    </html>
  );
}
