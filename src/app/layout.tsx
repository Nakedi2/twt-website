import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Walking Textbooks | Empowering Education Through Innovation",
  description:
    "The Walking Textbooks (TWT) is a forward-thinking education technology company dedicated to transforming learning experiences across Africa and beyond through innovative digital solutions, AI-powered tools, and modern content delivery.",
  keywords: [
    "education technology",
    "edtech",
    "e-learning",
    "digital learning",
    "African edtech",
    "online education",
    "TWT",
    "The Walking Textbooks",
    "learning management system",
    "AI education",
  ],
  authors: [{ name: "The Walking Textbooks", url: "https://thewalkingtextbooks.com" }],
  creator: "The Walking Textbooks",
  publisher: "The Walking Textbooks",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://thewalkingtextbooks.com",
    siteName: "The Walking Textbooks",
    title: "The Walking Textbooks | Empowering Education Through Innovation",
    description:
      "TWT is a forward-thinking education technology company transforming learning across Africa through innovative digital solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Walking Textbooks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Walking Textbooks | Empowering Education Through Innovation",
    description:
      "TWT is a forward-thinking education technology company transforming learning across Africa through innovative digital solutions.",
    images: ["/og-image.png"],
    creator: "@thewalkingtextbooks",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1628" },
  ],
};

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/shared/LoadingScreen";
import CookieBanner from "@/components/shared/CookieBanner";
import ScrollToTop from "@/components/shared/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('twt-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LoadingScreen />
          <Header />
          <main className="flex-1 pt-16 lg:pt-20">{children}</main>
          <Footer />
          <CookieBanner />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
