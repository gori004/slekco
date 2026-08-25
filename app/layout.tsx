import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: {
    default: "Slekco — Everything Worth Having",
    template: "%s | Slekco",
  },
  description:
    "Discover fashion, electronics, home, beauty and everyday essentials at Slekco.",
  keywords: [
    "Slekco",
    "ecommerce",
    "fashion",
    "electronics",
    "home",
    "beauty",
    "shopping",
  ],
  openGraph: {
    title: "Slekco — Everything Worth Having",
    description:
      "A curated marketplace for things worth having.",
    type: "website",
    siteName: "Slekco",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}