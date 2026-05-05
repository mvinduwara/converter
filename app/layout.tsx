import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Universal File Converter",
  description: "Convert images, PDFs, and documents instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="w-full bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-bold text-blue-600 tracking-tight">ConvertIT.</h1>
          <a href="https://github.com" target="_blank" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            GitHub
          </a>
        </nav>
        <main className="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}