import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";

// next/font handles font loading with zero layout shift and no render-blocking
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <head>
        {/* Material Symbols — loaded async to avoid render-blocking */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
        <link rel="preconnect" href="https://tile.openstreetmap.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-background text-on-background font-body-md overflow-x-hidden">
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
