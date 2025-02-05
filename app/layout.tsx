import type { Metadata } from "next";
import { Playwrite_AU_NSW, Quicksand, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { Home } from "lucide-react";

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
    icon: '@/public/logo-red.png',
    shortcut: '@/public/logo-red.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="@/public/logo-red.png" />
      </head>
      <body
        className={`${bodytext.variable} ${heading.variable} ${display.variable} antialiased w-screen min-h-screen flex flex-col bg-background`}
      >
        <header className="bg-gradient-to-tl from-primary2 to-primary py-std px-xtra">
          <div className="flex gap-2 items-center justify-between w-full max-w-1000 mx-auto">
            <div className="flex gap-2 items-center ">
              <h1 className="font-display text-3xl text-white"><Link href={'/'}>Platelette</Link></h1>
              <Image src={logo} alt='Logo' width={45} height={45}/>
            </div>
            <nav className="text-white">
              <Link href={'/'}><span className="sm:hidden"><Home /></span><span className="hidden sm:block">Home</span></Link>
            </nav>
          </div>
        </header>
        <main className="grow bg-background p-std">
          {children}
        </main>
        <footer className="p-std">
          <div className="flex gap-2 flex-wrap text-sm font-light w-full justify-center font-inter text-foreground/75">
            <span>&copy; Platelette 2025</span><span>Made by <Link href={'https://www.stevenhutchison.com'} className="underline text-primary">Steven Hutchison</Link></span>
          </div>
        </footer>
      </body>
    </html>
  );
}
