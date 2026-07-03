import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'Manifesto',
  alternates: { canonical: '/manifesto' },
  description:
    'Great work deserves a great business. Why StayBookt exists, and the deal we make with the people who built something with their hands.',
};

const BELIEFS = [
  'Great work deserves a great business built around it.',
  'You should never have to become a tech person to run a modern business.',
  'The people who build with their hands are owed more than one more app to manage.',
  'A partner should only win when you win.',
  'Results do the bragging. We never claim what we have not done.',
];

function Block({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <section className="px-6 py-8 sm:px-12">
      <div
        className={`mx-auto max-w-3xl space-y-5 text-xl leading-relaxed sm:text-2xl ${
          accent ? 'text-white' : 'text-platinum-soft'
        }`}
      >
        {children}
      </div>
    </section>
  );
}

export default function ManifestoPage() {
  return (
    <>
      <TopNav active="manifesto" />
      <main className="bg-ink-deep">
        {/* Hero */}
        <section className="px-6 pt-36 pb-14 sm:px-12 sm:pt-44">
          <div className="mx-auto max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-elec-light">Our manifesto</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Great work deserves a <span className="text-brand-gradient">great business.</span>
            </h1>
          </div>
        </section>

        <Block>
          <p>You were sold a lie. That if you are good with your hands, show up early, and treat people right, the business will take care of itself.</p>
          <p>It will not. You know it in the quiet part of the night, when the phone is still buzzing, the quotes are still unsent, and the weekend is already gone.</p>
        </Block>

        <Block>
          <p>You are the best in the world at your craft, and the worst-served customer in the market. Everyone sells to you. Software hands you one more login. Agencies take a retainer and disappear. Nobody actually runs it for you.</p>
          <p>So you do. A king in a truck, answering your own phone at a red light, because if you do not, the job goes to the next guy.</p>
        </Block>

        <Block accent>
          <p>We built StayBookt to end that.</p>
          <p>Not another tool for you to run. We run it. The site, the phone, the calendar, the follow-up, the reviews, the customers you already earned. The whole front office, handled, whether you are on a roof or asleep.</p>
        </Block>

        <Block>
          <p>And we only make money when you do. A share of the new business we bring in. If the phone does not ring more, we have not earned a cent. We put our money next to yours.</p>
        </Block>

        <Block>
          <p>Because the point was never the business. The point was the life it was supposed to buy.</p>
          <p>A business that runs without you is an asset. Something you can sell, hand to your kids, or finally step back from to do the part you actually love. You gave it decades. It is time it gave something back.</p>
        </Block>

        {/* Beliefs */}
        <section className="px-6 py-16 sm:px-12">
          <div className="mx-auto max-w-4xl">
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-elec-light">What we believe</p>
            <ul className="space-y-5">
              {BELIEFS.map((b, i) => (
                <li key={i} className="flex gap-4 border-b border-white/10 pb-5">
                  <span className="font-display text-lg text-hvac-light">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl leading-snug tracking-tight text-white sm:text-2xl">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Close */}
        <section className="px-6 pb-28 pt-8 sm:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-3xl leading-snug tracking-tight text-white sm:text-4xl">
              To the ones who built it.<br />It is time it gave something back.
            </p>
            <p className="mt-8 font-display text-3xl tracking-tight">
              <span className="text-white">Stay</span>
              <span className="wordmark-gradient">Bookt</span>
              <span style={{ color: '#7C3AED' }}>.</span>{' '}
              <span className="text-brand-gradient">Enjoy Life.</span>
            </p>
            <div className="mt-10">
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-elec to-hvac px-8 py-4 text-base font-bold text-ink transition-transform hover:-translate-y-0.5"
              >
                Book a 30-minute call <span aria-hidden>{'→'}</span>
              </a>
            </div>
            <p className="mt-8">
              <Link href="/" className="text-sm font-semibold text-elec transition-colors hover:text-white">
                {'←'} Back home
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
