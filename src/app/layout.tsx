import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { DossierProvider } from "@/context/DossierContext";
import { Header } from "@/components/navigation/Header";

export const metadata: Metadata = {
  title: "Liberty Layers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full font-sans bg-stone-950">
        <DossierProvider>
          <NuqsAdapter>
            <Header />
            {children}
          </NuqsAdapter>
        </DossierProvider>
        <svg className="absolute h-0 w-0" aria-hidden="true">
          <defs>
            <filter id="stamp" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.1"
                numOctaves="2"
                stitchTiles="stitch"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.5"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
            </filter>
            <pattern
              id="stripes-horizontal"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <rect width="6" height="1" className="fill-stone-900" />
            </pattern>
          </defs>

          <defs>
            <filter
              id="displacement"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency={0.05}
                numOctaves="1"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={20}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  );
}
