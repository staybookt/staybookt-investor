import { TopNav } from '@/components/TopNav';
import HeroPulse from '@/components/HeroPulse';
import Wordmark from '@/components/Wordmark';
import WordRotator from '@/components/WordRotator';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxOrbs from '@/components/ParallaxOrbs';
import { IconMinusCircle } from '@/components/Icons';
import Link from 'next/link';
import { MacBookFrame, IPhoneFrame } from '@/components/DeviceFrames';
import LeakCalculator from '@/components/LeakCalculator';
import PersistentPulse from '@/components/PersistentPulse';
import Interstitial from '@/components/Interstitial';

export const metadata = {
  title: 'StayBookt | Marketing and back office for service businesses under $1M',
  description: 'StayBookt builds and runs the website and back office for service businesses where the owner answers the phone. Trades, local services, professional practices. Built for Ontario operators.',
};

const PULSE_SMS = 'sms:+16474908937';
const CAL_LINK = 'https://cal.com/jacobcharendoff/staybookt';

export default function HomePage() {
  return (
    <main id="top" className="relative text-white scroll-stage">
      <ParallaxOrbs />
      <TopNav />
      <PersistentPulse />

      {/* ════════════════════════════════════════
          ZONE 1 / DIAGNOSIS
          ════════════════════════════════════════ */}

      <HeroPulse />

      {/* Subhead — was HeroPulseShell. Now inline as part of hero close. */}
      <section className="px-6 sm:px-12 py-12 sm:py-16">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-platinum-soft text-base sm:text-lg leading-relaxed mb-5">
              Software should run <WordRotator words={['your website', 'your bookings', 'your invoices', 'your follow-ups']} />.
            </p>
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-mute">
              Replaces: Wix · Jobber lite · a part-time admin
            </p>
          </div>
        </ScrollReveal>
      </section>

      <Interstitial tone="dark" height="80vh">
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.32em] uppercase font-bold text-elec mb-12">
          The diagnosis
        </p>
        <p className="font-display tracking-[-0.04em] leading-[0.92]" style={{ fontSize: 'clamp(56px, 12vw, 152px)' }}>
          Three things.<br />
          Not strategy.<br />
          <span className="text-brand-gradient">Response time.</span>
        </p>
      </Interstitial>

      <Moment tone="dark">
        <Eyebrow tone="dark">The Leak</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          See your numbers.
        </h2>
        <p className="text-platinum-soft text-base sm:text-lg mb-14 max-w-2xl leading-relaxed">
          The hero shows the average. Slide to your business and the math recomputes live. Pulse will give you the real number when you text your URL.
        </p>

        <div className="mb-24">
          <LeakCalculator />
        </div>

        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold text-mute mb-6">
          How each leak works
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
          <LeakCard
            label="Missed calls"
            amount="$24,000"
            stat="Roughly half of inbound calls to small service businesses go to voicemail. Most callers do not try again."
            stop="An AI receptionist answers, asks the questions you would ask, books the job, and texts you the summary in your voice."
            source="AT&T small business call study, Invoca call benchmarks."
          />
          <LeakCard
            label="Slow quote follow-up"
            amount="$31,000"
            stat="Around 70% of sent quotes never get a second touch. The job goes to whoever followed up first."
            stop="Quotes follow up automatically at 24 hours, 72 hours, and 7 days. Live pipeline dashboard. Text the system to ask what is open over a week."
            source="HubSpot lead-response benchmarks."
          />
          <LeakCard
            label="Missing reviews"
            amount="$18,000"
            stat="Only 14% of happy customers leave a review unprompted. The other 86% would, if you asked at the right moment."
            stop="A text goes out while the work is fresh. Reviews land. Maps ranking climbs. Your reputation gets bigger every month."
            source="BrightLocal 2024 consumer review survey."
          />
        </div>

        <p className="text-mute text-[11px] leading-relaxed max-w-3xl">
          Calculator uses industry benchmarks (AT&T, Invoca, HubSpot, BrightLocal) calibrated to a $400K owner-operator with a $500 average ticket. Pulse pulls your actual traffic, quotes, and reviews and recomputes from your business.
        </p>
      </Moment>

      {/* ════════════════════════════════════════
          ZONE 2 / EMPATHY + EVIDENCE
          ════════════════════════════════════════ */}

      <Interstitial tone="cream" height="75vh">
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.32em] uppercase font-bold text-stone-500 mb-12">
          Your week
        </p>
        <p className="font-display tracking-[-0.04em] leading-[0.92] text-stone-900" style={{ fontSize: 'clamp(48px, 10vw, 128px)' }}>
          It looks <span className="text-amber-600">like this</span><br />
          on a good week.
        </p>
        <p className="text-stone-600 text-base sm:text-lg mt-10 max-w-2xl mx-auto">
          We pick up the amber blocks. You keep the rest.
        </p>
      </Interstitial>

      <Moment tone="cream">
        <Eyebrow tone="cream">Fit + Work</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Before and after.
        </h2>
        <p className="text-stone-600 text-sm sm:text-base mb-14 max-w-2xl leading-relaxed">
          If your before week is the amber one on the left, your after week is the cyan one on the right.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mb-12">
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone-500">Before</p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-stone-400">Your typical week</p>
            </div>
            <WeeklyGrid />
          </div>
          <div className="lg:hidden flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-stone-300" />
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone-500">After kickoff</p>
            <div className="flex-1 h-px bg-stone-300" />
          </div>
          <div>
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone-500">After kickoff</p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-stone-400">Same week, we run it</p>
            </div>
            <WeeklyGridAfter />
          </div>
        </div>

        <p className="text-stone-800 text-base sm:text-lg leading-relaxed mb-16 max-w-3xl">
          <span className="font-semibold">We pick up the admin. You keep your tools time, and the Sunday block stops shrinking.</span> Same hours, different shape.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 pt-10 border-t border-stone-300/60">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone-500 mb-5">Not for you if</p>
            <ul className="space-y-3 text-sm text-stone-600 leading-snug">
              <li className="flex items-start gap-3"><span className="text-stone-400 mt-0.5 shrink-0" aria-hidden><IconMinusCircle size={13} /></span><span>You already have a marketing manager.</span></li>
              <li className="flex items-start gap-3"><span className="text-stone-400 mt-0.5 shrink-0" aria-hidden><IconMinusCircle size={13} /></span><span>You are over $5M in revenue.</span></li>
              <li className="flex items-start gap-3"><span className="text-stone-400 mt-0.5 shrink-0" aria-hidden><IconMinusCircle size={13} /></span><span>You want a tool you log into. We are not a tool.</span></li>
              <li className="flex items-start gap-3"><span className="text-stone-400 mt-0.5 shrink-0" aria-hidden><IconMinusCircle size={13} /></span><span>You want to be taught. We do the work.</span></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone-500 mb-5">What we leave alone</p>
            <ul className="space-y-3 text-sm text-stone-600 leading-snug">
              <li className="flex items-start gap-3"><span className="text-stone-400 mt-0.5 shrink-0" aria-hidden><IconMinusCircle size={13} /></span><span>Your accounting. Your accountant stays.</span></li>
              <li className="flex items-start gap-3"><span className="text-stone-400 mt-0.5 shrink-0" aria-hidden><IconMinusCircle size={13} /></span><span>Your employees. You manage them.</span></li>
              <li className="flex items-start gap-3"><span className="text-stone-400 mt-0.5 shrink-0" aria-hidden><IconMinusCircle size={13} /></span><span>Paid Google or Facebook ads. We refer.</span></li>
              <li className="flex items-start gap-3"><span className="text-stone-400 mt-0.5 shrink-0" aria-hidden><IconMinusCircle size={13} /></span><span>Your dispatcher. Stays as is.</span></li>
            </ul>
          </div>
        </div>
      </Moment>

      <Interstitial tone="cream" height="80vh">
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.32em] uppercase font-bold text-stone-500 mb-12">
          The evidence
        </p>
        <p className="font-display tracking-[-0.04em] leading-[0.92] text-stone-900" style={{ fontSize: 'clamp(56px, 11vw, 144px)' }}>
          We did this<br />
          for <span className="text-emerald-700">real owners.</span>
        </p>
      </Interstitial>

      <Moment tone="cream" id="work">
        <Eyebrow tone="cream">Proof</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-4 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
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
            pulseStatus="Built to Pulse standards"
            outcomeStats={[
              { value: '14', label: 'Inbound web leads, first 30 days' },
              { value: '6', label: 'Booked jobs from web, first 60 days' },
            ]}
            outcomeTrackingNote="Tracking since launch. Updated weekly."
            customerReview={{
              text: 'Tim showed up when he said he would. Quoted a fair price and stuck to it. Cleaned up after himself. Would absolutely hire again.',
              author: 'Stephanie K.',
              authorLocation: 'Newmarket homeowner',
              via: 'Google',
              when: '3 weeks ago',
            }}
            frameType="macbook"
          />
          <ClientCard
            eyebrow="XNL HR & Communications"
            name="Evert Akkerman, CHRL, LL.M."
            role="Fractional HR practice. Founded 2012. 25+ years and 25+ bylines in Canadian HR press."
            location="Newmarket, Ontario"
            url="www.xnlhr.com"
            href="https://www.xnlhr.com"
            quote="The new site tells the XNL story the way I have been trying to tell it for ten years. The first three intake calls after we launched were better prepared than the last twenty I had taken."
            pulseStatus="Built to Pulse standards"
            outcomeStats={[
              { value: '4', label: 'Intake calls scheduled, first 60 days' },
              { value: '2', label: 'New retainer clients' },
            ]}
            outcomeTrackingNote="Tracking since launch. Updated weekly."
            customerReview={{
              text: 'Evert came in mid-investigation and turned a mess into a plan. Clear, fair, did not run up hours. We have kept him on retainer.',
              author: 'Procurement Director',
              authorLocation: 'Toronto manufacturing firm',
              via: 'LinkedIn',
              when: '1 month ago',
            }}
            reverse
            frameType="iphone"
          />
        </div>
        <p className="text-stone-500 text-xs mt-10 max-w-3xl leading-relaxed">
          Customer reviews shown are illustrative of the kind of feedback Tim and Evert receive. Live reviews are at each business profile, linked above the live sites.
        </p>
      </Moment>

      <Interstitial tone="cream" height="80vh">
        <p className="font-display text-stone-800 italic leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(36px, 6.5vw, 88px)' }}>
          {('“')}A month after launch<br />
          I had homeowners calling me<br />
          by name from the website.{('”')}
        </p>
        <p className="mt-10 text-stone-500 text-xs sm:text-sm font-mono tracking-[0.22em] uppercase">
          Tim Ciszko · Top Choice Electrical · Newmarket
        </p>
      </Interstitial>

      <Moment tone="cream">
        <Eyebrow tone="cream">Output</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-4 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          The work, in three artifacts.
        </h2>
        <p className="text-stone-600 text-sm sm:text-base mb-14 max-w-2xl leading-relaxed">
          Three examples of what runs in the background while you are off the laptop. Numbers and names below are illustrative of a typical week.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Monday brief email mockup */}
          <div className="flex flex-col">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-stone-500 mb-3">Monday at 7 a.m.</p>
            <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight mb-5 text-stone-900">Your week in one email.</h3>
            <div className="bg-ink-deep border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-ink-soft/60 px-5 py-4 border-b border-divider/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-elec/40 to-plumb/40 flex items-center justify-center text-xs font-bold text-white shrink-0">S</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold leading-tight">StayBookt</p>
                    <p className="text-mute text-[10px] leading-tight">to tim@topchoiceelectrical.com</p>
                  </div>
                  <p className="text-mute text-[10px] whitespace-nowrap">Mon 7:02 a.m.</p>
                </div>
                <p className="text-platinum text-sm font-display tracking-tight">Week of June 8, your roll-up</p>
              </div>
              <div className="p-5 sm:p-6 space-y-5">
                <p className="text-platinum text-sm leading-relaxed">Hey Tim, here is what last week looked like.</p>
                <div className="grid grid-cols-2 gap-2.5">
                  <Metric label="New leads" value="7" detail="3 web, 4 Google" />
                  <Metric label="Booked jobs" value="4" detail="avg ticket $640" />
                  <Metric label="Revenue" value="$2,840" detail="vs $2,180 prior" trend="up" />
                  <Metric label="New reviews" value="2" detail="5.0 stars" />
                </div>
                <div className="bg-elec/5 border border-elec/20 rounded-lg p-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-elec mb-2">What changed</p>
                  <p className="text-platinum-soft text-xs leading-relaxed mb-2">Your Newmarket service page got 23% more views than the prior week. Two of last week&apos;s bookings came from people who landed on that page.</p>
                  <p className="text-platinum-soft text-xs leading-relaxed">One quote from 9 days ago is still open. We are following up with the homeowner this morning.</p>
                </div>
                <p className="text-mute text-[11px] leading-relaxed">Reply if anything looks off. Pulse runs the full diagnostic again Wednesday at 6 a.m.</p>
              </div>
            </div>
          </div>

          {/* SMS mockup */}
          <div className="flex flex-col">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-emerald-600 mb-3">Same day, after the job.</p>
            <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight mb-5 text-stone-900">Reviews while the work is fresh.</h3>
            <div className="bg-ink-deep border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-ink-soft/60 px-5 py-4 border-b border-divider/40 flex items-center justify-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-mute-dark/60 flex items-center justify-center text-xs font-bold text-platinum">P</div>
                <div>
                  <p className="text-platinum text-xs font-semibold leading-tight">Patricia, Stonehaven Lane</p>
                  <p className="text-mute text-[10px] leading-tight">Today, 4:18 p.m.</p>
                </div>
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex justify-end">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[88%]">
                    <p className="text-[13px] leading-relaxed">Hi Patricia, this is Tim from Top Choice Electrical. The work wrapped up just after 4. Receipt went to your email.</p>
                    <p className="text-[13px] leading-relaxed mt-2">If you have 20 seconds, would you mind dropping a quick Google review? g.co/r/topchoice</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-divider/40 text-platinum rounded-2xl rounded-tl-md px-4 py-3 max-w-[88%]">
                    <p className="text-[13px] leading-relaxed">All done, looks great. Will do, that was a fast turnaround.</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[88%]">
                    <p className="text-[13px] leading-relaxed">Appreciate it. Tell Bill I said hi.</p>
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
                  <p className="text-emerald-400 text-xs font-medium">5 stars, posted 18 minutes later.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-stone-500 text-xs mt-10 max-w-3xl leading-relaxed">
          The brief gets adapted to your trade and your funnel. A plumber sees emergency-call response time. A fractional consultant sees pipeline meetings booked. Same shape, different metrics.
        </p>

        {/* Third artifact */}
        <div className="mt-24 pt-16 border-t border-stone-300/60">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-elec mb-3">And any time you want to ask.</p>
          <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-4 text-stone-900 max-w-2xl">Run your business by text.</h3>
          <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-14">
            Pulse remembers your data. Text a question, get a real answer in a sentence. No app to open. No dashboard to learn.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-stone-500 mb-5">Try sending</p>
              <ul className="space-y-3 text-stone-800 text-sm sm:text-base">
                <li>{`"what's open over 7 days"`}</li>
                <li>{`"revenue this month"`}</li>
                <li>{`"who hasn't paid me yet"`}</li>
                <li>{`"book a callback with Maria"`}</li>
              </ul>
              <p className="text-stone-500 text-xs sm:text-sm mt-8 leading-relaxed">
                Pulse pulls from your CRM, your calendar, your QuickBooks, and your live pipeline. Answers come back to your phone. The memory only knows what your tools already know.
              </p>
            </div>

            <div className="lg:col-span-3 flex justify-center">
              <div className="bg-ink-deep border border-stone-800 rounded-2xl overflow-hidden shadow-2xl max-w-md w-full">
                <div className="bg-ink-soft/60 px-5 py-4 border-b border-divider/40 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-elec/40 to-plumb/40 flex items-center justify-center text-xs font-bold text-white">P</div>
                  <div>
                    <p className="text-platinum text-xs font-semibold leading-tight">Pulse</p>
                    <p className="text-mute text-[10px] leading-tight">(647) 490-8937</p>
                  </div>
                </div>
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex justify-end"><div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[88%]"><p className="text-[13px] leading-relaxed">{`what's open over 7 days`}</p></div></div>
                  <div className="flex justify-start">
                    <div className="bg-divider/40 text-platinum rounded-2xl rounded-tl-md px-4 py-3 max-w-[88%]">
                      <p className="text-[13px] leading-relaxed">3 quotes are over 7 days, totaling $8,400.</p>
                      <ul className="text-[12px] leading-relaxed mt-2 space-y-1 text-platinum-soft">
                        <li>Maria, kitchen reno. Day 9. $4,800.</li>
                        <li>Bryan, HVAC service plan. Day 11. $2,400.</li>
                        <li>Karen, basement waterproofing. Day 8. $1,200.</li>
                      </ul>
                      <p className="text-[12px] leading-relaxed mt-2">{`Reply "chase all" or "chase [name]".`}</p>
                    </div>
                  </div>
                  <div className="flex justify-end"><div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[88%]"><p className="text-[13px] leading-relaxed">chase maria</p></div></div>
                  <div className="flex justify-start"><div className="bg-divider/40 text-platinum rounded-2xl rounded-tl-md px-4 py-3 max-w-[88%]"><p className="text-[13px] leading-relaxed">On it. Maria gets a friendly text in 5 min. I will text you back when she replies.</p></div></div>
                  <div className="pt-3 mt-2 border-t border-divider/40 flex items-center gap-2.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
                    <p className="text-mute text-[11px] font-medium">Pulse memory · live pipeline · QuickBooks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Moment>

      {/* ════════════════════════════════════════
          ZONE 3 / MECHANISM
          ════════════════════════════════════════ */}

      <Interstitial tone="cream" height="80vh">
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.32em] uppercase font-bold text-stone-500 mb-12">
          The mechanism
        </p>
        <p className="font-display tracking-[-0.04em] leading-[0.92] text-stone-900" style={{ fontSize: 'clamp(56px, 12vw, 152px)' }}>
          We get paid<br />
          <span className="text-brand-gradient">when it works.</span>
        </p>
      </Interstitial>

      <Moment tone="cream" id="pricing">
        <Eyebrow tone="cream">Pricing</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Most agencies do not.
        </h2>
        <p className="text-stone-600 text-base sm:text-lg mb-16 max-w-2xl leading-relaxed">
          They make their money before they do the work. We made the opposite bet. Almost nothing upfront. Most of our revenue on the third row.
        </p>

        <div className="space-y-12 mb-20">
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold text-stone-500">How a typical marketing agency makes money</p>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone-400 hidden sm:block">Revenue mix</p>
            </div>
            <div className="flex h-14 sm:h-16 rounded-lg overflow-hidden border border-stone-300 shadow-sm">
              <div className="flex-[95] bg-stone-400 flex items-center justify-center text-white" style={{ minWidth: '70px' }}>
                <p className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase font-bold text-center px-2 leading-tight">Flat fee · 95%</p>
              </div>
              <div className="flex-[5] bg-gradient-to-r from-elec/40 to-plumb/40 flex items-center justify-center text-white" style={{ minWidth: '40px' }}>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase font-bold">5%</p>
              </div>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">
              $5,000 to $15,000 upfront, plus a monthly retainer. You pay whether the work brings you anything or not. Most agencies do not even bother with the 5% performance kicker.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold text-emerald-700">How StayBookt makes money</p>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone-400 hidden sm:block">Revenue mix</p>
            </div>
            <div className="flex h-14 sm:h-16 rounded-lg overflow-hidden border border-stone-300 shadow-sm">
              <div className="flex-[8] bg-stone-400 flex items-center justify-center text-white" style={{ minWidth: '52px' }}>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase font-bold text-center px-1 leading-tight">Build<br className="sm:hidden" /><span className="sm:ml-1">8%</span></p>
              </div>
              <div className="flex-[10] bg-stone-500 flex items-center justify-center text-white" style={{ minWidth: '56px' }}>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase font-bold text-center px-1 leading-tight">Monthly<br className="sm:hidden" /><span className="sm:ml-1">10%</span></p>
              </div>
              <div className="flex-[82] bg-gradient-to-r from-elec to-plumb flex items-center justify-center text-white">
                <p className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase font-bold text-center px-2 leading-tight">Performance · 82%</p>
              </div>
            </div>
            <p className="text-stone-700 text-xs sm:text-sm mt-3 leading-relaxed">
              <span className="font-semibold">If the site does not bring you new business, we do not get paid.</span> So we work like it.
            </p>
          </div>
        </div>

        <div className="border-t border-stone-300/60 pt-12 mb-8">
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold text-stone-500 mb-6">The actual numbers</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <PriceCell amount="$1,500 to $2,500" detail="One-time build fee. Due at kickoff." />
            <PriceCell amount="$99 a month" detail="To keep the site running. Cancel any month." />
            <PriceCell amount="3% to 5%" detail="On new business the site brings in. Tracked, not estimated." highlight />
          </div>
        </div>

        <p className="text-stone-500 text-xs">All prices in CAD. Built for Ontario operators.</p>
      </Moment>

      <Moment tone="cream">
        <Eyebrow tone="cream">Timeline</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Three weeks. Then it just runs.
        </h2>
        <p className="text-stone-600 text-base sm:text-lg mb-20 max-w-2xl leading-relaxed">
          We do not disappear after launch. Week 4 is when the Monday brief starts landing. Week 12 is when the Pulse score starts moving up.
        </p>

        <div className="relative">
          <div className="hidden md:block absolute top-5 left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-stone-300 via-emerald-300 to-emerald-500" aria-hidden />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
            <TimelineMilestone week="Day 1" title="Kickoff call" body="60 minutes. You walk us through what you do, who you serve, what is broken. We come back the next morning with the build list." tone="stone" />
            <TimelineMilestone week="Week 1" title="Account brain" body="We catalog your services, areas, photos, real reviews, real customer voice. The site is built from this, not a template." tone="stone" />
            <TimelineMilestone week="Week 3" title="Site goes live" body="Domain points. GBP rebuilt. Review pipeline running. Missed-call SMS wired. You are off the laptop." tone="emerald-light" />
            <TimelineMilestone week="Week 4 →" title="Monday brief lands" body="7 a.m. every Monday. Numbers in your inbox. Pulse runs the diagnostic weekly. You run the business." tone="emerald" final />
          </div>
        </div>
      </Moment>

      {/* ════════════════════════════════════════
          ZONE 4 / COMMITMENT
          ════════════════════════════════════════ */}

      <Moment tone="dark" id="faq">
        <Eyebrow tone="dark">Questions</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-14 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Read this before you click.
        </h2>
        <div className="space-y-3 max-w-4xl">
          <Faq question="What if I want to cancel?">You cancel any month. We hand you the website code, the Google Business Profile login, the customer list, and the keys to the review pipeline. No locked-in dependencies. The only thing we keep is the Pulse diagnostic engine, because that one is ours.</Faq>
          <Faq question="What if you go out of business?">Your domain is registered to you. Your website lives on Vercel under your own account. Your Google Business Profile is yours. Your customer list lives in your CRM, not ours. We are the people running the system, not the system itself. If we vanish you keep everything that matters.</Faq>
          <Faq question="Why charge a percentage on new business?">Most marketing agencies charge a flat fee whether they brought you anything or not. We dropped the flat fee down to almost nothing and put the rest on the work actually moving the needle. If the site does not bring you new bookings, we do not make money on the third row.</Faq>
          <Faq question="Can I just buy the website without the monthly?">Yes, but read this first. A site without ongoing care drifts. The Google profile goes stale. Review requests stop going out. Page speed degrades. After a year, an unmaintained site is roughly as effective as no site. The $99 a month is the thing that stops that from happening.</Faq>
          <Faq question="Will you take over my domain and Google account?">No. You stay the registered owner of your domain. We get added as a manager on your Google Business Profile so we can update hours, photos, and posts. If you part ways with us, we are removed. You keep the account.</Faq>
          <Faq question="What if I want to switch trades or add a new service?">Tell us. The website gets the new pages within a week. Pulse adapts. The Monday brief shows the new metrics. Service businesses change shape all the time. The site should never be the thing holding that back.</Faq>
          <Faq question="What happens when I hire help?">Tell us. We add your office manager, your apprentice, or your spouse to the Monday brief. They get their own view, their own access. The owner stays the person we talk to. The team gets what they need to do their part.</Faq>
        </div>
        <p className="text-mute text-xs sm:text-sm mt-10 leading-relaxed">Have one we did not answer? Text it to (647) 490-8937 or bring it to the call.</p>
      </Moment>

      <Interstitial tone="dark" height="75vh">
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.32em] uppercase font-bold text-mute mb-12">
          Next step
        </p>
        <p className="font-display tracking-[-0.04em] leading-[0.92]" style={{ fontSize: 'clamp(54px, 11vw, 144px)' }}>
          Text your URL.<br />
          <span className="text-brand-gradient">90 seconds.</span>
        </p>
      </Interstitial>

      <Moment tone="dark">
        <Eyebrow tone="dark">Start</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-14 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Pick one. We pick up.
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <a href={PULSE_SMS} className="group lg:col-span-2 block bg-paper/[0.03] border border-divider/60 hover:border-elec/40 rounded-2xl p-8 sm:p-10 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-elec">Option one</p>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2 py-0.5">Recommended</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-4">Text Pulse.</h3>
            <p className="text-platinum-soft text-base leading-relaxed mb-7">
              Text your business URL to (647) 490-8937. PDF with your 14-signal diagnostic lands on your phone in 90 seconds. No signup. We do not put you on a list.
            </p>

            <div className="bg-ink/40 border border-divider/40 rounded-xl p-4 mb-7">
              <p className="font-mono text-[9px] tracking-[0.22em] uppercase font-bold text-mute mb-3">What you will receive</p>
              <div className="space-y-2">
                <div className="flex justify-end"><div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md px-3 py-2 max-w-[80%] text-[11px] leading-relaxed">yourbusiness.com</div></div>
                <div className="flex justify-start"><div className="bg-divider/40 text-platinum rounded-2xl rounded-tl-md px-3 py-2 max-w-[88%] text-[11px] leading-relaxed">On it. Pulse running on yourbusiness.com. About 90 seconds.</div></div>
                <div className="flex justify-start"><div className="bg-divider/40 text-platinum rounded-2xl rounded-tl-md px-3 py-2 max-w-[88%] text-[11px] leading-relaxed">Pulse complete. 6 of 14 signals strong. PDF: pulse.staybookt.com/pdf</div></div>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 text-elec font-semibold text-sm">
              Open Messages
              <span aria-hidden className="group-hover:translate-x-1 transition-transform">{'→'}</span>
            </span>
          </a>

          <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="group block bg-paper/[0.03] border border-divider/60 hover:border-plumb/40 rounded-2xl p-8 sm:p-10 transition-colors">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-plumb mb-4">Option two</p>
            <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-4">Book a call.</h3>
            <p className="text-platinum-soft text-base leading-relaxed mb-6">
              30 minutes with Jacob. We walk through your business, what would move the needle, what it would cost. No pitch deck. No homework.
            </p>
            <span className="inline-flex items-center gap-2 text-plumb font-semibold text-sm">
              Pick a time
              <span aria-hidden className="group-hover:translate-x-1 transition-transform">{'→'}</span>
            </span>
          </a>
        </div>
      </Moment>

      <Moment tone="dark">
        <Eyebrow tone="dark">Team</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-14 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Two humans.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <PersonCard
            initial="J"
            name="Jacob Charendoff"
            role="Co-founder · Builder"
            bio="Builds the websites, runs the Pulse intelligence layer, ships the back-office systems. Background in operations and software for owner-operated businesses. Lives in Toronto."
            voiceQuote="If the site does not bring you anything in 90 days, something is broken. Tell me and I will fix it."
            meetWhen="On the kickoff call. In your Monday brief replies. Anytime you text the (647) number."
          />
          <PersonCard
            initial="R"
            name="Richard Roos, CPA"
            role="Co-founder · Operator"
            bio="20 years across finance and operations. Runs intake, client relationships, and the parts of the work that need a senior voice. Lives in Newmarket."
            voiceQuote="I sign off the numbers before they go to a client. Always. That is what we are paid for."
            meetWhen="On the intro call before kickoff. In the quarterly performance review. Whenever the numbers need a second pair of eyes."
          />
        </div>
      </Moment>

      {/* FOOTER */}
      <footer className="px-6 sm:px-12 py-16 border-t border-divider/40">
        <ScrollReveal>
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
        </ScrollReveal>
      </footer>
    </main>
  );
}

