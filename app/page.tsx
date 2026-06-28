import { TopNav } from '@/components/TopNav';
import Hero from '@/components/Hero';
import Wordmark from '@/components/Wordmark';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxOrbs from '@/components/ParallaxOrbs';
import { MacBookFrame, IPhoneFrame } from '@/components/DeviceFrames';
import { CAL_LINK, EMAIL, PHONE_DISPLAY, PHONE_HREF, PRICING } from '@/lib/site';
import Image from 'next/image';
import Link from 'next/link';

const SHARE_DESCRIPTION =
  'StayBookt builds and runs websites for Ontario service businesses under $1M. We get you found, book the work, and keep the calendar full. Paid for by the results.';

export const metadata = {
  title: 'Get Found. StayBookt.',
  description: SHARE_DESCRIPTION,
  openGraph: {
    title: 'Get Found. StayBookt.',
    description: SHARE_DESCRIPTION,
    url: 'https://www.staybookt.com',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Found. StayBookt.',
    description: SHARE_DESCRIPTION,
  },
};

export default function HomePage() {
  return (
    <main id="top" className="relative text-white scroll-stage">
      <ParallaxOrbs />
      <TopNav />

      <Hero />

      {/* S2 - The work we ship */}
      <Moment tone="cream" id="work">
        <Eyebrow tone="cream">The work we ship</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-4 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Get found. Book the work. Stay booked.
        </h2>
        <p className="text-stone-600 text-base sm:text-lg mb-14 max-w-2xl leading-relaxed">
          The website is the front door. We build it, we run it, and we measure the new business that comes through it.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WorkColumn
            tag="Find"
            title="People find you first."
            body="A custom website built to rank, convert, and look like you actually do the work. Google Business Profile rebuilt. Service-area pages. Built mobile-first, because that is where your customers are."
          />
          <WorkColumn
            tag="Book"
            title="The call turns into a job."
            body="Form fills routed to your phone in seconds. A review request flow wired before launch. Missed-call recovery is on the roadmap, so fewer leads slip between the ring and the booked job."
          />
          <WorkColumn
            tag="Stay"
            title="The calendar stays full."
            body="Ongoing care keeps the site converting. Pages updated. Reviews flowing. Profile fresh. The back-office layer rolls in as we ship it, and you keep doing the work."
          />
        </div>
      </Moment>

      {/* S3 - Real builds */}
      <Moment tone="cream">
        <Eyebrow tone="cream">Recent work</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-4 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Two builds. Both live.
        </h2>
        <p className="text-stone-600 text-sm sm:text-base mb-14 max-w-2xl leading-relaxed">
          Real sites for real owners, built and shipped. Click either one to open it in a new tab.
        </p>
        <div className="space-y-10">
          {/* NOTE: build quotes below are placeholders approved by Jacob. Swap for real client quotes when available. No outcome stats until pilots produce real numbers. */}
          <ClientCard
            eyebrow="Top Choice Electrical"
            name="Tim Ciszko"
            role="Residential electrician. 22 years on the tools, 6 on his own."
            location="Newmarket, Ontario"
            url="www.topchoiceelectrical.com"
            href="https://www.topchoiceelectrical.com"
            quote="My old site was three pages of stock photos. The new one looks like the business I actually run. People show up to the first call already knowing who I am."
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
            quote="The new site tells the XNL story the way I have been trying to tell it for ten years. The intake calls after launch came in better prepared."
            statusBadge="Live"
            reverse
            frameType="iphone"
          />
        </div>
      </Moment>

      {/* S4 - How we get paid */}
      <Moment tone="cream" id="pricing">
        <Eyebrow tone="cream">How we get paid</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          We do not get paid until you do.
        </h2>
        <p className="text-stone-600 text-base sm:text-lg mb-14 max-w-2xl leading-relaxed">
          A small fee to build it. A low monthly to keep it running. The rest is a share of the new business the site actually brings you. If it does not bring you anything, we do not earn the third line.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <PriceCell amount={PRICING.build} detail="One-time build fee. Due at kickoff. About three weeks to launch." />
          <PriceCell amount={`${PRICING.care} a month`} detail="Ongoing care. Cancel any month, and take everything with you." />
          <PriceCell amount={PRICING.performance} detail="On new business the site brings in. The report goes out monthly, before the invoice." highlight />
        </div>

        <div className="bg-stone-100 border border-stone-200 rounded-xl p-5 max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-stone-500 mb-2">How we track new business</p>
          <p className="text-stone-700 text-sm leading-relaxed">
            Form fills tagged at submission. Calls tracked through your Google Business Profile. New customers reconciled against your existing pipeline so we never double-count. You see exactly what we count. The report goes out every month before the invoice.
          </p>
        </div>
        <p className="text-stone-500 text-xs mt-6">All prices in CAD. Built for Ontario operators.</p>
      </Moment>

      {/* S5 - Who this is for */}
      <Moment tone="cream">
        <Eyebrow tone="cream">Who this is for</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-14 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Be honest about the fit.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FitList
            heading="A fit if"
            tone="yes"
            items={[
              'You do under $1M and you own the business.',
              'The phone still rings to you.',
              'You are great at the work, but the pipeline leaks.',
              'You want it handled, not taught.',
            ]}
          />
          <FitList
            heading="Not a fit if"
            tone="no"
            items={[
              'You are doing $5M or more.',
              'You already have a marketing manager.',
              'You want one more tool to log into.',
              'You want a course, not an operator.',
            ]}
          />
        </div>
      </Moment>

      {/* S6 - The founders */}
      <Moment tone="cream">
        <Eyebrow tone="cream">The founders</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Two people. No layers.
        </h2>
        <p className="text-stone-600 text-base sm:text-lg mb-14 max-w-2xl leading-relaxed">
          One saw the gap from the outside, working alongside owners. The other saw it from the inside, running the discipline at scale. You talk to a founder on day one and every day after.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FounderCard
            photo="/photos/jacob.jpg"
            name="Jacob Charendoff"
            role="Co-founder · Builder"
            lens="The outside view"
            bio="A decade alongside service-business owners across health, hospitality, software, retail, and home services. The same conversation every time: the owner is brilliant at the work, the work is good, and the pipeline leaks. He builds the system from the outside in."
          />
          <FounderCard
            photo="/photos/richard.jpg"
            name="Richard Roos, CPA"
            role="Co-founder · Operator"
            lens="The inside view"
            bio="Two decades inside operationally rigorous service businesses at scale. Multifamily real estate across North America, hospital foundation oversight, and audit work across hundreds of growing companies. Twenty years a CPA. He brings the discipline that gets enterprise outcomes."
          />
        </div>
        <p className="text-stone-700 text-lg sm:text-xl leading-relaxed mt-12 max-w-3xl font-display tracking-tight">
          The system they both wished existed, for the people they kept running into.
        </p>
      </Moment>

      {/* S7 - Executive results, affordable */}
      <section className="relative px-6 sm:px-12 py-24 sm:py-32 bg-ink-deep">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <Eyebrow tone="dark">Executive results, affordable</Eyebrow>
            <h2 className="font-display tracking-[-0.035em] leading-[1.0] mb-10" style={{ fontSize: 'clamp(36px, 6vw, 76px)' }}>
              Executive results you can <span className="text-brand-gradient">actually afford.</span>
            </h2>
            <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Big companies hire a Chief Revenue Officer to keep the customer journey connected end to end. They pay half a million dollars a year for that role, plus a team behind it. Most service-business owners cannot afford a single one of those hires. They can afford StayBookt. We deliver the same system, built and run by us, paid for by the results. Whether you have got two trucks or two laptops.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* S8 - What's next (RevOps preview) */}
      <Moment tone="dark">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1 mb-6">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden />
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold text-amber-300">Rolling out 2026</p>
        </div>
        <Eyebrow tone="dark">What is next</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-4 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          The back office is the next layer.
        </h2>
        <p className="text-platinum-soft text-base sm:text-lg mb-14 max-w-3xl leading-relaxed">
          The website captures the leads. The back office converts them, then brings them back. As each layer ships, your monthly grows into the full operating system, and the work it takes off your plate grows with it. Here is where it is headed.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="flex flex-col">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-amber-300 mb-3">Concept · Monday brief</p>
            <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight mb-5 text-white">Your week in one email.</h3>
            <div className="bg-ink-deep/80 border border-divider/60 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-ink-soft/60 px-5 py-4 border-b border-divider/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-elec/40 to-plumb/40 flex items-center justify-center text-xs font-bold text-white shrink-0">S</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold leading-tight">StayBookt</p>
                    <p className="text-mute text-[10px] leading-tight">to the owner</p>
                  </div>
                  <p className="text-mute text-[10px] whitespace-nowrap">Mon 7:02 a.m.</p>
                </div>
                <p className="text-platinum text-sm font-display tracking-tight">Your week, rolled up</p>
              </div>
              <div className="p-5 sm:p-6 space-y-5">
                <p className="text-platinum text-sm leading-relaxed">Here is what last week looked like.</p>
                <div className="grid grid-cols-2 gap-2.5">
                  <Metric label="New leads" value="7" detail="3 web, 4 Google" />
                  <Metric label="Booked jobs" value="4" detail="avg ticket $640" />
                  <Metric label="Revenue" value="$2,840" detail="up from $2,180" trend="up" />
                  <Metric label="New reviews" value="2" detail="5.0 stars" />
                </div>
                <div className="bg-elec/5 border border-elec/20 rounded-lg p-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-elec mb-2">What changed</p>
                  <p className="text-platinum-soft text-xs leading-relaxed">Your service-area page drew more views than the week before, and two of last week&apos;s bookings landed there first. One quote from nine days ago is still open. We are following up this morning.</p>
                </div>
                <p className="text-mute text-[11px] leading-relaxed">Reply if anything looks off. Next roll-up Monday at 7 a.m.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-amber-300 mb-3">Concept · Review request</p>
            <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight mb-5 text-white">Reviews while the work is fresh.</h3>
            <div className="bg-ink-deep/80 border border-divider/60 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-ink-soft/60 px-5 py-4 border-b border-divider/40 flex items-center justify-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-mute-dark/60 flex items-center justify-center text-xs font-bold text-platinum">P</div>
                <div>
                  <p className="text-platinum text-xs font-semibold leading-tight">Patricia, Stonehaven Lane</p>
                  <p className="text-mute text-[10px] leading-tight">Today, 4:18 p.m.</p>
                </div>
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex justify-end"><div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[88%]"><p className="text-[13px] leading-relaxed">Hi Patricia, the work wrapped up just after 4. Receipt is in your email.</p><p className="text-[13px] leading-relaxed mt-2">If you have 20 seconds, would you mind dropping a quick Google review?</p></div></div>
                <div className="flex justify-start"><div className="bg-divider/40 text-platinum rounded-2xl rounded-tl-md px-4 py-3 max-w-[88%]"><p className="text-[13px] leading-relaxed">All done, looks great. Will do, that was a fast turnaround.</p></div></div>
                <div className="pt-4 mt-2 border-t border-divider/40 flex items-center gap-2.5">
                  <div className="flex items-center gap-0.5 text-emerald-400 text-xs"><span aria-hidden>{'★★★★★'}</span></div>
                  <p className="text-emerald-400 text-xs font-medium">5 stars, posted minutes later.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-mute text-[11px] leading-relaxed max-w-3xl mt-10">
          Concept previews of where the platform is headed. Also on the roadmap: an AI receptionist for missed calls, automated quote follow-up, and an integrated booking calendar. None of them ship today. The website is what you pay for now.
        </p>
      </Moment>

      {/* S9 - Questions */}
      <Moment tone="dark" id="faq">
        <Eyebrow tone="dark">Questions</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-14 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Read this before you click.
        </h2>
        <div className="space-y-3 max-w-4xl">
          <Faq question="What if I want to cancel?">You cancel any month. We hand you the website code, the Google Business Profile login, the customer list, and the review request keys. No locked-in dependencies.</Faq>
          <Faq question="What if you go out of business?">Your domain is registered to you. Your website lives under your own account. Your Google Business Profile is yours. Your customer list is yours. If we vanish, you keep everything that matters.</Faq>
          <Faq question="Can I just buy the website without the monthly?">You can, but a site without care drifts. The profile goes stale, review requests stop, page speed slips. After a year, an unmaintained site is about as useful as no site. The monthly is what stops that.</Faq>
          <Faq question="How exactly do you count new business?">Form fills tagged at the source. Calls tracked through your Google Business Profile. New customers reconciled against your existing pipeline so we never double-count. The report goes out every month before the invoice.</Faq>
          <Faq question="What about the back-office platform you mention?">It is on the roadmap, rolling out through 2026 for our first clients. Booking, follow-up, review flow, the Monday brief. Pricing for each layer gets set as it ships. The website is what you pay for today.</Faq>
        </div>
        <p className="text-mute text-xs sm:text-sm mt-10 leading-relaxed">Have more? Bring them to the call.</p>
      </Moment>

      {/* S10 - Book the call */}
      <Moment tone="dark" id="book">
        <Eyebrow tone="dark">Start</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-10 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Book the call.
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

function WorkColumn({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-7 sm:p-8 h-full">
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-emerald-700 mb-4">{tag}</p>
      <h3 className="font-display text-xl sm:text-2xl tracking-tight leading-tight mb-3 text-stone-900">{title}</h3>
      <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{body}</p>
    </div>
  );
}

function FitList({ heading, tone, items }: { heading: string; tone: 'yes' | 'no'; items: string[] }) {
  const isYes = tone === 'yes';
  const mark = isYes ? '✓' : '✕';
  const markColor = isYes ? 'text-emerald-600' : 'text-stone-400';
  const ring = isYes ? 'border-emerald-200' : 'border-stone-200';
  return (
    <div className={`bg-white border ${ring} rounded-2xl p-7 sm:p-8`}>
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-stone-500 mb-6">{heading}</p>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className={`${markColor} text-lg leading-none mt-0.5 shrink-0`} aria-hidden>{mark}</span>
            <span className="text-stone-700 text-sm sm:text-base leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FounderCard({ photo, name, role, lens, bio }: { photo: string; name: string; role: string; lens: string; bio: string }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
      <div className="relative w-full aspect-[4/3] bg-stone-100">
        <Image src={photo} alt={name} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      <div className="p-7 sm:p-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-2xl tracking-tight leading-none text-stone-900">{name}</h3>
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold text-stone-400">{lens}</p>
        </div>
        <p className="font-mono text-emerald-700 text-[11px] tracking-[0.18em] uppercase font-semibold mb-5">{role}</p>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}

function PriceCell({ amount, detail, highlight }: { amount: string; detail: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 ${highlight ? 'bg-emerald-50 border-2 border-emerald-300' : 'bg-white border border-stone-200'}`}>
      <p className={`font-display text-2xl sm:text-3xl tracking-tight leading-none mb-3 ${highlight ? 'text-emerald-700' : 'text-stone-900'}`}>{amount}</p>
      <p className="text-stone-600 text-sm leading-snug">{detail}</p>
    </div>
  );
}

function Metric({ label, value, detail, trend }: { label: string; value: string; detail: string; trend?: 'up' | 'down' }) {
  const trendColor = trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-amber-300' : 'text-mute';
  return (
    <div className="bg-ink/40 border border-divider/40 rounded-lg p-3.5">
      <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-mute mb-1.5">{label}</p>
      <p className="font-display text-xl sm:text-2xl tracking-tight leading-none text-white">{value}</p>
      <p className={`text-[10px] mt-1.5 leading-tight ${trendColor}`}>{detail}</p>
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
  const deviceWrap = ['relative bg-stone-100 group', isMac ? 'lg:col-span-3 flex flex-col justify-center p-5 sm:p-6' : 'lg:col-span-2 flex items-center justify-center py-10 sm:py-14'].join(' ');
  const macIframeCls = 'border-0 pointer-events-none [width:1400px] [height:900px] [transform-origin:top_left] [transform:scale(0.36)] sm:[transform:scale(0.45)] xl:[transform:scale(0.55)]';

  const deviceCol = (
    <div className={deviceWrap}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label={`Open ${name}'s live site`} />
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
      <div className="absolute bottom-3 right-3 z-30 px-2.5 py-1 rounded-md bg-stone-900/85 backdrop-blur-sm border border-stone-700 text-[10px] tracking-[0.1em] uppercase font-semibold text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity">Click to open {'↗'}</div>
    </div>
  );

  const textCol = (
    <div className={`${isMac ? 'lg:col-span-2' : 'lg:col-span-3'} p-7 sm:p-10`}>
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-stone-500">{eyebrow}</p>
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors">{url} {'↗'}</a>
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
      <blockquote className="border-l-2 border-emerald-600 pl-5 mb-6">
        <p className="text-stone-800 text-base sm:text-lg italic leading-snug">{'“'}{quote}{'”'}</p>
      </blockquote>
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm hover:gap-3 transition-all">
        See {name.split(' ')[0]}{'’'}s site <span aria-hidden>{'→'}</span>
      </a>
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
              <p className="text-mute text-sm mt-3 max-w-md leading-relaxed">Get found. Get booked. Stay booked. Built and run for Ontario service businesses under $1M.</p>
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
        <a href="https://www.topchoiceelectrical.com" target="_blank" rel="noopener noreferrer" className={linkCls}>topchoiceelectrical.com</a>
        <a href="https://www.xnlhr.com" target="_blank" rel="noopener noreferrer" className={linkCls}>xnlhr.com</a>
        <Link href="/brief" className={linkCls}>For investors and partners, read the brief</Link>
      </div>
      <p>{'©'} 2026 StayBookt Inc. Toronto, ON.</p>
    </div>
  );
}
