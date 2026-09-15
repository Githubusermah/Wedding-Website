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
  title: event.pageTitle,
  description: `دعوت‌نامه رسمی جشن پیوند ${event.coupleDisplayName} در ${event.venueName}`,
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
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
      className={`${vazirmatn.variable} ${nastaliq.variable} ${cormorant.variable} ${playfair.variable} ${cinzel.variable} ${greatVibes.variable} ${alexBrush.variable} ${notoNaskh.variable}`}
    >
      <body className="bg-[var(--ivory)] text-[var(--ink)] antialiased font-vazir">
        {children}
      </body>
    </html>
  );
}
