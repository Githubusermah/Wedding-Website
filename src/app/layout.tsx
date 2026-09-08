import type { Metadata } from "next";
import { Vazirmatn, Amiri, Lalezar, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const lalezar = Lalezar({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-lalezar",
  display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-naskh",
  display: "swap",
});

export const metadata: Metadata = {
  title: "جشن پیوند خدیجه و سمیر | Khadija & Samir Wedding",
  description: "کارت دعوت عروسی خدیجه و سمیر - پنجشنبه ۱۳ میزان ۱۴۰۳، قصر شام پاریس، کابل",
  keywords: ["عروسی", "خدیجه و سمیر", "کارت دعوت", "کابل", "قصر شام پاریس"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${amiri.variable} ${lalezar.variable} ${notoNaskh.variable} scroll-smooth h-full antialiased`}
    >
      <body className="font-sans bg-[#090b0e] text-[#f8f6f0] selection:bg-[#d4af37] selection:text-[#090b0e] min-h-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
