export const metadata = {
  title: 'Contact Me',
  description: 'Get in touch with Manish Chand for web development projects, collaboration opportunities, or just to say hello. Available for freelance work and full-time positions.',
  keywords: [
    'Contact Manish Chand',
    'Hire Web Developer',
    'Freelance Developer',
    'React Developer for Hire',
    'Next.js Developer',
    'Web Development Services',
    'Collaboration'
  ],
  openGraph: {
    title: 'Contact Manish Chand - Full Stack Developer',
    description: 'Get in touch with Manish Chand for web development projects, collaboration opportunities, or just to say hello.',
    url: 'https://manishcad.vercel.app/contact',
    images: [
      {
        url: '/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Manish Chand',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Manish Chand - Full Stack Developer',
    description: 'Get in touch with Manish Chand for web development projects, collaboration opportunities, or just to say hello.',
  },
}

export default function ContactLayout({ children }) {
  return children
} 