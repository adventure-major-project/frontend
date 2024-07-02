import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ReactQueryProvider from '@/providers/react-query';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdVenture: AI-Powered Ad Poster Generator",
  description: "AdVenture is AI-Powered webapp that can be used for Ad Poster Generation.",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

      </head>
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
