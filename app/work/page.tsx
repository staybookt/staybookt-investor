import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import WorkShowcase from '@/components/v4/WorkShowcase';

export const metadata = {
  title: 'The work | StayBookt',
  alternates: { canonical: '/work' },
  description:
    'See the difference. The same owner-operated business, before and after StayBookt: a tired, dated website rebuilt into one that makes the phone ring. Drag to compare.',
};

export default function WorkPage() {
  return (
    <main id="top" className="v4">
      <Nav />
      <WorkShowcase />
      <SiteFooter />
    </main>
  );
}
