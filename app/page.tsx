import { TopNav } from '@/components/TopNav';
import HeroPulse from '@/components/HeroPulse';
import Wordmark from '@/components/Wordmark';
import WordRotator from '@/components/WordRotator';
import {
  IconGlobe,
  IconPhoneCall,
  IconClockRotate,
  IconStar,
  IconBarChart,
  IconUsers,
  IconFileInvoice,
  IconWrench,
  IconMinusCircle,
} from '@/components/Icons';
import Link from 'next/link';

export const metadata = {
  title: 'StayBookt | Marketing and back office for service businesses under $1M',
  description: 'StayBookt builds and runs the website and back office for service businesses where the owner answers the phone. Trades, local services, professional practices. Built for Ontario operators.',
};

const PULSE_SMS = 'sms:+16474908937';
const CAL_LINK = 'https://cal.com/jacobcharendoff/staybookt';

const CREAM_BG = 'bg-[#FAF8F2] text-stone-900';
const CREAM_ALT_BG = 'bg-[#F4EFE3] text-stone-900';
const DARK_BG = 'bg-ink-deep text-white';

export default function HomePage() {
  return (
    <main id="top" className="relative bg-ink-deep text-white">
      <TopNav />

      {/* HERO — dark, signal ring */}
      <HeroPulseShell />

      {/* REPLACES strip + word rotator subhead live inside HeroPulseShell now */}

      {/* 01 / FIT — cream */}
      <section className={`${CREAM_BG} py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-200`}>
        <div className="max-w-6xl mx-auto">
          <Chapter num="01" label="Fit" tone="cream" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl text-stone-900">
            Honest about who we are for, and who we are not.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone-500 mb-6">
                This is for you if
              </p>
              <ul className="space-y-4">
                <FitItemCream>You answer your own phone.</FitItemCream>
                <FitItemCream>Your business does somewhere between $200K and $1M in revenue.</FitItemCream>
                <FitItemCream>Your website was built more than three years ago, or by a relative, or by you on Wix.</FitItemCream>
                <FitItemCream>You do not have a marketing person and cannot justify hiring one.</FitItemCream>
                <FitItemCream>You spend evenings and weekends on admin work that you wish someone else was doing.</FitItemCream>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone-500 mb-6">
                This is not for you if
              </p>
              <ul className="space-y-4">
                <UnfitItemCream>You already have a marketing manager.</UnfitItemCream>
                <UnfitItemCream>You are over $5M in revenue. You should be hiring this work in-house.</UnfitItemCream>
                <UnfitItemCream>Your decisions go through procurement.</UnfitItemCream>
                <UnfitItemCream>You want someone to teach you how to do marketing yourself. We do the work, we do not tutor.</UnfitItemCream>
                <UnfitItemCream>You want a piece of software you log into. We use software. We are not software.</UnfitItemCream>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 02 / WORK — cream alt with icons */}
      <section className={`${CREAM_ALT_BG} py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-200`}>
        <div className="max-w-6xl mx-auto">
          <Chapter num="02" label="Work" tone="cream" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl text-stone-900">
            What we do, and what we leave alone.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone-500 mb-6">
                What we do
              </p>
              <ul className="space-y-5">
                <IconItem icon={<IconGlobe />}>Build your website. A real one, not a template.</IconItem>
                <IconItem icon={<IconGlobe />}>Claim and fix your Google Business Profile.</IconItem>
                <IconItem icon={<IconPhoneCall />}>Set up missed-call recovery so a 7 a.m. call gets answered.</IconItem>
                <IconItem icon={<IconClockRotate />}>Run a 24-hour, 72-hour, and 7-day follow-up on every quote you send.</IconItem>
                <IconItem icon={<IconStar />}>Ask for reviews after every job, automatically.</IconItem>
                <IconItem icon={<IconBarChart />}>Send you a Monday brief: leads, bookings, revenue, what changed.</IconItem>
                <IconItem icon={<IconUsers />}>Wire up a CRM so customers do not fall out of your head.</IconItem>
                <IconItem icon={<IconFileInvoice />}>Make sure your invoices go out on time.</IconItem>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone-500 mb-6">
                What we do not do
              </p>
              <ul className="space-y-5">
                <NotItem>Take over your accounting. Your accountant stays.</NotItem>
                <NotItem>Manage your employees. You do.</NotItem>
                <NotItem>Sign contracts for you. You do.</NotItem>
                <NotItem>Run paid Google or Facebook ads. Separate specialist. We can refer.</NotItem>
                <NotItem>Replace your dispatcher.</NotItem>
                <NotItem>Teach marketing. We do it for you.</NotItem>
                <NotItem>Work with businesses over $5M. Different problem, different shop.</NotItem>
                <NotItem>Work with anyone where the owner is not the decision-maker.</NotItem>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 03 / OUTPUT — cream, Monday brief + review SMS */}
      <section className={`${CREAM_BG} py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-200`}>
        <div className="max-w-6xl mx-auto">
          <Chapter num="03" label="Output" tone="cream" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-4 max-w-3xl text-stone-900">
            The work, in two artifacts.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mb-14 max-w-2xl leading-relaxed">
            Two examples of what runs in the background while you are off the laptop. Numbers and names below are illustrative of a typical week, not pulled from a real owner.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Monday brief email mockup — stays dark inside even on cream */}
            <div className="flex flex-col">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-stone-500 mb-3">
                Monday at 7 a.m.
              </p>
              <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight mb-5 text-stone-900">
                Your week in one email.
              </h3>
              <div className="bg-ink-deep border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
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

            {/* SMS mockup — stays dark inside */}
            <div className="flex flex-col">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-emerald-600 mb-3">
                Same day, after the job.
              </p>
              <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight mb-5 text-stone-900">
                Reviews while the work is fresh.
              </h3>
              <div className="bg-ink-deep border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-ink-soft/60 px-5 py-4 border-b border-divider/40 flex items-center justify-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-mute-dark/60 flex items-center justify-center text-xs font-bold text-platinum">
                    P
                  </div>
                  <div>
                    <p className="text-platinum text-xs font-semibold leading-tight">Patricia, Stonehaven Lane</p>
                    <p className="text-mute text-[10px] leading-tight">Today, 4:18 p.m.</p>
                  </div>
                </div>
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
                      <span aria-hidden>{'★'}</span>
                      <span aria-hidden>{'★'}</span>
                      <span aria-hidden>{'★'}</span>
                      <span aria-hidden>{'★'}</span>
                      <span aria-hidden>{'★'}</span>
                    </div>
                    <p className="text-emerald-400 text-xs font-medium">
                      5 stars, posted 18 minutes later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-stone-500 text-xs mt-10 max-w-3xl leading-relaxed">
            The brief gets adapted to your trade and your funnel. A plumber sees emergency-call response time. A fractional consultant sees pipeline meetings booked. Same shape, different metrics.
          </p>
        </div>
      </section>

      {/* 04 / PROOF — cream alt, live iframes */}
      <section id="work" className={`scroll-mt-24 ${CREAM_ALT_BG} py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-200`}>
        <div className="max-w-6xl mx-auto">
          <Chapter num="04" label="Proof" tone="cream" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-4 max-w-3xl text-stone-900">
            Two real businesses. Two real owners.
          </h2>
          <p className="text-stone-600 text-sm mb-14 max-w-2xl">
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

      {/* 05 / PRICING — cream */}
      <section id="pricing" className={`scroll-mt-24 ${CREAM_BG} py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-200`}>
        <div className="max-w-5xl mx-auto">
          <Chapter num="05" label="Pricing" tone="cream" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl text-stone-900">
            What it costs.
          </h2>
          <div className="space-y-px bg-stone-300/60 border border-stone-300 rounded-2xl overflow-hidden">
            <PriceRowCream price="$1,500 to $2,500" detail="to build the site. One-time. Due at kickoff." />
            <PriceRowCream price="$99 a month" detail="to keep it running. Cancel any month. No long contract." />
            <PriceRowCream price="3% to 5%" detail="on new business that the website actually brings in. Tracked, not estimated." highlight />
          </div>
          <p className="mt-8 text-stone-700 text-base sm:text-lg leading-relaxed max-w-2xl">
            We make most of our money on the third row. Which means we are on the hook for the first two doing what they are supposed to do.
          </p>
          <p className="mt-3 text-stone-500 text-xs">
            All prices in CAD. Built for Ontario operators.
          </p>
        </div>
      </section>

      {/* 06 / TIMELINE — cream alt */}
      <section className={`${CREAM_ALT_BG} py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-200`}>
        <div className="max-w-6xl mx-auto">
          <Chapter num="06" label="Timeline" tone="cream" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl text-stone-900">
            Three weeks from kickoff to live.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StepCream num="01" title="Week 1" body="We talk. You walk us through what you do, who you serve, what is broken, what is working. We come back with the list of what we need from you (photos, services, areas, reviews) and a build timeline." />
            <StepCream num="02" title="Week 2 and 3" body="We build. You see drafts as they come together. Two rounds of changes. Then we ship." />
            <StepCream num="03" title="Week 4 forward" body="The site is live. Google Business Profile is rebuilt. The review pipeline is running. Missed-call SMS is wired. You go back to running the business. The Monday brief lands in your inbox at 7 a.m." />
          </div>
        </div>
      </section>

      {/* 07 / QUESTIONS — dark proof slab */}
      <section id="faq" className={`scroll-mt-24 ${DARK_BG} py-24 sm:py-32 px-6 sm:px-12 border-t border-divider/40`}>
        <div className="max-w-4xl mx-auto">
          <Chapter num="07" label="Questions" tone="dark" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl">
            Read this before you click.
          </h2>
          <div className="space-y-3">
            <Faq question="What if I want to cancel?">
              You cancel any month. We hand you the website code, the Google Business Profile login, the customer list, and the keys to the review pipeline. No locked-in dependencies. The only thing we keep is the Pulse diagnostic engine, because that one is ours.
            </Faq>
            <Faq question="What if you go out of business?">
              Your domain is registered to you. Your website lives on Vercel under your own account. Your Google Business Profile is yours. Your customer list lives in your CRM, not ours. We are the people running the system, not the system itself. If we vanish you keep everything that matters.
            </Faq>
            <Faq question="Why charge a percentage on new business?">
              Most marketing agencies charge a flat fee whether they brought you anything or not. We dropped the flat fee down to almost nothing and put the rest on the work actually moving the needle. If the site does not bring you new bookings, we do not make money on the third row.
            </Faq>
            <Faq question="Can I just buy the website without the monthly?">
              Yes, but read this first. A site without ongoing care drifts. The Google profile goes stale. Review requests stop going out. Page speed degrades. After a year, an unmaintained site is roughly as effective as no site. The $99 a month is the thing that stops that from happening.
            </Faq>
            <Faq question="Will you take over my domain and Google account?">
              No. You stay the registered owner of your domain. We get added as a manager on your Google Business Profile so we can update hours, photos, and posts. If you part ways with us, we are removed. You keep the account.
            </Faq>
            <Faq question="What if I want to switch trades or add a new service?">
              Tell us. The website gets the new pages within a week. Pulse adapts. The Monday brief shows the new metrics. Service businesses change shape all the time. The site should never be the thing holding that back.
            </Faq>
          </div>
          <p className="text-mute text-xs sm:text-sm mt-10 leading-relaxed">
            Have one we did not answer? Text it to (647) 490-8937 or bring it to the call.
          </p>
        </div>
      </section>

      {/* 08 / START — dark */}
      <section className={`${DARK_BG} py-24 sm:py-32 px-6 sm:px-12 border-t border-divider/40`}>
        <div className="max-w-6xl mx-auto">
          <Chapter num="08" label="Start" tone="dark" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl">
            Pick one. We pick up from there.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <a href={PULSE_SMS} className="group block bg-paper/[0.03] border border-divider/60 hover:border-elec/40 rounded-2xl p-8 sm:p-10 transition-colors">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-elec mb-4">Option one</p>
              <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-4">Text Pulse.</h3>
              <p className="text-platinum-soft text-base leading-relaxed mb-6">Text your business URL to (647) 490-8937. We run a 14-signal diagnostic. PDF lands on your phone in 90 seconds. No signup. We do not put you on a list.</p>
              <span className="inline-flex items-center gap-2 text-elec font-semibold text-sm">
                Open Messages
                <span aria-hidden className="group-hover:translate-x-1 transition-transform">{'→'}</span>
              </span>
            </a>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="group block bg-paper/[0.03] border border-divider/60 hover:border-plumb/40 rounded-2xl p-8 sm:p-10 transition-colors">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-plumb mb-4">Option two</p>
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

      {/* 09 / TEAM — dark */}
      <section className={`${DARK_BG} py-24 sm:py-32 px-6 sm:px-12 border-t border-divider/40`}>
        <div className="max-w-6xl mx-auto">
          <Chapter num="09" label="Team" tone="dark" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.04] mb-14 max-w-3xl">
            Who is behind this.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <PersonCard initial="J" name="Jacob Charendoff" role="Co-founder" body="Runs the build, the platform, and the Pulse intelligence layer. Background in operations and software for owner-operated businesses. Lives in Toronto." />
            <PersonCard initial="R" name="Richard Roos, CPA" role="Co-founder" body="20 years in finance and operations across a range of sectors. Runs intake, client work, and the parts of the business that need a senior voice. Lives in Newmarket." />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink-deep border-t border-divider/40 px-6 sm:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-12">
            <div>
              <Wordmark size="sm" onDark />
              <p className="text-mute text-sm mt-3 max-w-md leading-relaxed">Marketing and back office for service businesses under $1M in revenue. Built for Ontario operators.</p>
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
            <p>{'©'} 2026 StayBookt Inc. Toronto, ON.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ============================================================
   Hero shell wraps HeroPulse + word rotator subhead + replaces strip
   ============================================================ */