/* ============================================================
   Moment — content section between interstitials.
   No background. Just padding + ScrollReveal wrapper.
   ============================================================ */
function Moment({ children, tone, id }: { children: React.ReactNode; tone: 'dark' | 'cream'; id?: string }) {
  const textColor = tone === 'cream' ? 'text-stone-900' : 'text-white';
  return (
    <section id={id} className={`relative px-6 sm:px-12 py-24 sm:py-32 ${id ? 'scroll-mt-24' : ''} ${textColor}`}>
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">{children}</div>
      </ScrollReveal>
    </section>
  );
}

/* ============================================================
   Eyebrow — small chapter label at the top of a Moment
   ============================================================ */
function Eyebrow({ children, tone }: { children: React.ReactNode; tone: 'cream' | 'dark' }) {
  const color = tone === 'cream' ? 'text-stone-500' : 'text-elec';
  return (
    <p className={`font-mono text-[10px] sm:text-[11px] tracking-[0.32em] uppercase font-bold mb-7 ${color}`}>
      {children}
    </p>
  );
}

/* ============================================================
   LeakCard
   ============================================================ */
function LeakCard({ label, amount, stat, stop, source }: { label: string; amount: string; stat: string; stop: string; source: string }) {
  return (
    <div className="bg-paper/[0.03] border border-divider/60 rounded-2xl p-7 sm:p-8 flex flex-col">
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-amber-400 mb-5">{label}</p>
      <p className="font-display text-5xl sm:text-6xl tracking-[-0.035em] leading-[0.9] text-white mb-2">{amount}</p>
      <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute mb-6">Lost per year</p>
      <p className="text-platinum text-sm sm:text-base leading-relaxed mb-7 border-t border-divider/30 pt-6">{stat}</p>
      <div className="mt-auto">
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-elec mb-3">How we stop it</p>
        <p className="text-platinum-soft text-sm leading-relaxed mb-6">{stop}</p>
        <p className="text-mute text-[10px] leading-relaxed pt-4 border-t border-divider/20">Source: {source}</p>
      </div>
    </div>
  );
}

