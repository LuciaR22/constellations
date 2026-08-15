import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Constellations",
  description: "Track and connect the works that resonate with you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen`}>
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
          <header className="mb-10 border-b border-border pb-6">
            <Link href="/nodes" className="text-2xl font-semibold text-foreground">
              Constellations
            </Link>
            <p className="mt-1 text-sm text-muted">
              Your personal network of resonant works
            </p>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