function HeroPulseShell() {
  return (
    <>
      <HeroPulse />
      <section className="bg-ink-deep px-6 sm:px-12 py-10 sm:py-12 border-t border-divider/30">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-platinum-soft text-base sm:text-lg leading-relaxed mb-6">
            Software should run <WordRotator words={['your website', 'your bookings', 'your invoices', 'your follow-ups']} />.
          </p>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-mute">
            Replaces: Wix · Jobber lite · a part-time admin
          </p>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   Chapter label — mono micro-label like "01 / WEBSITE"
   ============================================================ */
function Chapter({ num, label, tone }: { num: string; label: string; tone: 'cream' | 'dark' }) {
  const color = tone === 'cream' ? 'text-stone-500' : 'text-mute';
  return (
    <div className={`font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold mb-7 ${color}`}>
      {num} <span className="opacity-50 px-1">/</span> {label.toUpperCase()}
    </div>
  );
}

/* ============================================================
   List items
   ============================================================ */
function FitItemCream({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-emerald-700 mt-1 text-sm" aria-hidden>{'✓'}</span>
      <span className="text-stone-800 text-base sm:text-lg leading-snug">{children}</span>
    </li>
  );
}

function UnfitItemCream({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-stone-400 mt-1.5" aria-hidden>
        <IconMinusCircle size={14} />
      </span>
      <span className="text-stone-600 text-base sm:text-lg leading-snug">{children}</span>
    </li>
  );
}

function IconItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="text-emerald-700 mt-0.5 shrink-0" aria-hidden>
        {icon}
      </span>
      <span className="text-stone-800 text-base sm:text-lg leading-snug">{children}</span>
    </li>
  );
}

function NotItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="text-stone-400 mt-0.5 shrink-0" aria-hidden>
        <IconMinusCircle />
      </span>
      <span className="text-stone-600 text-base sm:text-lg leading-snug">{children}</span>
    </li>
  );
}

/* ============================================================
   Monday brief metric tile — dark interior even on cream sections
   ============================================================ */
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

/* ============================================================
   FAQ — dark proof slab
   ============================================================ */
function Faq({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <details className="group bg-paper/[0.03] border border-divider/60 hover:border-divider rounded-2xl overflow-hidden transition-colors">
      <summary className="cursor-pointer list-none px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-5">
        <h3 className="font-display text-lg sm:text-xl tracking-tight leading-snug">{question}</h3>
        <span className="text-elec text-2xl font-light transition-transform group-open:rotate-45 shrink-0 leading-none" aria-hidden>+</span>
      </summary>
      <div className="px-6 sm:px-8 pb-6 sm:pb-7 text-platinum-soft text-base leading-relaxed">
        {children}
      </div>
    </details>
  );
}

/* ============================================================
   Client card (TCE / XNL) — iframe inside, cream-section context
   ============================================================ */
function ClientCard({
  eyebrow, name, role, location, url, href, quote, reverse,
}: {
  eyebrow: string; name: string; role: string; location: string; url: string;
  href: string; quote: string; reverse?: boolean;
}) {
  return (
    <article className={`grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-lg ${reverse ? 'lg:[direction:rtl]' : ''}`}>
      <div className="lg:col-span-2 aspect-[4/3] lg:aspect-auto relative overflow-hidden bg-stone-100 group">
        <a href={href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label={`Open ${name}'s live site`} />
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={href}
            title={`${name} live site`}
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-popups"
            className="border-0 pointer-events-none [width:1400px] [height:900px] [transform-origin:top_left] [transform:scale(0.26)] sm:[transform:scale(0.32)] md:[transform:scale(0.38)] lg:[transform:scale(0.42)]"
          />
        </div>
        <div className="absolute bottom-3 left-3 z-30 px-2.5 py-1 rounded-md bg-stone-900/85 backdrop-blur-sm border border-stone-700 text-[10px] tracking-[0.18em] uppercase font-semibold text-emerald-300">
          Live
        </div>
        <div className="absolute bottom-3 right-3 z-30 px-2.5 py-1 rounded-md bg-stone-900/85 backdrop-blur-sm border border-stone-700 text-[10px] tracking-[0.1em] uppercase font-semibold text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to open {'↗'}
        </div>
      </div>

      <div className="lg:col-span-3 p-7 sm:p-10 lg:[direction:ltr]">
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-stone-500">{eyebrow}</p>
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors">{url} {'↗'}</a>
        </div>
        <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-2 text-stone-900">{name}</h3>
        <p className="text-stone-600 text-sm sm:text-base mb-1">{role}</p>
        <p className="text-stone-500 text-sm mb-7">{location}</p>
        <blockquote className="border-l-2 border-emerald-600 pl-5">
          <p className="text-stone-800 text-base sm:text-lg italic leading-snug">{'“'}{quote}{'”'}</p>
        </blockquote>
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm mt-7 hover:gap-3 transition-all">
          See {name.split(' ')[0]}{'’'}s site
          <span aria-hidden>{'→'}</span>
        </a>
      </div>
    </article>
  );
}

/* ============================================================
   Pricing row — cream
   ============================================================ */
function PriceRowCream({ price, detail, highlight }: { price: string; detail: string; highlight?: boolean }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 px-6 sm:px-8 py-7 ${highlight ? 'bg-emerald-50' : 'bg-white'}`}>
      <p className={`font-display text-3xl sm:text-4xl tracking-tight leading-none whitespace-nowrap ${highlight ? 'text-emerald-700' : 'text-stone-900'}`}>{price}</p>
      <p className="text-stone-700 text-base sm:text-lg leading-snug">{detail}</p>
    </div>
  );
}

/* ============================================================
   Step (timeline) — cream
   ============================================================ */
function StepCream({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-7 shadow-sm">
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone-500 mb-4">Step {num}</p>
      <h3 className="font-display text-2xl tracking-tight mb-3 text-stone-900">{title}</h3>
      <p className="text-stone-700 text-sm sm:text-base leading-relaxed">{body}</p>
    </div>
  );
}

/* ============================================================
   Person card — dark
   ============================================================ */
function PersonCard({ initial, name, role, body }: { initial: string; name: string; role: string; body: string }) {
  return (
    <div className="bg-paper/[0.03] border border-divider/60 rounded-2xl p-7 sm:p-8">
      <div className="flex items-center gap-5 mb-5">
        <div className="w-16 h-16 rounded-full flex items-center justify-center font-display text-2xl font-bold bg-gradient-to-br from-elec/30 to-plumb/30 text-white border border-divider/60">{initial}</div>
        <div>
          <h3 className="font-display text-2xl tracking-tight leading-none">{name}</h3>
          <p className="font-mono text-elec text-xs tracking-[0.18em] uppercase font-semibold mt-2">{role}</p>
        </div>
      </div>
      <p className="text-platinum-soft text-base leading-relaxed">{body}</p>
    </div>
  );
}
