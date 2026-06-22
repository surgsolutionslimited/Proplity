import type { Metadata } from "next";
import "./globals.css";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: {
    default: "Proplity — Institutional-Grade Property Analytics",
    template: "%s | Proplity",
  },
  description:
    "Search any UK postcode for real-time sold prices, EPC ratings, investment scores, and comparable sales data. Make smarter property decisions with Proplity.",
  keywords: [
    "UK property analytics",
    "house price data",
    "land registry",
    "EPC rating",
    "investment score",
    "property insights",
  ],
  authors: [{ name: "Proplity" }],
  openGraph: {
    title: "Proplity — Institutional-Grade Property Analytics",
    description:
      "Real-time UK property data: sold prices, EPC ratings, investment scores and more.",
    url: "https://proplity.vercel.app",
    siteName: "Proplity",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proplity — Property Analytics",
    description: "Institutional-grade UK property data for everyone.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        {/* Preconnect to Google Fonts for faster resolution */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Geist + Inter — text fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols — icon font, must be display=swap so icons always render */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Map tile CDN prefetch */}
        <link rel="preconnect" href="https://tile.openstreetmap.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-background text-on-background font-body-md overflow-x-hidden">
        <ScrollToTop />
        <ThemeProvider>
          <AuthProvider>
            <AuthGuard>
              <TopNavBar />
              <main className="flex-grow flex flex-col">
                {children}
              </main>
              <Footer />
            </AuthGuard>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
