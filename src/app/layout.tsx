import type { Metadata } from "next";
import {
  Vazirmatn,
  Noto_Nastaliq_Urdu,
  Cormorant_Garamond,
  Playfair_Display,
  Cinzel,
  Great_Vibes,
  Alex_Brush,
  Noto_Naskh_Arabic,
  Aref_Ruqaa,
} from "next/font/google";
import "./globals.css";
import { weddingConfig } from "../../config/wedding";
import SiteBackground from "@/components/SiteBackground";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  display: "swap",
});

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-nastaliq",
  display: "swap",
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-aref-ruqaa",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alex-brush",
  display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600"],
  variable: "--font-noto-naskh",
  display: "swap",
});

export const metadata: Metadata = {
  title: weddingConfig.pageTitle,
  description: weddingConfig.pageDescription,
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: weddingConfig.pageTitle,
    description: `جشن پیوند ${weddingConfig.coupleDisplayNameFa} - ${weddingConfig.weekdayFa} ${weddingConfig.solarHijriDateFa}`,
    locale: "fa_AF",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa-AF"
      dir="rtl"
      className={`${vazirmatn.variable} ${nastaliq.variable} ${arefRuqaa.variable} ${cormorant.variable} ${playfair.variable} ${cinzel.variable} ${greatVibes.variable} ${alexBrush.variable} ${notoNaskh.variable}`}
    >
      <body className="bg-[#f4c2cf] text-[var(--ink)] antialiased font-vazir relative min-h-screen">
        <SiteBackground />
        {children}
      </body>
    </html>
  );
}
