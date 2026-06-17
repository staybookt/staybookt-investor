import { TopNav } from '@/components/TopNav';
import Hero from '@/components/Hero';
import Wordmark from '@/components/Wordmark';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxOrbs from '@/components/ParallaxOrbs';
import Link from 'next/link';
import { MacBookFrame, IPhoneFrame } from '@/components/DeviceFrames';
import LeakCalculator from '@/components/LeakCalculator';

export const metadata = {
  title: 'StayBookt | A website that earns its keep. Paid for by the results.',
  description: 'StayBookt builds websites for Ontario service businesses under $1M. $2,500 to launch. $149 a month. 5% on new business the site brings you. The back-office layer is rolling out behind it.',
};

const CAL_LINK = 'https://cal.com/jacobcharendoff/staybookt';

export default function HomePage() {
  return (
    <main id="top" className="relative text-white scroll-stage">
      <ParallaxOrbs />
      <TopNav />

      <Hero />

      <Moment tone="dark">
        <Eyebrow tone="dark">The Leak</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          Your old website is leaking <span className="text-brand-gradient">$73,000</span> a year.
        </h2>
        <p className="text-platinum-soft text-base sm:text-lg mb-12 max-w-2xl leading-relaxed">Between $50,000 and $90,000. To three things. None of them are strategy. All of them are response time. Slide in your numbers. We walk through your real number on the call.</p>

        <LeakBreakdown />

        <div className="mb-10"><LeakCalculator /></div>

        <div className="bg-paper/[0.03] border border-divider/60 rounded-2xl p-6 sm:p-8 max-w-3xl">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-emerald-400 mb-3">What changed for Tim</p>
          <p className="text-platinum text-base sm:text-lg leading-relaxed">Top Choice Electrical went live 60 days ago. Tim has captured <span className="text-white font-semibold">14 web leads</span>. <span className="text-white font-semibold">Six booked.</span> His old site averaged less than one a quarter.</p>
        </div>
        <p className="text-mute text-[11px] leading-relaxed max-w-3xl mt-8">Calculator uses industry benchmarks (AT&amp;T, Invoca, HubSpot, BrightLocal) calibrated to a $400K owner-operator with a $500 average ticket.</p>
      </Moment>

      <Moment tone="cream" id="work">
        <Eyebrow tone="cream">Proof</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-4 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>Two builds. Two owners. Real numbers.</h2>
        <p className="text-stone-600 text-sm sm:text-base mb-14 max-w-2xl leading-relaxed">Both sites are live and tracked since launch. Click either to open it in a new tab.</p>
        <div className="space-y-10">
          <ClientCard
            eyebrow="Top Choice Electrical"
            name="Tim Ciszko"
            role="Residential electrician. 22 years on the tools, 6 on his own."
            location="Newmarket, Ontario"
            url="www.topchoiceelectrical.com"
            href="https://www.topchoiceelectrical.com"
            quote="My old site was three pages of stock photos. A month after launch I had homeowners calling me by name from the website. By month two I was turning down jobs that did not fit. That is the problem you want to have."
            statusBadge="Live · Built in 3 weeks"
            outcomeStats={[
              { value: '14', label: 'Inbound web leads, first 30 days' },
              { value: '6', label: 'Booked jobs, first 60 days' },
            ]}
            outcomeTrackingNote="Tracked via website forms + Google Business Profile call logs."
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
            statusBadge="Live · Built in 3 weeks"
            outcomeStats={[
              { value: '4', label: 'Intake calls scheduled, first 60 days' },
              { value: '2', label: 'New retainer clients' },
            ]}
            outcomeTrackingNote="Tracked via website contact form + intake calendar bookings."
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
        <p className="text-stone-500 text-xs mt-10 max-w-3xl leading-relaxed">Customer reviews shown are illustrative of the kind of feedback Tim and Evert receive. Live reviews live on each business profile, linked above each site.</p>
      </Moment>

      <Moment tone="cream" id="pricing">
        <Eyebrow tone="cream">How we get paid</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>We do not get paid until you do.</h2>
        <p className="text-stone-600 text-base sm:text-lg mb-16 max-w-2xl leading-relaxed">Most agencies charge $15,000 upfront whether the work pays off or not. We dropped the upfront down to almost nothing and put 82% of our revenue on results.</p>

        <div className="space-y-10 mb-16">
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold text-stone-500">How a typical agency makes money</p>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone-400 hidden sm:block">Revenue mix</p>
            </div>
            <div className="flex h-16 sm:h-20 rounded-lg overflow-hidden border border-stone-300 shadow-sm">
              <div className="flex-[95] bg-stone-400 flex items-center justify-center text-white" style={{ minWidth: '70px' }}>
                <p className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase font-bold text-center px-2 leading-tight">Flat fee &middot; 95%</p>
              </div>
              <div className="flex-[5] bg-gradient-to-r from-elec/40 to-plumb/40 flex items-center justify-center text-white" style={{ minWidth: '40px' }}>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase font-bold">5%</p>
              </div>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">$5,000 to $15,000 upfront. Monthly retainer regardless of outcomes. You pay whether the work brings you anything or not.</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold text-emerald-700">How StayBookt makes money</p>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone-400 hidden sm:block">Revenue mix</p>
            </div>
            <div className="flex h-16 sm:h-20 rounded-lg overflow-hidden border border-stone-300 shadow-sm">
              <div className="flex-[8] bg-stone-400 flex items-center justify-center text-white" style={{ minWidth: '52px' }}>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase font-bold text-center px-1 leading-tight">Build<br className="sm:hidden" /><span className="sm:ml-1">8%</span></p>
              </div>
              <div className="flex-[10] bg-stone-500 flex items-center justify-center text-white" style={{ minWidth: '56px' }}>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase font-bold text-center px-1 leading-tight">Monthly<br className="sm:hidden" /><span className="sm:ml-1">10%</span></p>
              </div>
              <div className="flex-[82] bg-gradient-to-r from-elec to-plumb flex items-center justify-center text-white">
                <p className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase font-bold text-center px-2 leading-tight">Performance &middot; 82%</p>
              </div>
            </div>
            <p className="text-stone-700 text-xs sm:text-sm mt-3 leading-relaxed"><span className="font-semibold">If the site does not bring you new business, we do not get paid.</span> So we work like it.</p>
          </div>
        </div>

        <div className="border-t border-stone-300/60 pt-12 mb-8">
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold text-stone-500 mb-6">The actual numbers</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <PriceCell amount="$2,500" detail="One-time build fee. Due at kickoff. Three weeks to launch." />
            <PriceCell amount="$149 a month" detail="Ongoing care. Cancel any month, take everything with you." />
            <PriceCell amount="5%" detail="On new business the site brings in. Report goes out monthly." highlight />
          </div>
          <div className="bg-stone-100 border border-stone-200 rounded-xl p-5 max-w-2xl">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-stone-500 mb-2">How we track new business</p>
            <p className="text-stone-700 text-sm leading-relaxed">Form fills tagged at submission. Calls tracked via your Google Business Profile. Bookings reconciled against your existing pipeline so we do not double-count. You see what we count. The report goes out every month before the invoice.</p>
          </div>
        </div>
        <p className="text-stone-500 text-xs">All prices in CAD. Built for Ontario operators.</p>
      </Moment>

      <Moment tone="cream">
        <Eyebrow tone="cream">Timeline</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-3xl text-stone-900" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>Three weeks. Then you are back on the tools.</h2>
        <p className="text-stone-600 text-base sm:text-lg mb-20 max-w-2xl leading-relaxed">No 6-month engagements. No revision-round-12. Three focused weeks, then ongoing care keeps it converting. Back-office layers roll in as we ship them.</p>
        <div className="relative">
          <div className="hidden md:block absolute top-5 left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-stone-300 via-emerald-300 to-emerald-500" aria-hidden />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
            <TimelineMilestone week="Day 1" title="Kickoff call" body="60 minutes. You walk us through what you do, who you serve, what is broken. We come back the next morning with the build list." tone="stone" />
            <TimelineMilestone week="Week 1" title="Discovery + content" body="We catalog your services, areas, photos, real reviews, real customer voice. The site is built from this, not a template." tone="stone" />
            <TimelineMilestone week="Week 3" title="Site goes live" body="Domain points. Google Business Profile rebuilt. Review request flow wired. Form fills routed to your phone. You are back on the tools." tone="emerald" final />
          </div>
        </div>
      </Moment>

      <Moment tone="dark">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1 mb-6">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden />
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold text-amber-300">Roadmap &middot; Rolling out 2026</p>
        </div>
        <Eyebrow tone="dark">What is next</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-4 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>The back office is the next layer.</h2>
        <p className="text-platinum-soft text-base sm:text-lg mb-14 max-w-3xl leading-relaxed">The website captures the leads. The back office converts them. Every customer touch loops back through your database, and the system gets smarter for you every month.</p>

        <div className="mb-16">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-elec mb-6 text-center">How the flywheel runs</p>
          <Flywheel />
          <p className="text-mute text-xs sm:text-sm leading-relaxed text-center mt-6 max-w-2xl mx-auto">Five of the six steps are AI plus a human safety net. The only step you do is the work itself.</p>
        </div>

        <div className="border-t border-divider/60 pt-14">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-amber-300 mb-6 text-center">Two artifacts the flywheel produces</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="flex flex-col">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-amber-300 mb-3">Concept &middot; Monday brief</p>
              <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight mb-5 text-white">Your week in one email.</h3>
              <div className="bg-ink-deep/80 border border-divider/60 rounded-2xl overflow-hidden shadow-2xl">
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
                  <p className="text-mute text-[11px] leading-relaxed">Reply if anything looks off. Next roll-up Monday at 7 a.m.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-amber-300 mb-3">Concept &middot; Review request</p>
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
                  <div className="flex justify-end"><div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[88%]"><p className="text-[13px] leading-relaxed">Hi Patricia, this is Tim from Top Choice Electrical. The work wrapped up just after 4. Receipt went to your email.</p><p className="text-[13px] leading-relaxed mt-2">If you have 20 seconds, would you mind dropping a quick Google review? g.co/r/topchoice</p></div></div>
                  <div className="flex justify-start"><div className="bg-divider/40 text-platinum rounded-2xl rounded-tl-md px-4 py-3 max-w-[88%]"><p className="text-[13px] leading-relaxed">All done, looks great. Will do, that was a fast turnaround.</p></div></div>
                  <div className="flex justify-end"><div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[88%]"><p className="text-[13px] leading-relaxed">Appreciate it. Tell Bill I said hi.</p></div></div>
                  <div className="pt-4 mt-2 border-t border-divider/40 flex items-center gap-2.5">
                    <div className="flex items-center gap-0.5 text-emerald-400 text-xs"><span aria-hidden>{'★'}</span><span aria-hidden>{'★'}</span><span aria-hidden>{'★'}</span><span aria-hidden>{'★'}</span><span aria-hidden>{'★'}</span></div>
                    <p className="text-emerald-400 text-xs font-medium">5 stars, posted 18 minutes later.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-mute text-[11px] leading-relaxed max-w-3xl mt-10">Not shown: AI receptionist for missed calls, automated quote follow-up at 24h/72h/7d, integrated booking calendar. All on the roadmap. None of them ship today.</p>
      </Moment>

      <Moment tone="dark" id="faq">
        <Eyebrow tone="dark">Questions</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-14 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>Read this before you click.</h2>
        <div className="space-y-3 max-w-4xl">
          <Faq question="What if I want to cancel?">You cancel any month. We hand you the website code, the Google Business Profile login, the customer list, and the review request flow keys. No locked-in dependencies.</Faq>
          <Faq question="What if you go out of business?">Your domain is registered to you. Your website lives on Vercel under your own account. Your Google Business Profile is yours. Your customer list lives in your CRM, not ours. If we vanish you keep everything that matters.</Faq>
          <Faq question="Why charge a percentage on new business?">Most agencies charge a flat fee whether they brought you anything or not. We dropped the flat fee down to almost nothing and put the rest on the work actually moving the needle. If the site does not bring you new bookings, we do not make money on the third row.</Faq>
          <Faq question="Can I just buy the website without the monthly?">Yes, but a site without ongoing care drifts. The Google profile goes stale. Review requests stop going out. Page speed degrades. After a year, an unmaintained site is roughly as effective as no site. The $149 a month is the thing that stops that from happening.</Faq>
          <Faq question="Will you take over my domain and Google account?">No. You stay the registered owner of your domain. We get added as a manager on your Google Business Profile so we can update hours, photos, and posts. If you part ways with us, we are removed. You keep the account.</Faq>
          <Faq question="What about the AI back office you keep mentioning?">It is on the roadmap, rolling out in 2026 for our pilot clients (Tim and Evert first). Booking, follow-up, review flow, Monday brief. Pricing for each layer gets set as it ships. The website is what you pay for today.</Faq>
          <Faq question="How exactly do you count new business?">Form submissions tagged at the source. Calls tracked through your Google Business Profile. New customers reconciled against your existing pipeline so we do not double-count. The report goes out every month before the invoice.</Faq>
        </div>
        <p className="text-mute text-xs sm:text-sm mt-10 leading-relaxed">Have more? Bring them to the call.</p>
      </Moment>

      <Moment tone="dark">
        <Eyebrow tone="dark">Start</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-10 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>Book the call.</h2>
        <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="group block bg-paper/[0.03] border border-divider/60 hover:border-elec/40 rounded-2xl p-8 sm:p-12 transition-colors max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-elec">30 minutes with Jacob</p>
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2 py-0.5">Free</span>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-4">Tell us about your business.</h3>
          <p className="text-platinum-soft text-base leading-relaxed mb-7">We walk through what you do, who you serve, what is broken, and what we would build. We pull the calculator with your real numbers. No pitch deck. No homework. If it is a fit, a proposal goes out the next day.</p>
          <span className="inline-flex items-center gap-2 text-elec font-semibold text-sm">
            Pick a time
            <span aria-hidden className="group-hover:translate-x-1 transition-transform">{'→'}</span>
          </span>
        </a>
        <p className="text-mute text-sm mt-6">Or email <a href="mailto:jacob@staybookt.com" className="text-platinum-soft hover:text-white transition-colors">jacob@staybookt.com</a> if a call does not work.</p>
      </Moment>

      <Moment tone="dark">
        <Eyebrow tone="dark">Team</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>Two humans. No layers.</h2>
        <p className="text-platinum-soft text-base sm:text-lg mb-14 max-w-2xl leading-relaxed">No agency layers. No junior account managers. You talk to a founder on day one and every day after.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <PersonCard initial="J" name="Jacob Charendoff" role="Co-founder · Builder" bio="Builds the websites and the back-office layer behind them. Background in operations and software for owner-operated businesses. Lives in Toronto." voiceQuote="If the site does not bring you anything in 90 days, something is broken. Tell me and I will fix it." meetWhen="On the kickoff call. In your Monday brief replies. Whenever you have a question." />
          <PersonCard initial="R" name="Richard Roos, CPA" role="Co-founder · Operator" bio="20 years across finance and operations. Runs intake, client relationships, and the parts of the work that need a senior voice. Lives in Newmarket." voiceQuote="I sign off the numbers before they go to a client. Always. That is what we are paid for." meetWhen="On the intro call before kickoff. In the quarterly review. Whenever the numbers need a second pair of eyes." />
        </div>
      </Moment>

      <FooterBlock />
    </main>
  );
}

