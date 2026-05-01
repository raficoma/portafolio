import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "R David Ochoa Q| Creative Developer & Designer",
  description:
    "Award-winning creative developer crafting exceptional digital experiences. Specializing in modern web development, UI/UX design, and cutting-edge interactive solutions.",
  keywords: [
    "developer",
    "designer",
    "portfolio",
    "creative",
    "web development",
    "UI/UX",
  ],
  authors: [{ name: "R David Ochoa Q" }],
  openGraph: {
    title: "R David Ochoa Q | Creative Developer & Designer",
    description:
      "Award-winning creative developer crafting exceptional digital experiences.",
    type: "website",
  },
  generator: "R David Ochoa Q Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
