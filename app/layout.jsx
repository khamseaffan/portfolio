import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khamseaffan.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Affan Khamse - Software Engineer',
    template: '%s | Affan Khamse',
  },
  description:
    'Portfolio and blog of Affan Khamse - Software Engineer specializing in backend systems, AI/ML, and cloud architecture.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Affan Khamse',
    title: 'Affan Khamse - Software Engineer',
    description:
      'Portfolio and blog of Affan Khamse - Software Engineer specializing in backend systems, AI/ML, and cloud architecture.',
  },
  twitter: {
    card: 'summary',
    title: 'Affan Khamse - Software Engineer',
    description:
      'Portfolio and blog of Affan Khamse - Software Engineer specializing in backend systems, AI/ML, and cloud architecture.',
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme:dark)').matches;var t=s||(p?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark')})()`,
          }}
        />
      </head>
      <body className={`${bricolage.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
