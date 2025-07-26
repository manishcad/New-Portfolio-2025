import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Suspense } from "react";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'Manish Chand - Full Stack Developer Portfolio',
    template: '%s | Manish Chand'
  },
  description: 'Professional Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my projects, skills, and get in touch for collaboration.',
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'JavaScript Developer',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'Node.js Developer',
    'Portfolio',
    'Manish Chand',
    'manishcad'

  ],
  authors: [{ name: 'Manish Chand' }],
  creator: 'Manish Chand',
  publisher: 'Manish Chand',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://manishcad.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://manishcad.vercel.app',
    title: 'Manish Chand - Full Stack Developer Portfolio',
    description: 'Professional Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my projects, skills, and get in touch for collaboration.',
    siteName: 'Manish Chand Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Manish Chand - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manish Chand - Full Stack Developer Portfolio',
    description: 'Professional Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.',
    images: ['/og-image.jpg'],
    creator: '@manishcad',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google38aa628ca55142a5',
    // yandex: 'your-actual-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Manish Chand - Full Stack Developer Portfolio</title>
        <meta name="description" content="Professional Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my projects, skills, and get in touch for collaboration." />
        <meta name="keywords" content="Full Stack Developer, React Developer, Next.js Developer, JavaScript Developer, Web Developer, Frontend Developer, Backend Developer, Node.js Developer, Portfolio, Manish Chand, manishcad" />
        <meta name="author" content="Manish Chand" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="google38aa628ca55142a5" />

        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Manish Chand",
              "jobTitle": "Full Stack Developer",
              "description": "Professional Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies",
              "url": "https://manishcad.vercel.app",
              "sameAs": [
                "https://github.com/manishcad",
                "https://linkedin.com/in/manish-chand-3b7b4a158/"
              ],
              "image": "https://manishcad.vercel.app/profile.jpg",
              "email": "manishtochand@gmail.com",
              "knowsAbout": [
                "React",
                "Next.js",
                "Node.js",
                "JavaScript",
                "TypeScript",
                "PostgreSQL",
                "Prisma",
                "Tailwind CSS"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              }
            })
          }}
        />
      </head>
      <Suspense fallback={<p className="text-3xl text-center text-blue-700">Loading</p>}>
      
      <body lang="en" className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        
        <Navbar />     
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
      </Suspense>
    </html>
  );
}
