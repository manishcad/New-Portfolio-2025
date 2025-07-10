import Image from "next/image";
import HomePage from "./components/Homepage";

export const metadata = {
  title: 'Home',
  description: 'Welcome to my portfolio! I\'m Manish Chand, a passionate Full Stack Developer specializing in React, Next.js, and modern web technologies. Explore my projects and skills.',
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Web Development',
    'JavaScript Developer',
    'Portfolio',
    'Manish Chand'
  ],
  openGraph: {
    title: 'Manish Chand - Full Stack Developer Portfolio',
    description: 'Welcome to my portfolio! I\'m Manish Chand, a passionate Full Stack Developer specializing in React, Next.js, and modern web technologies.',
    url: 'https://manishcad.vercel.app',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Manish Chand - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manish Chand - Full Stack Developer Portfolio',
    description: 'Welcome to my portfolio! I\'m Manish Chand, a passionate Full Stack Developer specializing in React, Next.js, and modern web technologies.',
  },
}

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
