import { TopNav } from '@/components/TopNav';
import Hero from '@/components/Hero';
import Wordmark from '@/components/Wordmark';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxOrbs from '@/components/ParallaxOrbs';
import { MacBookFrame, IPhoneFrame } from '@/components/DeviceFrames';
import { IconFind, IconBook, IconStay } from '@/components/WorkIcons';
import { PreviewPill, ReceptionistScreen } from '@/components/PlatformPreview';
import { CAL_LINK, EMAIL, PHONE_DISPLAY, PHONE_HREF, TIERS } from '@/lib/site';
import Image from 'next/image';
import Link from 'next/link';

const SHARE_DESCRIPTION =
  'StayBookt builds and runs websites for service businesses up to $5M. We get you found, book the work, and keep the calendar full. Paid for by the results.';

export const metadata = {
  title: 'StayBookt. Enjoy Life.',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'StayBookt. Enjoy Life.',
    description: SHARE_DESCRIPTION,
    url: 'https://www.staybookt.com',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StayBookt. Enjoy Life.',
    description: SHARE_DESCRIPTION,
  },
};

const DEEP_GRAD: React.CSSProperties = {
  backgroundImage: 'linear-gradient(96deg, #0891B2 0%, #047857 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

/* Gradient accent for a headline phrase. deep = darker, for light/cream backgrounds. */
function Grad({ children, deep }: { children: React.ReactNode; deep?: boolean }) {
  if (deep) return <span style={DEEP_GRAD}>{children}</span>;
  return <span className="text-brand-gradient">{children}</span>;
}

export default function HomePage() {
  return (
    <main id="top" className="relative text-white scroll-stage">
      <ParallaxOrbs />
      <TopNav />

      <Hero />

      {/* WHY — the reality */}
      <Moment tone="cream">
        <Eyebrow tone="cream">If this sounds familiar</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          You are the best in town at the work.<br />You are also <Grad deep>everything else.</Grad>
        </h2>
        <p className="text-stone-600 text-base sm:text-lg mb-5 max-w-2xl leading-relaxed">
          Receptionist. Scheduler. Bookkeeper. The one who calls back at 9pm. The phone rings while you are under a sink or up a ladder, and half the time it goes to voicemail and the customer calls the next guy. The work is great. The business runs on you, and you are out of hours.
        </p>
        <p className="text-stone-900 text-lg sm:text-xl font-display tracking-tight max-w-2xl leading-snug">
          That is the part we take over.
        </p>
      </Moment>

      {/* WHAT — the work we ship */}
      <Moment tone="cream" id="work">
        <Eyebrow tone="cream">The work we ship</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-4 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Get found. Book the work. <Grad deep>Stay booked.</Grad>
        </h2>
        <p className="text-stone-600 text-base sm:text-lg mb-14 max-w-2xl leading-relaxed">
          The website is the front door. We build it, we run it, and we measure the new business that comes through it.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WorkColumn
            icon={<IconFind className="w-10 h-10" />}
            tag="Find"
            title="People find you first."
            body="A custom website built to rank, convert, and look like you actually do the work. Google Business Profile rebuilt. Service-area pages. Built mobile-first, because that is where your customers are."
          />
          <WorkColumn
            icon={<IconBook className="w-10 h-10" />}
            tag="Book"
            title="The call turns into a job."
            body="Form fills routed to your phone in seconds. A review request flow wired before launch. Missed-call recovery is on the roadmap, so fewer leads slip between the ring and the booked job."
          />
          <WorkColumn
            icon={<IconStay className="w-10 h-10" />}
            tag="Stay"
            title="The calendar stays full."
            body="Ongoing care keeps the site converting. Pages updated. Reviews flowing. Profile fresh. The back-office layer rolls in as we ship it, and you keep doing the work."
          />
        </div>
      </Moment>

      {/* WHAT — see it working */}
      <Moment tone="dark">
        <div className="flex items-center justify-between gap-4 mb-7">
          <Eyebrow tone="dark">See it working</Eyebrow>
          <PreviewPill />
        </div>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-4 max-w-3xl" style={{ fontSize: 'clamp(36px, 6vw, 76px)' }}>
          The front office, <Grad>running without you.</Grad>
        </h2>
        <p className="text-platinum-soft text-base sm:text-lg mb-10 max-w-2xl leading-relaxed">
          Every lead answered in seconds, in your voice. Jobs booked. Reviews chasing themselves. Your whole week summed up Monday morning. Here is one piece of it.
        </p>
        <div className="max-w-2xl">
          <ReceptionistScreen />
        </div>
        <Link href="/platform" className="inline-flex items-center gap-2 text-elec font-semibold text-sm mt-8 hover:gap-3 transition-all">
          Tour the whole platform <span aria-hidden>{'→'}</span>
        </Link>
      </Moment>

      {/* PROVE IT — real builds */}
      <Moment tone="cream">
        <Eyebrow tone="cream">Recent work</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-4 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Two builds. <Grad deep>Both live.</Grad>
        </h2>
        <p className="text-stone-600 text-sm sm:text-base mb-14 max-w-2xl leading-relaxed">
          Real sites for real owners, built and shipped.
        </p>
        <div className="space-y-10">
          <ClientCard
            eyebrow="Top Choice Electrical"
            name="Tim Ciszkowski"
            role="Residential electrician. 22 years on the tools, 6 on his own."
            location="Newmarket, Ontario"
            url="www.topchoiceelectrical.com"
            href="https://www.topchoiceelectrical.com"
            quote="My old site was prepared by a family member and existed, but that was it. I never received leads from it. The new one looks like the business I want to be and is giving me instant credibility. StayBookt has given me a partner to grow with."
            statusBadge="Live"
            frameType="macbook"
          />
          <ClientCard
            eyebrow="XNL HR & Communications"
            name="Evert Akkerman, CHRL, LL.M."
            role="Fractional HR practice. Founded 2012. 25+ years in Canadian HR."
            location="Newmarket, Ontario"
            url="www.xnlhr.com"
            href="https://www.xnlhr.com"
            quote="The new site tells the XNL story the way I have been trying to tell it for ten years. Working with Jacob and the StayBookt team was very easy and enjoyable. They were clearly invested in building me an impactful website that would allow me to achieve my goals."
            statusBadge="Live"
            reverse
            frameType="iphone"
          />
        </div>
      </Moment>

      {/* Executive results, affordable */}
      <section className="relative px-6 sm:px-12 py-24 sm:py-32 bg-ink-deep">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <Eyebrow tone="dark">Executive results, affordable</Eyebrow>
            <h2 className="font-display tracking-[-0.035em] leading-[1.0] mb-10" style={{ fontSize: 'clamp(36px, 6vw, 76px)' }}>
              Executive results you can <span className="text-brand-gradient">actually afford.</span>
            </h2>
            <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Big companies hire a Chief Revenue Officer to keep the customer journey connected end to end, and pay half a million dollars a year for that role plus a team behind it. Most service-business owners cannot afford a single one of those hires. But you can afford StayBookt. We deliver the same system, built and run by us, paid for by the results. Whether you have got two trucks or two laptops.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* COST — how we get paid */}
      <Moment tone="cream" id="pricing">
        <Eyebrow tone="cream">How we get paid</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-4xl text-stone-900" style={{ fontSize: 'clamp(38px, 6.4vw, 84px)' }}>
          Finally, a company that only makes money <Grad deep>when you do.</Grad>
        </h2>
        <p className="text-stone-600 text-base sm:text-lg mb-12 max-w-2xl leading-relaxed">
          A fee to build it, a flat monthly to run it, and a small share of the new business we actually bring you. If we do not grow your revenue, we do not earn the last line. The more of your business we run, the less it costs to start.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.name} className={`rounded-2xl border p-6 ${t.recommended ? 'border-emerald-300 bg-emerald-50' : 'border-stone-200 bg-white'}`}>
              <div className="flex items-center justify-between mb-1">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-stone-500">{t.scope}</p>
                {t.recommended && <span className="font-mono text-[9px] tracking-[0.14em] uppercase font-bold text-emerald-700">Most popular</span>}
              </div>
              <h3 className="font-display text-2xl tracking-tight leading-none text-stone-900 mb-3">{t.name}</h3>
              <p className="font-display text-xl tracking-tight text-stone-900">{t.upfront} <span className="text-stone-500 text-sm">{t.upfrontNote}</span></p>
              <p className="text-stone-600 text-sm mt-1 leading-snug">
                {t.recurring ? `+ ${t.recurring} + ${t.commission} of new online sourced business` : 'No monthly. Yours to keep.'}
              </p>
            </div>
          ))}
        </div>

        <Link href="/pricing" className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm mt-8 hover:gap-3 transition-all">
          See what is in each tier <span aria-hidden>{'→'}</span>
        </Link>
        <p className="text-stone-500 text-xs mt-6">All prices in CAD, plus applicable taxes. The 5% is only on new online sourced business, measured and agreed up front.</p>
      </Moment>

      {/* WHO (you work with) — thin teaser */}
      <section className="relative bg-ink-deep px-6 sm:px-12 py-14">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.32em] uppercase font-bold text-elec mb-2">Who you work with</p>
              <p className="font-display text-2xl sm:text-3xl tracking-tight text-white leading-snug max-w-2xl">
                Two founders, no layers. You talk to one of us on day one and every day after.
              </p>
            </div>
            <Link href="/about" className="shrink-0 inline-flex items-center gap-2 text-elec font-semibold text-sm hover:gap-3 transition-all">
              Meet Jacob and Richard <span aria-hidden>{'→'}</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Book the call */}
      <Moment tone="dark" id="book">
        <Eyebrow tone="dark">Start</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-10 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          <Grad>Book the call.</Grad>
        </h2>
        <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="group block bg-paper/[0.03] border border-divider/60 hover:border-elec/40 rounded-2xl p-8 sm:p-12 transition-colors max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-elec">30 minutes with a founder</p>
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2 py-0.5">Free</span>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-4">Tell us about your business.</h3>
          <p className="text-platinum-soft text-base leading-relaxed mb-7">We walk through what you do, who you serve, what is broken, and what we would build. No pitch deck. No homework. If it is a fit, a proposal goes out the next day.</p>
          <span className="inline-flex items-center gap-2 text-elec font-semibold text-sm">
            Pick a time
            <span aria-hidden className="group-hover:translate-x-1 transition-transform">{'→'}</span>
          </span>
        </a>
        <p className="text-mute text-sm mt-6">
          Or email <a href={`mailto:${EMAIL}`} className="text-platinum-soft hover:text-white transition-colors">{EMAIL}</a>
          {PHONE_DISPLAY && PHONE_HREF ? (
            <>{' '}or call or text <a href={PHONE_HREF} className="text-platinum-soft hover:text-white transition-colors">{PHONE_DISPLAY}</a></>
          ) : null}
          {' '}if a call does not work.
        </p>
      </Moment>

      {/* Questions */}
      <Moment tone="dark" id="faq">
        <Eyebrow tone="dark">Questions</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-14 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Read this <Grad>before you click.</Grad>
        </h2>
        <div className="space-y-3 max-w-4xl">
          <Faq question="What if I want to cancel?">You cancel any month after the minimum. We hand you the website code, the Google Business Profile login, the customer list, and the review request keys. No locked-in dependencies.</Faq>
          <Faq question="What if you go out of business?">Your domain is registered to you. Your website lives under your own account. Your Google Business Profile is yours. Your customer list is yours. If we vanish, you keep everything that matters.</Faq>
          <Faq question="Can I just buy the website without the monthly?">Yes, that is the Get Found tier: a one-time build, yours to keep. A site without care drifts over time, which is what the monthly tiers prevent, but the choice is yours.</Faq>
          <Faq question="How exactly do you count new business?">Form fills tagged at the source. Calls tracked through your Google Business Profile. New customers reconciled against your existing book so we never double-count. The report goes out every month before the invoice.</Faq>
          <Faq question="What about the back-office platform you mention?">It is on the roadmap, rolling out through 2026 for our first clients. Booking, follow-up, review flow, the Monday brief. The Stay Booked tier turns each piece on as it ships. The website is what you pay for today.</Faq>
        </div>
        <p className="text-mute text-xs sm:text-sm mt-10 leading-relaxed">Have more? Bring them to the call.</p>
      </Moment>

      <FooterBlock />
    </main>
  );
}

