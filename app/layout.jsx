import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import './globals.css';

const bricolage = localFont({
  src: [
    { path: './fonts/bricolage-grotesque-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/bricolage-grotesque-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/bricolage-grotesque-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/bricolage-grotesque-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: './fonts/bricolage-grotesque-latin-800-normal.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
});
const instrumentSans = localFont({
  src: [
    { path: './fonts/instrument-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/instrument-sans-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});
const jetbrainsMono = localFont({
  src: [
    { path: './fonts/jetbrains-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/jetbrains-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/jetbrains-mono-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khamseaffan.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Affan Khamse - AI Engineer',
    template: '%s | Affan Khamse',
  },
  description:
    'Portfolio and blog of Affan Khamse - AI Engineer specializing in backend systems, AI/ML, and cloud architecture.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Affan Khamse',
    title: 'Affan Khamse - AI Engineer',
    description:
      'Portfolio and blog of Affan Khamse - AI Engineer specializing in backend systems, AI/ML, and cloud architecture.',
  },
  twitter: {
    card: 'summary',
    title: 'Affan Khamse - AI Engineer',
    description:
      'Portfolio and blog of Affan Khamse - AI Engineer specializing in backend systems, AI/ML, and cloud architecture.',
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
