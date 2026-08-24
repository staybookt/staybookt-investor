import type { Metadata } from 'next';
import './agents.css';
import WaitlistForm from './WaitlistForm';

/* /agents — the first public surface of the StayBookt real estate wing.
 *
 * This page sells a DIFFERENT, UNBUILT product to a DIFFERENT buyer than the rest of
 * this site. The corp site sells $199/mo Service-as-Software to owner-operated service
 * businesses, today. This sells a back office for individual Ontario real estate agents,
 * later. Keep them separate:
 *   - It is deliberately not in the corp nav. Traffic comes from outbound, not browsing.
 *   - CallBar is suppressed here (see components/v4/CallBar.tsx). Its two buttons are
 *     "Call now" and "Get Started", and Get Started goes to /start, which sells the
 *     service-business product. Sending an agent there is a bait and switch.
 *   - NOTE THE COLLISION: /journeys/real-estate-agent already sells the CURRENT product
 *     to an agent audience. Two live pages now speak to agents about different things.
 *     That needs resolving before we drive any real volume here.
 *
 * Copy rules this page follows, and why (full reasoning in the staybookt-re-wing note):
 *   - Leads with mental load, not hours saved. Ease of use out-ranks both cost and time
 *     savings as agents' buying criterion.
 *   - Does not say "AI" once. 46% of agents report AI has had no impact on their
 *     business and 32% have never used it. Half this audience is a skeptic.
 *   - Does not say "we are not Zillow". True and useful in the US, a non-sequitur in the
 *     GTA where Zillow is not a factor. The four promises carry the same idea and travel.
 *   - Ontario vocabulary throughout: registered, brokerage, sold firm, conditions, the
 *     status certificate, Form 100, the BRA. An American translation reads false on the
 *     second click.
 *   - No testimonials, no logos, no product screenshots. None exist yet. See the /work
 *     incident before adding any.
 */

const TITLE = 'For Ontario agents';
const DESCRIPTION =
  'An agent is a business of one with no back office. We are building the one they never had. Ontario first. Join the waitlist.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/agents' },
  openGraph: {
    title: 'Nobody gets registered to run an office.',
    description: DESCRIPTION,
    url: 'https://www.staybookt.com/agents',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nobody gets registered to run an office.',
    description: DESCRIPTION,
  },
};

