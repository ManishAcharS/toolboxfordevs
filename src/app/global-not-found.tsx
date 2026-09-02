import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import '@/styles/globals.css';
import { SearchX, Wrench, Search, Home } from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: '404 - Page Not Found | Toolbox for Devs',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="border-border text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
            <span className="bg-primary relative mr-0.5 flex h-2 w-2">
              <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
            </span>
            404 · Page not found
          </span>
          <div className="mt-6 flex items-center justify-center">
            <SearchX className="text-primary h-10 w-10" aria-hidden="true" />
          </div>
          <h1 className="text-foreground mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            This page doesn&apos;t exist
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-lg text-pretty">
            The page you are looking for has been moved or never existed. Check the URL or use
            search to find the developer tool you need.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tools"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              <Wrench className="h-4 w-4" aria-hidden="true" />
              Browse all tools
            </Link>
            <Link
              href="/search"
              className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Search
            </Link>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
