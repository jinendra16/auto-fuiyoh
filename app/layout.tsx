import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Auto-Fuiyoh | AI Marketing for Malaysian F&B',
  description: 'Transform your stall\'s marketing in 5 minutes with AI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans bg-[#1A1A2E] text-white min-h-screen flex flex-col" suppressHydrationWarning>
        <header className="w-full p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold text-[#E8470A]">⚡ Auto-Fuiyoh</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-white transition-colors">How it Works</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Examples</a>
          </nav>
        </header>
        <main className="flex-1 w-full max-w-7xl mx-auto p-6 flex flex-col">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <footer className="w-full p-6 text-center text-sm text-gray-500 border-t border-white/10 mt-auto">
          &copy; {new Date().getFullYear()} Auto-Fuiyoh. Built for Malaysian F&B SMEs.
        </footer>
      </body>
    </html>
  );
}