/* Helpers */

function Moment({ children, tone, id }: { children: React.ReactNode; tone: 'dark' | 'cream'; id?: string }) {
  const bg = tone === 'cream' ? 'bg-stone-50' : 'bg-ink-deep';
  const textColor = tone === 'cream' ? 'text-stone-900' : 'text-white';
  const scrollMt = id ? 'scroll-mt-24' : '';
  return (
    <section id={id} className={`relative px-6 sm:px-12 py-16 sm:py-24 ${scrollMt} ${bg} ${textColor}`}>
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">{children}</div>
      </ScrollReveal>
    </section>
  );
}

function Eyebrow({ children, tone }: { children: React.ReactNode; tone: 'cream' | 'dark' }) {
  const color = tone === 'cream' ? 'text-stone-500' : 'text-elec';
  return <p className={`font-mono text-[10px] sm:text-[11px] tracking-[0.32em] uppercase font-bold mb-7 ${color}`}>{children}</p>;
}

function WorkColumn({ icon, tag, title, body }: { icon?: React.ReactNode; tag: string; title: string; body: string }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-7 sm:p-8 h-full hover-lift">
      {icon && <div className="mb-5">{icon}</div>}
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-emerald-700 mb-3">{tag}</p>
      <h3 className="font-display text-xl sm:text-2xl tracking-tight leading-tight mb-3 text-stone-900">{title}</h3>
      <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{body}</p>
    </div>
  );
}