export default function AgentsPage() {
  return (
    <div className="rew-page">
      <nav className="rew-nav" aria-label="Real estate">
        <div className="rew-nav-in">
          <a className="rew-mark" href="/agents">
            <span>
              Stay<span className="rew-g">Bookt</span>
              <span className="rew-dot">.</span>
            </span>
            <span className="rew-div" />
            <span className="rew-tag">Real Estate</span>
          </a>
          <a className="rew-btn" href="#waitlist" data-cta="agents_nav">
            Join the waitlist
          </a>
        </div>
      </nav>

      <main id="main">
        <header className="rew-hero">
          <div className="rew-aurora" />
          <div className="rew-wrap">
            <span className="rew-eyebrow">A StayBookt company &middot; Building in Ontario</span>
            <h1>
              Nobody gets registered
              <span className="rew-p">
                to run an office<span className="rew-dot">.</span>
              </span>
            </h1>
            <p className="rew-sub">We are building the back office Ontario agents never had.</p>
            <div className="rew-hero-cta">
              <a className="rew-btn rew-btn-lg" href="#waitlist" data-cta="agents_hero">
                Join the waitlist
              </a>
            </div>
            <p className="rew-micro">Ontario first. No card, no pitch, no lead resale.</p>
          </div>
        </header>

        {/* 01 — the arithmetic. Every number here is sourced in the line underneath.
            Nothing on this page is estimated, rounded up, or borrowed from a deck. */}
        <section>
          <div className="rew-wrap">
            <p className="rew-label">
              <i>01</i> &nbsp;/&nbsp; The arithmetic
            </p>
            <h2>
              The job you signed up for
              <br />
              is a fraction of the week.
            </h2>

            <div className="rew-facts">
              <div className="rew-fact">
                <div className="rew-n">35 hrs</div>
                <div className="rew-t">
                  The median week for a working agent. In that week the median agent closes{' '}
                  <b>ten deals a year</b>, and nets <b>$36,600</b> after taxes and expenses.
                </div>
              </div>
              <div className="rew-fact">
                <div className="rew-n">4 to 8 hrs</div>
                <div className="rew-t">
                  Contracts and paperwork on a single deal. At ten deals that is{' '}
                  <b>one to two full working weeks a year</b> spent inside a document.
                </div>
              </div>
              <div className="rew-fact">
                <div className="rew-n">5+ hrs</div>
                <div className="rew-t">
                  A week spent booking and confirming showings. That is the point at which the
                  industry tells you to <b>go hire somebody</b>.
                </div>
              </div>
              <div className="rew-fact">
                <div className="rew-n">90%</div>
                <div className="rew-t">
                  Of agents report problems with client documents and contracts.{' '}
                  <b>One percent</b> of buyers arrive with their paperwork in order.
                </div>
              </div>
            </div>

            <p className="rew-src">
              Sources: NAR 2025 Member Profile, US data (hours, transactions, net income).
              Transaction-coordination industry benchmarks (paperwork hours, showing
              coordination). Adobe survey of 516 realtors, 2024 (document challenges).
            </p>
          </div>
        </section>

        {/* 02 — the thesis. The one idea the whole wing rests on, alone on a dark slab. */}
        <section className="rew-dark rew-thesis">
          <div className="rew-narrow">
            <p className="rew-label">
              <i>02</i> &nbsp;/&nbsp; The thesis
            </p>
            <h2>
              An agent is a business of one
              <br />
              <span className="rew-g">with no back office.</span>
            </h2>
            <p className="rew-lede">
              Every other business your size hires somebody for this. You bought software
              instead. Now you run that too.
            </p>
          </div>
        </section>

        {/* 03 — what we are building. Three moments, not a feature list. The tour planner
            is the genuinely empty gap in this market: no showing product does route
            optimisation, and in Ontario BrokerBay is the board-wide booking rail. */}
        <section>
          <div className="rew-wrap">
            <p className="rew-label">
              <i>03</i> &nbsp;/&nbsp; What we are building
            </p>
            <h2>
              Three moments where
              <br />
              the week disappears.
            </h2>

            <div className="rew-stack">
              <div className="rew-step">
                <div className="rew-i">01</div>
                <div>
                  <h3>Before the listing appointment</h3>
                  <p>
                    Comps pulled, the neighbourhood read, the package drafted. You walk in with
                    the work already done and spend the hour on the conversation instead of the
                    printout.
                  </p>
                </div>
              </div>
              <div className="rew-step">
                <div className="rew-i">02</div>
                <div>
                  <h3>Before the tour</h3>
                  <p>
                    The route, the windows, the drive times, the order. Sequenced the way you
                    would do it yourself. Strong listing first, strong listing last, short
                    windows at the end so you are never the agent who overstayed.
                  </p>
                </div>
              </div>
              <div className="rew-step">
                <div className="rew-i">03</div>
                <div>
                  <h3>After the handshake</h3>
                  <p>
                    The follow-up that actually happens. The birthday, the closing anniversary,
                    the check-in at eleven months. Not another task list you feel guilty about at
                    midnight.
                  </p>
                </div>
              </div>
            </div>

            <p className="rew-caveat">
              That is the first release. It is not everything. We would rather do three things
              properly than forty badly, and we would rather show you than tell you.
            </p>
          </div>
        </section>

        {/* 04 — the trust spine. This is the brand. It replaces "we are not Zillow", which
            does not travel to Ontario. Every line here has to end up in the terms of
            service, or it is just a headline. */}
        <section className="rew-dark">
          <div className="rew-wrap">
            <p className="rew-label">
              <i>04</i> &nbsp;/&nbsp; The part that matters
            </p>
            <h2>Your database is yours.</h2>

            <div className="rew-promises">
              <div className="rew-promise">We do not sell leads.</div>
              <div className="rew-promise">We do not run a portal.</div>
              <div className="rew-promise">We will never contact your clients.</div>
              <div className="rew-promise">Leave whenever you want and take all of it with you.</div>
            </div>

            <p className="rew-note">
              In November 2025 one of the largest CRMs in this industry changed its privacy terms
              so its parent company could follow up with contacts sitting in agents&rsquo; own
              databases. That is the business we are not in, and we will put it in writing.
            </p>
          </div>
        </section>

        {/* 05 — why Ontario first. This section exists to prove nativeness in ten seconds.
            The vocabulary is the proof; do not soften it into general Canadian English. */}
        <section>
          <div className="rew-wrap">
            <p className="rew-label">
              <i>05</i> &nbsp;/&nbsp; Why Ontario first
            </p>
            <div className="rew-split">
              <h2>Built for the board you actually belong to.</h2>
              <div>
                <p>
                  Sold firm, not pending. <strong>Conditions</strong>, not contingencies. Form 100
                  and Form 101. The BRA. The status certificate, the holdover, the waiver.
                </p>
                <p>
                  TRESA rules, RECO obligations, FINTRAC records. Most agent software is written
                  in the United States and translated badly, and you can feel it on the second
                  click.
                </p>
                <p>
                  We are starting with <strong>TRREB and the Ontario boards</strong>, and we are
                  staying here until it works properly. Everywhere else can wait.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — the waitlist. The deal-count question is the important one: it tells us
            whether we are talking to the 10.7% of the board who actually trade. */}
        <section className="rew-signup" id="waitlist">
          <div className="rew-wrap">
            <p className="rew-label">
              <i>06</i> &nbsp;/&nbsp; The waitlist
            </p>
            <h2>
              We are picking a small
              <br />
              first group.
            </h2>
            <p className="rew-lede">
              Ontario agents working the business right now. Tell us what eats your week and we
              will build against it. Nothing is live yet, and we are not going to pretend
              otherwise.
            </p>
            <WaitlistForm />
          </div>
        </section>
      </main>

      <footer className="rew-foot">
        <div className="rew-wrap rew-foot-in">
          <div>
            <div className="rew-mark">
              <span>
                Stay<span className="rew-g">Bookt</span>
                <span className="rew-dot">.</span>
              </span>
            </div>
            <div className="rew-parent">Real Estate is a StayBookt company.</div>
          </div>
          <div>
            <a href="mailto:info@staybookt.com">info@staybookt.com</a>
            &nbsp;&middot;&nbsp;
            <a href="tel:+19057178264">(905) 717-8264</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
