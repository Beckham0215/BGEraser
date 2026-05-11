import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BGEraser — Free AI Background Remover",
  description:
    "Remove image backgrounds instantly with AI — 100% free, runs in your browser, no upload needed. Privacy-first background removal tool.",
  keywords: [
    "background remover",
    "remove background",
    "AI background remover",
    "free background remover",
    "transparent background",
    "remove bg",
  ],
  openGraph: {
    title: "BGEraser — Free AI Background Remover",
    description:
      "Remove image backgrounds instantly with AI. Runs in your browser — your images never leave your device.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BGEraser — Free AI Background Remover",
    description:
      "Remove image backgrounds instantly with AI. 100% free, privacy-first.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
        {/* Google AdSense — uncomment after account approval
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
        */}
        {children}
      </body>
    </html>
  );
}
