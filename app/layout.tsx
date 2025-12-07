import type { Metadata } from "next";
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
  title: {
    default: "FinReports - Financial Analysis Platform",
    template: "%s | FinReports"
  },
  description: "In-depth financial reports and analysis of public companies. Data-driven insights for informed investment decisions.",
  keywords: ["financial analysis", "stock reports", "SEC filings", "investment research", "market analysis"],
  authors: [{ name: "FinReports" }],
  creator: "FinReports",
  publisher: "FinReports",
  metadataBase: new URL("https://finance.mashijian.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://finance.mashijian.com",
    title: "FinReports - Financial Analysis Platform",
    description: "In-depth financial reports and analysis of public companies. Data-driven insights for informed investment decisions.",
    siteName: "FinReports",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinReports - Financial Analysis Platform",
    description: "In-depth financial reports and analysis of public companies.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" }
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
