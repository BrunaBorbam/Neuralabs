import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { CookieConsent } from "@/components/CookieConsent";
import { PWAInstaller } from "@/components/PWAInstaller";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

// Weight lists trimmed to exactly what the site's Tailwind classes use
// (audited via grep across components/app) — cuts font requests from 15
// files to 8 and, more importantly, fixes every section heading: they all
// use font-serif + font-black (900), which Playfair Display was NOT
// loading before (it stopped at 800) — the browser was faux-bolding every
// title on the site instead of rendering the real black weight.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  // Playfair Display has no true light (300) cut — the Hero's
  // font-light headline just resolves to the nearest loaded weight (400).
  weight: ["400", "700", "900"],
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
    // Image comes from app/opengraph-image.tsx (Next generates it and wires
    // up og:image/twitter:image automatically) — this used to point at
    // /og-image.jpg, which was never added to public/, so every link
    // shared on WhatsApp, Instagram or LinkedIn showed no preview image.
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
    <html
      lang="pt-BR"
      className={`overflow-x-hidden max-w-full w-full ${inter.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* No preconnect to fonts.googleapis.com/fonts.gstatic.com: next/font
            self-hosts Inter and Playfair Display at build time (see the
            imports below), so the browser never actually opens a connection
            to Google's font CDN in production — these were two unused
            preconnects doing nothing but reserving a socket. */}
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
      <body className="min-h-screen overflow-x-hidden max-w-full w-full bg-[#0B0A0E] text-pearl-200">
        <LanguageProvider>
          <SmoothScroll />
          {children}
          <CookieConsent />
          <PWAInstaller />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
