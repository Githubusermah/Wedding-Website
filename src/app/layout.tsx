import type { Metadata } from "next";
import { Vazirmatn, Noto_Nastaliq_Urdu } from "next/font/google";
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
    <html lang="fa-AF" dir="rtl" className={`${vazirmatn.variable} ${nastaliq.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Playfair+Display:wght@500;600&family=Tangerine:wght@700&family=Noto+Naskh+Arabic:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--ivory)] text-[var(--ink)] antialiased font-vazir">
        {children}
      </body>
    </html>
  );
}