/* ============================================================
   WeeklyGrid
   ============================================================ */
function WeeklyGrid() {
  type BlockType = 'tools' | 'admin' | 'family' | 'own';
  const days: { label: string; am: BlockType; pm: BlockType; eve: BlockType }[] = [
    { label: 'Mon', am: 'tools', pm: 'tools', eve: 'admin' },
    { label: 'Tue', am: 'tools', pm: 'tools', eve: 'admin' },
    { label: 'Wed', am: 'tools', pm: 'admin', eve: 'tools' },
    { label: 'Thu', am: 'tools', pm: 'tools', eve: 'admin' },
    { label: 'Fri', am: 'tools', pm: 'tools', eve: 'admin' },
    { label: 'Sat', am: 'admin', pm: 'family', eve: 'admin' },
    { label: 'Sun', am: 'family', pm: 'own', eve: 'admin' },
  ];
  const classes: Record<BlockType, string> = {
    tools: 'bg-stone-300/80 border-stone-400/40 text-stone-700',
    admin: 'bg-amber-400 border-amber-500 text-white',
    family: 'bg-stone-200 border-stone-300 text-stone-500',
    own: 'bg-emerald-500 border-emerald-600 text-white',
  };
  const labels: Record<BlockType, string> = { tools: 'Tools', admin: 'Admin', family: 'Family', own: 'You' };
  const slots: ('am' | 'pm' | 'eve')[] = ['am', 'pm', 'eve'];
  const slotLabels = { am: 'AM', pm: 'PM', eve: 'EVE' } as const;
  const adminCount = days.reduce((acc, d) => acc + slots.filter((s) => d[s] === 'admin').length, 0);

  return (
    <div>
      <div className="grid grid-cols-[28px_repeat(7,1fr)] gap-1 sm:gap-1.5 items-end mb-2">
        <div />
        {days.map((d) => (
          <p key={d.label} className="text-stone-500 font-mono text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-center">{d.label}</p>
        ))}
      </div>
      {slots.map((slot) => (
        <div key={slot} className="grid grid-cols-[28px_repeat(7,1fr)] gap-1 sm:gap-1.5 items-center mb-1 sm:mb-1.5">
          <p className="text-stone-400 font-mono text-[7px] sm:text-[9px] tracking-[0.18em] uppercase">{slotLabels[slot]}</p>
          {days.map((d) => {
            const type = d[slot];
            return (
              <div key={d.label + slot} className={`h-9 sm:h-11 rounded-md border ${classes[type]} flex items-center justify-center`}>
                <span className="text-[7px] sm:text-[9px] font-semibold tracking-wider uppercase">{labels[type]}</span>
              </div>
            );
          })}
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5 text-[9px] sm:text-[10px] font-mono tracking-[0.16em] uppercase text-stone-500">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-amber-400 border border-amber-500" /><span>{adminCount} admin blocks</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-emerald-500 border border-emerald-600" /><span>1 for you</span></div>
      </div>
    </div>
  );
}

/* ============================================================
   WeeklyGridAfter
   ============================================================ */
function WeeklyGridAfter() {
  type BlockType = 'tools' | 'sb' | 'family' | 'own';
  type DayBlock = { type: BlockType; label: string };
  const days: { label: string; am: DayBlock; pm: DayBlock; eve: DayBlock }[] = [
    { label: 'Mon', am: { type: 'tools', label: 'Tools' }, pm: { type: 'tools', label: 'Tools' }, eve: { type: 'sb', label: 'Follow-up' } },
    { label: 'Tue', am: { type: 'tools', label: 'Tools' }, pm: { type: 'tools', label: 'Tools' }, eve: { type: 'sb', label: 'Quote chase' } },
    { label: 'Wed', am: { type: 'tools', label: 'Tools' }, pm: { type: 'sb', label: 'Pulse run' }, eve: { type: 'tools', label: 'Tools' } },
    { label: 'Thu', am: { type: 'tools', label: 'Tools' }, pm: { type: 'tools', label: 'Tools' }, eve: { type: 'sb', label: 'Review ask' } },
    { label: 'Fri', am: { type: 'tools', label: 'Tools' }, pm: { type: 'tools', label: 'Tools' }, eve: { type: 'sb', label: 'Brief' } },
    { label: 'Sat', am: { type: 'sb', label: 'Missed call' }, pm: { type: 'family', label: 'Family' }, eve: { type: 'sb', label: 'Reviews' } },
    { label: 'Sun', am: { type: 'family', label: 'Family' }, pm: { type: 'own', label: 'You' }, eve: { type: 'sb', label: 'GBP update' } },
  ];
  const classes: Record<BlockType, string> = {
    tools: 'bg-stone-300/80 border-stone-400/40 text-stone-700',
    sb: 'bg-cyan-600 border-cyan-700 text-white',
    family: 'bg-stone-200 border-stone-300 text-stone-500',
    own: 'bg-emerald-500 border-emerald-600 text-white',
  };
  const slots: ('am' | 'pm' | 'eve')[] = ['am', 'pm', 'eve'];
  const slotLabels = { am: 'AM', pm: 'PM', eve: 'EVE' } as const;
  const sbCount = days.reduce((acc, d) => acc + slots.filter((s) => d[s].type === 'sb').length, 0);

  return (
    <div>
      <div className="grid grid-cols-[28px_repeat(7,1fr)] gap-1 sm:gap-1.5 items-end mb-2">
        <div />
        {days.map((d) => (<p key={d.label} className="text-stone-500 font-mono text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-center">{d.label}</p>))}
      </div>
      {slots.map((slot) => (
        <div key={slot} className="grid grid-cols-[28px_repeat(7,1fr)] gap-1 sm:gap-1.5 items-center mb-1 sm:mb-1.5">
          <p className="text-stone-400 font-mono text-[7px] sm:text-[9px] tracking-[0.18em] uppercase">{slotLabels[slot]}</p>
          {days.map((d) => {
            const block = d[slot];
            return (
              <div key={d.label + slot} className={`h-9 sm:h-11 rounded-md border ${classes[block.type]} flex items-center justify-center px-0.5`}>
                <span className="text-[6px] sm:text-[8px] font-semibold tracking-wider uppercase leading-tight text-center">{block.label}</span>
              </div>
            );
          })}
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5 text-[9px] sm:text-[10px] font-mono tracking-[0.16em] uppercase text-stone-500">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-cyan-600 border border-cyan-700" /><span>{sbCount} run by us</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-emerald-500 border border-emerald-600" /><span>1 still yours</span></div>
      </div>
    </div>
  );
}

/* ============================================================
   Metric tile
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
   FAQ
   ============================================================ */
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

/* ============================================================
   ClientCard
   ============================================================ */
function ClientCard({
  eyebrow, name, role, location, url, href, quote, reverse, frameType,
  pulseStatus, customerReview, outcomeStats, outcomeTrackingNote,
}: {
  eyebrow: string; name: string; role: string; location: string; url: string;
  href: string; quote: string; reverse?: boolean; frameType?: 'macbook' | 'iphone';
  pulseStatus?: string;
  customerReview?: { text: string; author: string; authorLocation?: string; via: string; when?: string };
  outcomeStats?: { value: string; label: string }[];
  outcomeTrackingNote?: string;
}) {
  const isMac = frameType === 'macbook';
  const isPhone = frameType === 'iphone';

  const deviceCol = (
    <div className={['relative bg-stone-100 group', isMac ? 'lg:col-span-3 flex flex-col justify-center p-5 sm:p-6' : isPhone ? 'lg:col-span-2 flex items-center justify-center py-10 sm:py-14' : 'lg:col-span-2 aspect-[4/3] lg:aspect-auto overflow-hidden'].join(' ')}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label={`Open ${name}'s live site`} />
      {isMac && (
        <MacBookFrame>
          <iframe src={href} title={`${name} live site`} loading="lazy" sandbox="allow-same-origin allow-scripts allow-popups" className="border-0 pointer-events-none [width:1400px] [height:900px] [transform-origin:top_left] [transform:scale(0.18)] sm:[transform:scale(0.30)] xl:[transform:scale(0.38)]" />
        </MacBookFrame>
      )}
      {isPhone && (
        <div className="w-full max-w-[220px]">
          <IPhoneFrame>
            <iframe src={href} title={`${name} live site`} loading="lazy" sandbox="allow-same-origin allow-scripts allow-popups" className="border-0 pointer-events-none" style={{ width: '390px', height: '844px', transformOrigin: 'top left', transform: 'scale(0.50)' }} />
          </IPhoneFrame>
        </div>
      )}
      {!isMac && !isPhone && (
        <div className="absolute inset-0 overflow-hidden">
          <iframe src={href} title={`${name} live site`} loading="lazy" sandbox="allow-same-origin allow-scripts allow-popups" className="border-0 pointer-events-none [width:1400px] [height:900px] [transform-origin:top_left] [transform:scale(0.26)] sm:[transform:scale(0.32)] md:[transform:scale(0.38)] lg:[transform:scale(0.42)]" />
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

      {pulseStatus && (
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold text-emerald-700">{pulseStatus}</p>
        </div>
      )}

      {outcomeStats && outcomeStats.length > 0 && (
        <div className="mb-7">
          <div className="grid grid-cols-2 gap-3 mb-2">
            {outcomeStats.map((stat, i) => (
              <div key={i} className="bg-emerald-50/60 border border-emerald-200/70 rounded-lg p-4">
                <p className="font-display text-3xl sm:text-4xl tracking-tight leading-none text-emerald-700 mb-2 tabular-nums">{stat.value}</p>
                <p className="text-stone-600 text-[11px] sm:text-xs leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
          {outcomeTrackingNote && <p className="text-stone-500 text-[10px] tracking-wide italic">{outcomeTrackingNote}</p>}
        </div>
      )}

      <div className="mb-6">
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-stone-500 mb-3">{name.split(' ')[0]}{'’'}s take on the build</p>
        <blockquote className="border-l-2 border-emerald-600 pl-5">
          <p className="text-stone-800 text-base sm:text-lg italic leading-snug">{('“')}{quote}{('”')}</p>
        </blockquote>
      </div>

      {customerReview && (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-7">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5 text-amber-400 text-base leading-none">
                <span aria-hidden>{'★'}</span><span aria-hidden>{'★'}</span><span aria-hidden>{'★'}</span><span aria-hidden>{'★'}</span><span aria-hidden>{'★'}</span>
              </div>
              {customerReview.when && <p className="text-stone-400 text-[11px]">{customerReview.when}</p>}
            </div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone-500">via {customerReview.via}</p>
          </div>
          <p className="text-stone-700 text-sm leading-relaxed mb-4">{('“')}{customerReview.text}{('”')}</p>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-stone-300 flex items-center justify-center text-[10px] font-bold text-stone-700">{customerReview.author.charAt(0)}</div>
            <div>
              <p className="text-stone-700 text-xs font-semibold leading-tight">{customerReview.author}</p>
              {customerReview.authorLocation && <p className="text-stone-500 text-[11px] leading-tight">{customerReview.authorLocation}</p>}
            </div>
          </div>
        </div>
      )}

      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm hover:gap-3 transition-all">
        See {name.split(' ')[0]}{'’'}s site
        <span aria-hidden>{'→'}</span>
      </a>
    </div>
  );

  return (
    <article className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-lg">
      {reverse ? <>{textCol}{deviceCol}</> : <>{deviceCol}{textCol}</>}
    </article>
  );
}

/* ============================================================
   PriceCell
   ============================================================ */
function PriceCell({ amount, detail, highlight }: { amount: string; detail: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 ${highlight ? 'bg-emerald-50 border-2 border-emerald-300' : 'bg-white border border-stone-200'}`}>
      <p className={`font-display text-2xl sm:text-3xl tracking-tight leading-none mb-3 ${highlight ? 'text-emerald-700' : 'text-stone-900'}`}>{amount}</p>
      <p className="text-stone-600 text-sm leading-snug">{detail}</p>
    </div>
  );
}

/* ============================================================
   TimelineMilestone
   ============================================================ */
function TimelineMilestone({ week, title, body, tone, final }: { week: string; title: string; body: string; tone: 'stone' | 'emerald-light' | 'emerald'; final?: boolean }) {
  const dotClasses = {
    'stone': 'bg-stone-400 border-stone-500',
    'emerald-light': 'bg-emerald-400 border-emerald-500',
    'emerald': 'bg-emerald-600 border-emerald-700',
  }[tone];
  return (
    <div className="relative text-center md:text-left">
      <div className={`mx-auto md:mx-0 w-10 h-10 rounded-full ${dotClasses} border-2 mb-5 flex items-center justify-center relative z-10 ${final ? 'shadow-lg shadow-emerald-500/30' : ''}`}>
        <span className={`w-2.5 h-2.5 rounded-full bg-white ${final ? 'animate-pulse' : ''}`} aria-hidden />
      </div>
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-stone-500 mb-2">{week}</p>
      <h3 className="font-display text-xl sm:text-2xl tracking-tight leading-tight mb-3 text-stone-900">{title}</h3>
      <p className="text-stone-600 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

/* ============================================================
   PersonCard
   ============================================================ */
function PersonCard({ initial, name, role, bio, voiceQuote, meetWhen }: { initial: string; name: string; role: string; bio: string; voiceQuote?: string; meetWhen?: string }) {
  return (
    <div className="bg-paper/[0.03] border border-divider/60 rounded-2xl p-7 sm:p-8">
      <div className="flex items-start gap-5 mb-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center font-display text-2xl font-bold bg-gradient-to-br from-elec/30 to-plumb/30 text-white border border-divider/60 shrink-0">{initial}</div>
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="font-display text-2xl tracking-tight leading-none mb-2">{name}</h3>
          <p className="font-mono text-elec text-[11px] tracking-[0.18em] uppercase font-semibold">{role}</p>
        </div>
      </div>
      <p className="text-platinum-soft text-base leading-relaxed mb-6">{bio}</p>
      {voiceQuote && (
        <div className="bg-paper/[0.04] border-l-2 border-elec/60 pl-4 py-3 mb-6">
          <p className="text-platinum text-sm italic leading-relaxed">{('“')}{voiceQuote}{('”')}</p>
        </div>
      )}
      {meetWhen && (
        <div>
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-mute mb-2">Where you meet</p>
          <p className="text-platinum-soft text-sm leading-relaxed">{meetWhen}</p>
        </div>
      )}
    </div>
  );
}
