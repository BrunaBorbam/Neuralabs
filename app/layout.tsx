import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { CookieConsent } from "@/components/CookieConsent";
import { PWAInstaller } from "@/components/PWAInstaller";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMonoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Neuralabs | Onde Neurociência Vira Conversão",
  description: "Websites que aumentam conversão em 20-40% usando 3D, neuromarketing e IA. Neuralabs é especialista em design premium e psicologia do consumidor.",
  keywords: "neuromarketing, design web, conversão, 3D, websites premium, agência digital, aumento de vendas",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  openGraph: {
    title: "Neuralabs | Onde Neurociência Vira Conversão",
    description: "Websites que aumentam conversão em 20-40% usando 3D, neuromarketing e IA",
    url: "https://neuralabs.online",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "https://neuralabs.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Neuralabs - Design 3D + Neuromarketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neuralabs | Onde Neurociência Vira Conversão",
    description: "Websites premium que vendem. Design 3D + neuromarketing + SEO.",
    creator: "@neuralabs",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Neuralabs",
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://neuralabs.online"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMonoFont.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Neuralabs',
              description: 'Websites que aumentam conversão em 20-40% usando 3D, neuromarketing e IA',
              url: 'https://neuralabs.online',
              telephone: '',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'BR',
              },
              priceRange: '$$',
              knowsAbout: ['neuromarketing', 'web design', 'conversion optimization', '3D design'],
            }),
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied'
              });
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen bg-[#0A0E27]">
        {children}
        <CookieConsent />
        <PWAInstaller />
      </body>
    </html>
  );
}
