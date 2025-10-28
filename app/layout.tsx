import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: "subsapp — Track & cut subscription waste",
  description: "All your subscriptions in one place. Stop overpaying, spot duplicates, and stay on top of renewals.",
};

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-app`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
