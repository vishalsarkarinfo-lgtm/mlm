import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'ApexMLM | Enterprise MLM & Referral Network Platform',
  description: 'Next-generation professional MLM platform with public website, member dashboard, genealogy tree, unilevel commission engine, wallet system, and admin controls.',
  openGraph: {
    title: 'ApexMLM | Enterprise MLM Platform',
    description: 'Next-generation professional MLM platform with public website, member dashboard, genealogy tree, unilevel commission engine, wallet system, and admin controls.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexMLM | Enterprise MLM Platform',
    description: 'Next-generation professional MLM platform with public website, member dashboard, genealogy tree, unilevel commission engine, wallet system, and admin controls.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
