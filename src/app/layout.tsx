import type { Metadata } from "next";
import {
  Vazirmatn,
  Noto_Nastaliq_Urdu,
  Cormorant_Garamond,
  Playfair_Display,
  Tangerine,
  Noto_Naskh_Arabic,
} from "next/font/google";
import "./globals.css";
import { event } from "@/lib/event";

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

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-playfair",
  display: "swap",
});

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-tangerine",
  display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600"],
  variable: "--font-noto-naskh",
  display: "swap",
});

export const metadata: Metadata = {
  title: event.pageTitle,
  description: `دعوت‌نامه رسمی جشن پیوند ${event.coupleDisplayName} در ${event.venueName}`,
  openGraph: {
    title: event.pageTitle,
    description: `جشن پیوند ${event.coupleDisplayName} - ${event.invitationDateFa}`,
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
      className={`${vazirmatn.variable} ${nastaliq.variable} ${cormorant.variable} ${playfair.variable} ${tangerine.variable} ${notoNaskh.variable}`}
    >
      <body className="bg-[var(--ivory)] text-[var(--ink)] antialiased font-vazir">
        {children}
      </body>
    </html>
  );
}
