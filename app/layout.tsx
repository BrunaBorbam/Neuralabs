import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neuralabs - Websites com Neurociência",
  description: "Criamos sites que entendem o cérebro do seu cliente. Neurociência + Design + SEO + LGPD",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://neuralabs.online",
    siteName: "Neuralabs",
    title: "Neuralabs - Websites com Neurociência",
    description: "Criamos sites que entendem o cérebro do seu cliente.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