function Flywheel() {
  const nodes = [
    { angle: -90, label: 'Discover', sub: 'Website + Google', isYou: false },
    { angle: -30, label: 'Capture', sub: 'AI lead agent', isYou: false },
    { angle: 30, label: 'Book', sub: 'AI booking', isYou: false },
    { angle: 90, label: 'Deliver', sub: 'You, on the tools', isYou: true },
    { angle: 150, label: 'Follow up', sub: 'AI review ask', isYou: false },
    { angle: 210, label: 'Bring back', sub: 'AI re-engage', isYou: false },
  ];
  const cx = 300;
  const cy = 300;
  const r = 200;
  const positions = nodes.map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return { ...n, x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  return (
    <svg viewBox="0 0 600 600" className="w-full max-w-xl mx-auto block" role="img" aria-label="Customer flywheel diagram">
      <defs>
        <linearGradient id="fw-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <marker id="fw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#06B6D4" />
        </marker>
      </defs>

      {/* Curved arcs clockwise between adjacent nodes */}
      {positions.map((from, i) => {
        const to = positions[(i + 1) % positions.length];
        return (
          <path
            key={`arc-${i}`}
            d={`M ${from.x} ${from.y} A ${r} ${r} 0 0 1 ${to.x} ${to.y}`}
            stroke="url(#fw-grad)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
            markerEnd="url(#fw-arrow)"
          />
        );
      })}

      {/* Center hub */}
      <circle cx={cx} cy={cy} r="68" fill="#050811" stroke="url(#fw-grad)" strokeWidth="2" />
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="700" fontFamily="ui-sans-serif, system-ui">
        Your customer
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="700" fontFamily="ui-sans-serif, system-ui">
        database
      </text>
      <text x={cx} y={cy + 30} textAnchor="middle" fill="#06B6D4" fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
        COMPOUNDS
      </text>

      {/* Nodes */}
      {positions.map((p, i) => (
        <g key={`node-${i}`}>
          <circle
            cx={p.x}
            cy={p.y}
            r="52"
            fill={p.isYou ? '#10B981' : '#141826'}
            stroke={p.isYou ? '#10B981' : '#06B6D4'}
            strokeWidth="2"
          />
          {p.isYou && (
            <circle
              cx={p.x}
              cy={p.y}
              r="58"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              opacity="0.4"
            >
              <animate attributeName="r" values="58;66;58" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
          )}
          <text
            x={p.x}
            y={p.y - 3}
            textAnchor="middle"
            fill={p.isYou ? '#050811' : '#ffffff'}
            fontSize="15"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui"
          >
            {p.label}
          </text>
          <text
            x={p.x}
            y={p.y + 14}
            textAnchor="middle"
            fill={p.isYou ? '#050811' : '#C7C7CC'}
            fontSize="10"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.5"
          >
            {p.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

function LeakBreakdown() {
  return (
    <div className="bg-paper/[0.03] border border-divider/60 rounded-2xl p-6 sm:p-8 mb-10 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-amber-400 mb-2">Where the $73K goes</p>
          <p className="text-platinum-soft text-sm leading-relaxed">Industry benchmarks for a $400K owner-operator</p>
        </div>
        <p className="font-display text-3xl sm:text-4xl text-brand-gradient tabular-nums leading-none">$73,000</p>
      </div>
      <div className="flex h-12 sm:h-14 rounded-lg overflow-hidden border border-divider/40">
        <div className="flex-[33] bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center" style={{ minWidth: '60px' }}>
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.12em] uppercase font-bold text-white">$24K</p>
        </div>
        <div className="flex-[42] bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center" style={{ minWidth: '60px' }}>
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.12em] uppercase font-bold text-white">$31K</p>
        </div>
        <div className="flex-[25] bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center" style={{ minWidth: '60px' }}>
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.12em] uppercase font-bold text-white">$18K</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-4">
        <LeakLegend swatch="bg-amber-500" label="Missed calls" />
        <LeakLegend swatch="bg-orange-500" label="Slow quote follow-up" />
        <LeakLegend swatch="bg-red-500" label="Missing reviews" />
      </div>
    </div>
  );
}

function LeakLegend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-sm ${swatch} shrink-0`} aria-hidden />
      <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-platinum-soft leading-tight">{label}</p>
    </div>
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
              <p className="text-mute text-sm mt-3 max-w-md leading-relaxed">A website that earns its keep. Paid for by the results. Built for Ontario service businesses under $1M.</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-3">
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="text-platinum hover:text-white text-sm font-semibold transition-colors">Book a 30-minute call</a>
              <a href="mailto:jacob@staybookt.com" className="text-mute hover:text-platinum-soft text-sm transition-colors">jacob@staybookt.com</a>
            </div>
          </div>
          <FooterBottomRow />
        </div>
      </ScrollReveal>
    </footer>
  );
}

function FooterBottomRow() {
  const wrap = "pt-8 border-t border-divider/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-mute";
  const linkRow = "flex flex-wrap items-center gap-x-6 gap-y-2";
  const linkCls = "hover:text-platinum-soft transition-colors";
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
  eyebrow, name, role, location, url, href, quote, reverse, frameType,
  statusBadge, customerReview, outcomeStats, outcomeTrackingNote,
}: {
  eyebrow: string; name: string; role: string; location: string; url: string;
  href: string; quote: string; reverse?: boolean; frameType?: 'macbook' | 'iphone';
  statusBadge?: string;
  customerReview?: { text: string; author: string; authorLocation?: string; via: string; when?: string };
  outcomeStats?: { value: string; label: string }[];
  outcomeTrackingNote?: string;
}) {
  const isMac = frameType === 'macbook';
  const isPhone = frameType === 'iphone';
  const deviceWrap = ['relative bg-stone-100 group', isMac ? 'lg:col-span-3 flex flex-col justify-center p-5 sm:p-6' : isPhone ? 'lg:col-span-2 flex items-center justify-center py-10 sm:py-14' : 'lg:col-span-2 aspect-[4/3] lg:aspect-auto overflow-hidden'].join(' ');
  const iframeCls = "border-0 pointer-events-none [width:1400px] [height:900px] [transform-origin:top_left] [transform:scale(0.36)] sm:[transform:scale(0.45)] xl:[transform:scale(0.55)]";
  const fallbackIframeCls = "border-0 pointer-events-none [width:1400px] [height:900px] [transform-origin:top_left] [transform:scale(0.4)] sm:[transform:scale(0.5)]";

  const deviceCol = (
    <div className={deviceWrap}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label={`Open ${name}'s live site`} />
      {isMac && (
        <MacBookFrame>
          <iframe src={href} title={`${name} live site`} loading="lazy" sandbox="allow-same-origin allow-scripts allow-popups" className={iframeCls} />
        </MacBookFrame>
      )}
      {isPhone && (
        <div className="w-full max-w-[260px]">
          <IPhoneFrame>
            <iframe src={href} title={`${name} live site`} loading="lazy" sandbox="allow-same-origin allow-scripts allow-popups" className="border-0 pointer-events-none" style={{ width: '430px', height: '900px', transformOrigin: 'top left', transform: 'scale(0.56)' }} />
          </IPhoneFrame>
        </div>
      )}
      {!isMac && !isPhone && (
        <div className="absolute inset-0 overflow-hidden">
          <iframe src={href} title={`${name} live site`} loading="lazy" sandbox="allow-same-origin allow-scripts allow-popups" className={fallbackIframeCls} />
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
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold text-emerald-700">{statusBadge}</p>
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
          <p className="text-stone-800 text-base sm:text-lg italic leading-snug">{'“'}{quote}{'”'}</p>
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
          <p className="text-stone-700 text-sm leading-relaxed mb-4">{'“'}{customerReview.text}{'”'}</p>
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

function PriceCell({ amount, detail, highlight }: { amount: string; detail: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 ${highlight ? 'bg-emerald-50 border-2 border-emerald-300' : 'bg-white border border-stone-200'}`}>
      <p className={`font-display text-2xl sm:text-3xl tracking-tight leading-none mb-3 ${highlight ? 'text-emerald-700' : 'text-stone-900'}`}>{amount}</p>
      <p className="text-stone-600 text-sm leading-snug">{detail}</p>
    </div>
  );
}

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
          <p className="text-platinum text-sm italic leading-relaxed">{'“'}{voiceQuote}{'”'}</p>
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
