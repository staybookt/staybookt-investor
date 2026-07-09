import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import HowItWorks from '@/components/v4/HowItWorks';

export const metadata = {
  title: 'How it works | StayBookt',
  description:
    'Not a tool you learn. An operator that runs the front of your business: your website, an AI receptionist, booking, CRM, quotes, reviews, and a daily brief. Here is exactly how it runs, step by step.',
  alternates: { canonical: '/how-it-works' },
};

export default function HowItWorksPage() {
  return (
    <main id="top" className="v4">
      <Nav />
      <HowItWorks />
      <SiteFooter />
    </main>
  );
}
