import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Digital Clip Agency",
    template: "%s | Digital Clip Agency",
  },
  description:
    "Agencia de edición de video para creadores de contenido en YouTube, Instagram y TikTok.",
  applicationName: "Digital Clip Agency",
  keywords: [
    "edición de video",
    "agencia de contenido",
    "YouTube",
    "Instagram",
    "TikTok",
    "creadores de contenido",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip">{children}</body>
    </html>
  );
}
