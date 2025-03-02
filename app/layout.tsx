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
  title: "Platelette",
  description: "Share your plate",
  icons: {
    icon: '/logo-red.png',
    shortcut: '/logo-red.png'
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
      </head>
      <body
        className={`${bodytext.variable} ${heading.variable} ${display.variable} antialiased overflow-x-hidden w-screen min-h-screen flex flex-col bg-background`}
      >
        <AuthProvider>
          <PageHead />
          <main className="grow bg-background p-std w-full sm:px-8 lg:max-w-[1600px] mx-auto">
            {children}
          </main>
        </AuthProvider>
        <PageFooter />
      </body>
    </html>
  );
}
