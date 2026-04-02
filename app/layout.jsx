import { ThemeProvider } from '@/components/ui/ThemeProvider';
import '@fontsource/inter';
import './globals.css';

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
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
