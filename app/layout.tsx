import type { Metadata } from "next";
import { Playwrite_AU_NSW, Quicksand, Inter } from "next/font/google";
import "./globals.css";
import PageHead from "./_components/nav/PageHead";
import PageFooter from "./_components/nav/PageFooter";
import { AuthProvider } from "./_hooks/useAuth";


const display = Playwrite_AU_NSW({
  weight: "400",
  variable: "--font-display",
});

const heading = Quicksand({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodytext = Inter({
  variable: "--font-body",
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Platelette.com",
  description: "Discover, share, and create recipes with ease on Platelette.com",
  icons: {
    icon: '/logo-red.png',
    shortcut: '/logo-red.png'
  },
  openGraph: {
    title: "Platelette.com",
    description: "Discover, share, and create recipes with ease on Platelette.com",
    images: {url: '/logo-red.png', width: 1200, height: 600}
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-primary">
      <head>
        <link rel="icon" href="/logo-red.png" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4003624543865831"
     crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${bodytext.variable} ${heading.variable} ${display.variable} antialiased overflow-x-hidden w-screen min-h-screen bg-background`} 
      >
        <AuthProvider>
          <PageHead />
          <main className="grow bg-background w-full bg-gradient-to-t from-secondary/5 to-background to-50%">
            {children}
          </main>
        </AuthProvider>
        <PageFooter />
      </body>
    </html>
  );
}
