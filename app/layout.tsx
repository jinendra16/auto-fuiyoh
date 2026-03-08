import type { Metadata } from 'next';
import { Syne, DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const syne = Syne({ subsets: ['latin'], variable: '--font-display', weight: ['400', '600', '700', '800'] });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });
const spaceMono = Space_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Auto-Fuiyoh | AI Marketing for Malaysian F&B',
  description: "Transform your stall's marketing in 5 minutes with AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body
        className="font-sans bg-[--dark] text-[--cream] min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <header className="w-full px-8 py-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="font-display font-extrabold text-xl tracking-tight text-[--orange]">AUTO-FUIYOH</span>
            <span className="font-mono text-[10px] text-[--text-muted] border border-[--text-muted]/30 px-1.5 py-0.5 rounded">BETA</span>
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-[--text-muted]">
            <a href="#" className="hover:text-[--cream] transition-colors">How it Works</a>
            <a href="#" className="hover:text-[--cream] transition-colors">Examples</a>
          </nav>
        </header>
        <main className="flex-1 w-full flex flex-col">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <footer className="w-full p-6 text-center text-sm text-[--text-muted] border-t border-white/5 mt-auto">
          &copy; {new Date().getFullYear()} Auto-Fuiyoh. Built for Malaysian F&B SMEs.
        </footer>
      </body>
    </html>
  );
}
