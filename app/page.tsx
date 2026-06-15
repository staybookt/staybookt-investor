import { TopNav } from '@/components/TopNav';
import HeroPulse from '@/components/HeroPulse';
import Wordmark from '@/components/Wordmark';
import Link from 'next/link';

export const metadata = {
  title: 'StayBookt | Marketing and back office for service businesses under $1M',
  description: 'StayBookt builds and runs the website and back office for service businesses where the owner answers the phone. Trades, local services, professional practices.',
};

const PULSE_SMS = 'sms:+16474908937';
const CAL_LINK = 'https://cal.com/jacobcharendoff/staybookt';

export default function HomePage() {
  return (
    <main id="top" className="relative bg-ink text-white">
      <TopNav />

      {/* 1. HERO - inline Pulse demo */}
      <HeroPulse />

      {/* 1.5 SIGNAL TICKER - real number, plain line */}
      <section className="border-t border-divider/40 px-6 sm:px-12 py-5 sm:py-6 bg-ink-soft/30">
        <div className="max-w-6xl mx-auto flex items-start sm:items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mt-1.5 sm:mt-0 shrink-0" />
          <p className="text-mute text-xs sm:text-sm leading-relaxed">
            Pulse has run on more than 200 service business sites this year. The median site is missing 6 of 14 signals it should have. The single most common gap is a Google Business Profile that has not been touched in 18 months.
          </p>
        </div>
      </section>

      {/* 2. WHO THIS IS FOR / NOT FOR */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 border-t border-divider/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-elec font-semibold mb-5">
            Read this before you spend any more time on the site.
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl">
            Honest about who we are for, and who we are not.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec mb-6">
                This is for you if
              </p>
              <ul className="space-y-4">
                <FitItem>You answer your own phone.</FitItem>
                <FitItem>Your business does somewhere between $200K and $1M in revenue.</FitItem>
                <FitItem>Your website was built more than three years ago, or by a relative, or by you on Wix.</FitItem>
                <FitItem>You do not have a marketing person and cannot justify hiring one.</FitItem>
                <FitItem>You spend evenings and weekends on admin work that you wish someone else was doing.</FitItem>
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-mute-dark mb-6">
                This is not for you if
              </p>
              <ul className="space-y-4">
                <UnfitItem>You already have a marketing manager.</UnfitItem>
                <UnfitItem>You are over $5M in revenue. You should be hiring this work in-house.</UnfitItem>
                <UnfitItem>Your decisions go through procurement.</UnfitItem>
                <UnfitItem>You want someone to teach you how to do marketing yourself. We do the work, we do not tutor.</UnfitItem>
                <UnfitItem>You want a piece of software you log into. We use software. We are not software.</UnfitItem>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO / DO NOT DO */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 border-t border-divider/40 bg-ink-soft/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-elec font-semibold mb-5">
            The work, plain.
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl">
            What we do, and what we leave alone.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec mb-6">
                What we do
              </p>
              <ul className="space-y-4">
                <FitItem>Build your website. A real one, not a template.</FitItem>
                <FitItem>Claim and fix your Google Business Profile.</FitItem>
                <FitItem>Set up missed-call recovery so a 7 a.m. call gets answered.</FitItem>
                <FitItem>Run a 24-hour, 72-hour, and 7-day follow-up on every quote you send.</FitItem>
                <FitItem>Ask for reviews after every job, automatically.</FitItem>
                <FitItem>Send you a Monday brief: leads, bookings, revenue, what changed.</FitItem>
                <FitItem>Wire up a CRM so customers do not fall out of your head.</FitItem>
                <FitItem>Make sure your invoices go out on time.</FitItem>
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-mute-dark mb-6">
                What we do not do
              </p>
              <ul className="space-y-4">
                <UnfitItem>Take over your accounting. Your accountant stays.</UnfitItem>
                <UnfitItem>Manage your employees. You do.</UnfitItem>
                <UnfitItem>Sign contracts for you. You do.</UnfitItem>
                <UnfitItem>Run paid Google or Facebook ads. Separate specialist. We can refer.</UnfitItem>
                <UnfitItem>Replace your dispatcher.</UnfitItem>
                <UnfitItem>Teach marketing. We do it for you.</UnfitItem>
                <UnfitItem>Work with businesses over $5M. Different problem, different shop.</UnfitItem>
                <UnfitItem>Work with anyone where the owner is not the decision-maker.</UnfitItem>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 WHAT WE SEND WHILE YOU ARE ON A JOB */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 border-t border-divider/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-elec font-semibold mb-5">
            What we send while you are on a job.
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-4 max-w-3xl">
            The work, in two artifacts.
          </h2>
          <p className="text-mute text-sm sm:text-base mb-14 max-w-2xl leading-relaxed">
            Two examples of what runs in the background while you are off the laptop. Numbers and names below are illustrative of a typical week, not pulled from a real owner.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* CARD A: Monday brief email mockup */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-3 mb-4">
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec">
                  Monday at 7 a.m.
                </p>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight mb-5">
                Your week in one email.
              </h3>
              <div className="bg-paper/[0.04] border border-divider/60 rounded-2xl overflow-hidden">
                {/* Email header */}
                <div className="bg-ink-soft/60 px-5 py-4 border-b border-divider/40">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-elec/40 to-plumb/40 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      S
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold leading-tight">StayBookt</p>
                      <p className="text-mute text-[10px] leading-tight">to tim@topchoiceelectrical.com</p>
                    </div>
                    <p className="text-mute text-[10px] whitespace-nowrap">Mon 7:02 a.m.</p>
                  </div>
                  <p className="text-platinum text-sm font-display tracking-tight">
                    Week of June 8, your roll-up
                  </p>
                </div>
                {/* Email body */}
                <div className="p-5 sm:p-6 space-y-5">
                  <p className="text-platinum text-sm leading-relaxed">
                    Hey Tim, here is what last week looked like.
                  </p>

                  <div className="grid grid-cols-2 gap-2.5">
                    <Metric label="New leads" value="7" detail="3 web, 4 Google" />
                    <Metric label="Booked jobs" value="4" detail="avg ticket $640" />
                    <Metric label="Revenue" value="$2,840" detail="vs $2,180 prior" trend="up" />
                    <Metric label="New reviews" value="2" detail="5.0 stars" />
                  </div>

                  <div className="bg-elec/5 border border-elec/20 rounded-lg p-4">
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-elec mb-2">
                      What changed
                    </p>
                    <p className="text-platinum-soft text-xs leading-relaxed mb-2">
                      Your Newmarket service page got 23% more views than the prior week. Two of last week&apos;s bookings came from people who landed on that page.
                    </p>
                    <p className="text-platinum-soft text-xs leading-relaxed">
                      One quote from 9 days ago is still open. We are following up with the homeowner this morning.
                    </p>
                  </div>

                  <p className="text-mute text-[11px] leading-relaxed">
                    Reply if anything looks off. Pulse runs the full diagnostic again Wednesday at 6 a.m.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD B: Review request SMS mockup */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-3 mb-4">
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-emerald-400">
                  Same day, after the job.
                </p>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight mb-5">
                Reviews while the work is fresh.
              </h3>
              <div className="bg-paper/[0.04] border border-divider/60 rounded-2xl overflow-hidden">
                {/* Phone header */}
                <div className="bg-ink-soft/60 px-5 py-4 border-b border-divider/40 flex items-center justify-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-mute-dark/60 flex items-center justify-center text-xs font-bold text-platinum">
                    P
                  </div>
                  <div>
                    <p className="text-platinum text-xs font-semibold leading-tight">Patricia, Stonehaven Lane</p>
                    <p className="text-mute text-[10px] leading-tight">Today, 4:18 p.m.</p>
                  </div>
                </div>
                {/* Messages */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[88%]">
                      <p className="text-[13px] leading-relaxed">
                        Hi Patricia, this is Tim from Top Choice Electrical. The work wrapped up just after 4. Receipt went to your email.
                      </p>
                      <p className="text-[13px] leading-relaxed mt-2">
                        If you have 20 seconds, would you mind dropping a quick Google review? g.co/r/topchoice
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-divider/40 text-platinum rounded-2xl rounded-tl-md px-4 py-3 max-w-[88%]">
                      <p className="text-[13px] leading-relaxed">
                        All done, looks great. Will do, that was a fast turnaround.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[88%]">
                      <p className="text-[13px] leading-relaxed">
                        Appreciate it. Tell Bill I said hi.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-divider/40 flex items-center gap-2.5">
                    <div className="flex items-center gap-0.5 text-emerald-400 text-xs">
                      <span aria-hidden>★</span>
                      <span aria-hidden>★</span>
                      <span aria-hidden>★</span>
                      <span aria-hidden>★</span>
                      <span aria-hidden>★</span>
                    </div>
                    <p className="text-emerald-400 text-xs font-medium">
                      5 stars, posted 18 minutes later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-mute text-xs mt-10 max-w-3xl leading-relaxed">
            The brief gets adapted to your trade and your funnel. A plumber sees emergency-call response time. A fractional consultant sees pipeline meetings booked. Same shape, different metrics.
          </p>
        </div>
      </section>

      {/* 4. THE WORK, LIVE - now with LIVE iframes */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 border-t border-divider/40 bg-ink-soft/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-elec font-semibold mb-5">
            The work, live.
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-4 max-w-3xl">
            Two real businesses. Two real owners.
          </h2>
          <p className="text-mute text-sm mb-14 max-w-2xl">
            The panels below are the actual sites, running live. Click either one to open in a new tab.
          </p>
          <div className="space-y-10">
            <ClientCard
              eyebrow="Top Choice Electrical"
              name="Tim Ciszko"
              role="Residential electrician. 22 years on the tools, 6 on his own."
              location="Newmarket, Ontario"
              url="www.topchoiceelectrical.com"
              href="https://www.topchoiceelectrical.com"
              quote="My old site was three pages of stock photos. A month after launch I had homeowners calling me by name from the website. By month two I was turning down jobs that did not fit. That is the problem you want to have."
            />
            <ClientCard
              eyebrow="XNL HR & Communications"
              name="Evert Akkerman, CHRL, LL.M."
              role="Fractional HR practice. Founded 2012. 25+ years and 25+ bylines in Canadian HR press."
              location="Newmarket, Ontario"
              url="www.xnlhr.com"
              href="https://www.xnlhr.com"
              quote="The new site tells the XNL story the way I have been trying to tell it for ten years. The first three intake calls after we launched were better prepared than the last twenty I had taken."
              reverse
            />
          </div>
        </div>
      </section>

      {/* 5. WHAT IT COSTS */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 border-t border-divider/40">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-elec font-semibold mb-5">
            Pricing.
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl">
            What it costs.
          </h2>
          <div className="space-y-px bg-divider/40 border border-divider/60 rounded-2xl overflow-hidden">
            <PriceRow price="$1,500 to $2,500" detail="to build the site. One-time. Due at kickoff." />
            <PriceRow price="$99 a month" detail="to keep it running. Cancel any month. No long contract." />
            <PriceRow price="3% to 5%" detail="on new business that the website actually brings in. Tracked, not estimated." highlight />
          </div>
          <p className="mt-8 text-platinum-soft text-base sm:text-lg leading-relaxed max-w-2xl">
            We make most of our money on the third row. Which means we are on the hook for the first two doing what they are supposed to do.
          </p>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 border-t border-divider/40 bg-ink-soft/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-elec font-semibold mb-5">
            How it works.
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl">
            Three weeks from kickoff to live.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Step num="01" title="Week 1" body="We talk. You walk us through what you do, who you serve, what is broken, what is working. We come back with the list of what we need from you (photos, services, areas, reviews) and a build timeline." />
            <Step num="02" title="Week 2 and 3" body="We build. You see drafts as they come together. Two rounds of changes. Then we ship." />
            <Step num="03" title="Week 4 forward" body="The site is live. Google Business Profile is rebuilt. The review pipeline is running. Missed-call SMS is wired. You go back to running the business. The Monday brief lands in your inbox at 7 a.m." />
          </div>
        </div>
      </section>

      {/* 7. TWO DOORS */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 border-t border-divider/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-elec font-semibold mb-5">
            Two ways to start.
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl">
            Pick one. We pick up from there.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <a href={PULSE_SMS} className="group block bg-paper/[0.03] border border-divider/60 hover:border-elec/40 rounded-2xl p-8 sm:p-10 transition-colors">
              <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec mb-4">Option one</p>
              <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-4">Text Pulse.</h3>
              <p className="text-platinum-soft text-base leading-relaxed mb-6">Text your business URL to (647) 490-8937. We run a 14-signal diagnostic. PDF lands on your phone in 90 seconds. No signup. We do not put you on a list.</p>
              <span className="inline-flex items-center gap-2 text-elec font-semibold text-sm">
                Open Messages
                <span aria-hidden className="group-hover:translate-x-1 transition-transform">{'→'}</span>
              </span>
            </a>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="group block bg-paper/[0.03] border border-divider/60 hover:border-plumb/40 rounded-2xl p-8 sm:p-10 transition-colors">
              <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-plumb mb-4">Option two</p>
              <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-4">Book a call.</h3>
              <p className="text-platinum-soft text-base leading-relaxed mb-6">30 minutes with Jacob. We walk through your business, what would actually move the needle, what it would cost. No pitch deck. No homework.</p>
              <span className="inline-flex items-center gap-2 text-plumb font-semibold text-sm">
                Pick a time
                <span aria-hidden className="group-hover:translate-x-1 transition-transform">{'→'}</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. WHO IS BEHIND THIS */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 border-t border-divider/40 bg-ink-soft/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-elec font-semibold mb-5">
            The team.
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl">
            Who is behind this.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <PersonCard initial="J" name="Jacob Charendoff" role="Co-founder" body="Runs the build, the platform, and the Pulse intelligence layer. Background in operations and software for owner-operated businesses. Lives in Toronto." />
            <PersonCard initial="R" name="Richard Roos, CPA" role="Co-founder" body="20 years in finance and operations across a range of sectors. Runs intake, client work, and the parts of the business that need a senior voice. Lives in Newmarket." />
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="border-t border-divider/40 px-6 sm:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-12">
            <div>
              <Wordmark size="sm" onDark />
              <p className="text-mute text-sm mt-3 max-w-md leading-relaxed">Marketing and back office for service businesses under $1M in revenue. Toronto, Ontario, Canada.</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-3">
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="text-platinum hover:text-white text-sm font-semibold transition-colors">Book a 30-minute call</a>
              <a href={PULSE_SMS} className="text-platinum-soft hover:text-white text-sm transition-colors">Text Pulse: (647) 490-8937</a>
              <a href="mailto:jacob@staybookt.com" className="text-mute hover:text-platinum-soft text-sm transition-colors">jacob@staybookt.com</a>
            </div>
          </div>
          <div className="pt-8 border-t border-divider/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-mute">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href="https://www.topchoiceelectrical.com" target="_blank" rel="noopener noreferrer" className="hover:text-platinum-soft transition-colors">topchoiceelectrical.com</a>
              <a href="https://www.xnlhr.com" target="_blank" rel="noopener noreferrer" className="hover:text-platinum-soft transition-colors">xnlhr.com</a>
              <Link href="/brief" className="hover:text-platinum-soft transition-colors">For investors and partners, read the brief</Link>
            </div>
            <p>{'©'} 2026 StayBookt Inc. Built in Toronto.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FitItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-elec mt-1.5 text-sm" aria-hidden>{'✓'}</span>
      <span className="text-platinum text-base sm:text-lg leading-snug">{children}</span>
    </li>
  );
}

function UnfitItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-mute-dark mt-2 text-base" aria-hidden>{'·'}</span>
      <span className="text-platinum-soft text-base sm:text-lg leading-snug">{children}</span>
    </li>
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

function ClientCard({
  eyebrow, name, role, location, url, href, quote, reverse,
}: {
  eyebrow: string; name: string; role: string; location: string; url: string;
  href: string; quote: string; reverse?: boolean;
}) {
  return (
    <article className={`grid grid-cols-1 lg:grid-cols-5 gap-8 bg-paper/[0.03] border border-divider/60 rounded-2xl overflow-hidden ${reverse ? 'lg:[direction:rtl]' : ''}`}>
      {/* LIVE site embed */}
      <div className="lg:col-span-2 aspect-[4/3] lg:aspect-auto relative overflow-hidden bg-ink-deep group">
        <a href={href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label={`Open ${name}'s live site`} />
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={href}
            title={`${name} live site`}
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-popups"
            className="border-0 pointer-events-none"
            style={{
              width: '1400px',
              height: '900px',
              transform: 'scale(0.42)',
              transformOrigin: 'top left',
            }}
          />
        </div>
        {/* Bottom-corner caption that confirms the embed is live */}
        <div className="absolute bottom-3 left-3 z-30 px-2.5 py-1 rounded-md bg-ink/80 backdrop-blur-sm border border-divider/60 text-[10px] tracking-[0.18em] uppercase font-semibold text-elec">
          Live
        </div>
        {/* Hover prompt */}
        <div className="absolute bottom-3 right-3 z-30 px-2.5 py-1 rounded-md bg-ink/80 backdrop-blur-sm border border-divider/60 text-[10px] tracking-[0.1em] uppercase font-semibold text-platinum-soft opacity-0 group-hover:opacity-100 transition-opacity">
          Click to open {'↗'}
        </div>
      </div>

      {/* Text side */}
      <div className="lg:col-span-3 p-7 sm:p-10 lg:[direction:ltr]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec">{eyebrow}</p>
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-platinum-soft hover:text-white transition-colors">{url} {'↗'}</a>
        </div>
        <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-2">{name}</h3>
        <p className="text-platinum-soft text-sm sm:text-base mb-1">{role}</p>
        <p className="text-mute text-sm mb-7">{location}</p>
        <blockquote className="border-l-2 border-elec/60 pl-5">
          <p className="text-platinum text-base sm:text-lg italic leading-snug">{'“'}{quote}{'”'}</p>
        </blockquote>
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-elec font-semibold text-sm mt-7 hover:gap-3 transition-all">
          See {name.split(' ')[0]}{'’'}s site
          <span aria-hidden>{'→'}</span>
        </a>
      </div>
    </article>
  );
}

function PriceRow({ price, detail, highlight }: { price: string; detail: string; highlight?: boolean }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 px-6 sm:px-8 py-7 ${highlight ? 'bg-elec/5' : 'bg-ink'}`}>
      <p className={`font-display text-3xl sm:text-4xl tracking-tight leading-none whitespace-nowrap ${highlight ? 'text-elec' : 'text-white'}`}>{price}</p>
      <p className="text-platinum-soft text-base sm:text-lg leading-snug">{detail}</p>
    </div>
  );
}

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="bg-paper/[0.03] border border-divider/60 rounded-2xl p-7">
      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-mute mb-4">Step {num}</p>
      <h3 className="font-display text-2xl tracking-tight mb-3">{title}</h3>
      <p className="text-platinum-soft text-sm sm:text-base leading-relaxed">{body}</p>
    </div>
  );
}

function PersonCard({ initial, name, role, body }: { initial: string; name: string; role: string; body: string }) {
  return (
    <div className="bg-paper/[0.03] border border-divider/60 rounded-2xl p-7 sm:p-8">
      <div className="flex items-center gap-5 mb-5">
        <div className="w-16 h-16 rounded-full flex items-center justify-center font-display text-2xl font-bold bg-gradient-to-br from-elec/30 to-plumb/30 text-white border border-divider/60">{initial}</div>
        <div>
          <h3 className="font-display text-2xl tracking-tight leading-none">{name}</h3>
          <p className="text-elec text-xs tracking-[0.18em] uppercase font-semibold mt-2">{role}</p>
        </div>
      </div>
      <p className="text-platinum-soft text-base leading-relaxed">{body}</p>
    </div>
  );
}
