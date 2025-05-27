import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'My Portfolio Manishcad',
  description: 'Professional portfolio of a Full Stack Developer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense fallback={<p className="text-3xl text-center text-blue-700">Loading</p>}>
      <body className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        <Navbar />     
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
      </Suspense>
    </html>
  );
}
