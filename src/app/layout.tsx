import type { Metadata } from "next";
import "./globals.css";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Proplity",
  description: "Institutional-grade property analytics",
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
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://tile.openstreetmap.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
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
