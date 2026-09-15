import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-body",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-head",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Мотивация теориялары — Маслоу, Герцберг, МакКлелланд, Врум",
  description:
    "Интерактивті 3D-презентация: Маслоудың қажеттіліктер иерархиясы, Герцбергтің екі факторлы теориясы, МакКлелландтың қажеттіліктер теориясы және Врумның күту теориясы.",
};

export const viewport: Viewport = {
  themeColor: "#070b1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="kk" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
