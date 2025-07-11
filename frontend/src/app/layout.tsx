import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Head from 'next/head';

export const metadata: Metadata = {
  title: "IBCM Training - Empowering the Next Generation",
  description: "Professional training programs in cybersecurity, data protection, and emerging technologies. Transform your career with world-class education.",
  keywords: "training, cybersecurity, data protection, professional development, Nigeria, SBTS Group, Digital Bridge Institute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