function Faq({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <details className="group bg-paper/[0.03] border border-divider/60 hover:border-divider rounded-2xl overflow-hidden transition-colors">
      <summary className="cursor-pointer list-none px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-5">
        <h3 className="font-display text-lg sm:text-xl tracking-tight leading-snug">{question}</h3>
        <span className="text-elec text-2xl font-light transition-transform group-open:rotate-45 shrink-0 leading-none" aria-hidden>+</span>
      </summary>
      <div className="px-6 sm:px-8 pb-6 sm:pb-7 text-platinum-soft text-base leading-relaxed">{children}</div>
    </details>
  );
}

function ClientCard({
  eyebrow, name, role, location, url, href, quote, reverse, frameType, statusBadge,
}: {
  eyebrow: string; name: string; role: string; location: string; url: string;
  href: string; quote: string; reverse?: boolean; frameType?: 'macbook' | 'iphone'; statusBadge?: string;
}) {
  const isMac = frameType === 'macbook';
  const isPhone = frameType === 'iphone';
  const deviceWrap = ['relative bg-stone-100', isMac ? 'lg:col-span-3 flex flex-col justify-center p-5 sm:p-6' : 'lg:col-span-2 flex items-center justify-center py-10 sm:py-14'].join(' ');
  const macIframeCls = 'border-0 pointer-events-none [width:1400px] [height:900px] [transform-origin:top_left] [transform:scale(0.36)] sm:[transform:scale(0.45)] xl:[transform:scale(0.55)]';

  const deviceCol = (
    <div className={deviceWrap}>
      {/* Branded fallback sits behind the iframe so a blocked/blank frame still shows something */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-0">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-stone-400 mb-2">{eyebrow}</p>
        <p className="font-display text-lg text-stone-500">{url}</p>
      </div>
      {isMac && (
        <MacBookFrame>
          <iframe src={href} title={`${name} live site`} loading="lazy" sandbox="allow-same-origin allow-scripts allow-popups" className={macIframeCls} />
        </MacBookFrame>
      )}
      {isPhone && (
        <div className="w-full max-w-[260px]">
          <IPhoneFrame>
            <iframe src={href} title={`${name} live site`} loading="lazy" sandbox="allow-same-origin allow-scripts allow-popups" className="border-0 pointer-events-none" style={{ width: '430px', height: '900px', transformOrigin: 'top left', transform: 'scale(0.56)' }} />
          </IPhoneFrame>
        </div>
      )}
      <div className="absolute bottom-3 left-3 z-30 px-2.5 py-1 rounded-md bg-stone-900/85 backdrop-blur-sm border border-stone-700 text-[10px] tracking-[0.18em] uppercase font-semibold text-emerald-300">Live</div>
    </div>
  );

  const textCol = (
    <div className={`${isMac ? 'lg:col-span-2' : 'lg:col-span-3'} p-7 sm:p-10`}>
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-stone-500">{eyebrow}</p>
        <span className="text-xs font-semibold text-stone-500">{url}</span>
      </div>
      <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-2 text-stone-900">{name}</h3>
      <p className="text-stone-600 text-sm sm:text-base mb-1">{role}</p>
      <p className="text-stone-500 text-sm mb-5">{location}</p>
      {statusBadge && (
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-6">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold text-emerald-700">{statusBadge}</p>
        </div>
      )}
      <blockquote className="border-l-2 border-emerald-600 pl-5">
        <p className="text-stone-800 text-base sm:text-lg italic leading-snug">{'“'}{quote}{'”'}</p>
      </blockquote>
    </div>
  );

  return (
    <article className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-lg">
      {reverse ? <>{textCol}{deviceCol}</> : <>{deviceCol}{textCol}</>}
    </article>
  );
}

function FooterBlock() {
  return (
    <footer className="px-6 sm:px-12 py-16 border-t border-divider/40 bg-ink-deep">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-12">
            <div>
              <Wordmark size="sm" onDark />
              <p className="text-mute text-sm mt-3 max-w-md leading-relaxed">Get found. Get booked. Stay booked. Built and run for service businesses up to $5M.</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-3">
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="text-platinum hover:text-white text-sm font-semibold transition-colors">Book a 30-minute call</a>
              <a href={`mailto:${EMAIL}`} className="text-mute hover:text-platinum-soft text-sm transition-colors">{EMAIL}</a>
            </div>
          </div>
          <FooterBottomRow />
        </div>
      </ScrollReveal>
    </footer>
  );
}

function FooterBottomRow() {
  const wrap = 'pt-8 border-t border-divider/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-mute';
  const linkRow = 'flex flex-wrap items-center gap-x-6 gap-y-2';
  const linkCls = 'hover:text-platinum-soft transition-colors';
  return (
    <div className={wrap}>
      <div className={linkRow}>
        <Link href="/how-it-works" className={linkCls}>How it works</Link>
        <Link href="/platform" className={linkCls}>Platform</Link>
        <Link href="/work" className={linkCls}>Proof</Link>
        <Link href="/is-this-for-me" className={linkCls}>Is it for me?</Link>
        <Link href="/pricing" className={linkCls}>Pricing</Link>
        <Link href="/about" className={linkCls}>About</Link>
      </div>
      <p>{'©'} 2026 StayBookt Inc. Toronto, ON.</p>
    </div>
  );
}
