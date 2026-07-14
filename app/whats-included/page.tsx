import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import Coming from '@/components/v4/Coming';
import { START_LINK } from '@/lib/site';

const SHARE =
  'The whole list, in plain English. Everything $199 a month actually buys, what you still do, and the things we do not do.';

export const metadata = {
  title: "What's included",
  description: SHARE,
  alternates: { canonical: '/whats-included' },
  openGraph: {
    title: "What's included · StayBookt",
    description: SHARE,
    url: 'https://www.staybookt.com/whats-included',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: "What's included · StayBookt", description: SHARE },
};

type Group = { n: string; k: string; h: string; p: string; items: string[] };

const GROUPS: Group[] = [
  {
    n: '01',
    k: 'Get found',
    h: 'Your website',
    p: 'Built for you, hosted for you, and yours to keep. Nothing for you to manage or update.',
    items: [
      'A custom website, built from scratch for your business',
      'Fast, and built mobile first, because that is where your customers are',
      'A tap-to-call button on every screen, so calling you takes one thumb',
      'Online booking wired straight into your calendar',
      'Your real work, your real reviews, your real service area',
      'Hosting, security, and updates handled. You never touch it',
      'Written in your voice, not marketing filler',
    ],
  },
  {
    n: '02',
    k: 'Get found',
    h: 'Showing up when they look',
    p: 'The website is only half of it. Most of your customers find you on Google or by asking, so we work on both.',
    items: [
      'Your Google Business Profile rebuilt, filled out properly, and kept current',
      'Photos, services, hours, and service area, all correct and consistent',
      'Your name, address, and phone number made identical everywhere online, which is what Google actually trusts',
      'Local search work so you climb the map for the searches that matter in your area',
      'Set up so you show up when someone asks an AI assistant for what you do, nearby',
      'Your listings on the directories that feed the search engines',
    ],
  },
  {
    n: '03',
    k: 'StayBookt',
    h: 'We answer. Every time.',
    p: 'This is the part that changes your life. The phone gets answered whether you are on a job, driving to the next one, or asleep.',
    items: [
      'Every call answered, 24 hours a day, seven days a week',
      'Every text answered, in your voice, using your prices and your rules',
      'Website forms, Google messages, and emails, all caught in the same place',
      'The caller gets a real answer, not a voicemail and not a promise to call back',
      'Anything unusual goes to a real person on our team before it ever reaches your customer',
      'Your number stays your number. Nothing about it changes for your customers',
    ],
  },
  {
    n: '04',
    k: 'StayBookt',
    h: 'We book the job.',
    p: 'Answering is worth nothing if it does not end up on the calendar. So we take it all the way.',
    items: [
      'The job goes straight onto your calendar, in the slot that works',
      'The customer gets a confirmation, so they know it is real',
      'Reminders before the visit, so they are actually home when you get there',
      'Reschedules and cancellations handled without you touching your phone',
      'Emergency and after-hours calls sorted against the rules you set: what is urgent, what waits until morning, and what is worth waking you up for',
    ],
  },
  {
    n: '05',
    k: 'StayBookt',
    h: 'We chase the money.',
    p: 'The quote you sent on Thursday and forgot about is the most expensive thing in your business. We do not forget.',
    items: [
      'Every quote goes out, in your format, at your prices',
      'Every quote gets followed up until you have a yes or a no. Not a maybe',
      'Unpaid invoices chased, politely and persistently, so the money actually lands',
      'You see what is outstanding, what is won, and what went cold, without digging',
    ],
  },
  {
    n: '06',
    k: 'StayBookt',
    h: 'We grow the customers you already have.',
    p: 'The cheapest job you will ever win is the second one from someone who already likes you.',
    items: [
      'A review asked for after every finished job, at the right moment',
      'Referrals asked for from the customers who are happy',
      'Past customers brought back for the work they are due',
      'Follow-up maintenance booked before they drift to someone else',
      'The right upsell suggested, only where it honestly makes sense',
    ],
  },
  {
    n: '07',
    k: 'StayBookt',
    h: 'One short brief a day.',
    p: 'You are not logging into anything. You get thirty seconds of what matters, and then you go run your day.',
    items: [
      'What is booked today, and who is expecting you',
      'Anything that needs a decision from you, and nothing that does not',
      'What came in overnight and how it was handled',
      'A monthly report of what actually happened: calls, bookings, quotes, reviews, revenue',
      'No dashboard you are forced to live in. No software to learn',
    ],
  },
];

const HUMAN = [
  {
    h: 'The AI does the everyday.',
    p: 'The routine calls, texts, bookings, confirmations, reminders, and follow-ups. It is trained on your prices, your service area, the jobs you take, and how you talk to a customer. It is fast, it never sleeps, and it never gets tired at 11pm.',
  },
  {
    h: 'A person steps in on anything unusual.',
    p: 'The AI knows when it is out of its depth. Anything it is not sure about, anything unusual, and anything high-stakes gets pulled by a real person on our team before it ever reaches your customer. That is the whole point of the safety net. You are never the one picking up the slack.',
  },
  {
    h: 'And a couple of times a week, we ask you.',
    p: 'When something genuinely needs your judgment, it comes to you as a short question with the context attached. Not a support ticket. Not a queue. Usually one or two a week.',
  },
];

const YOURS = [
  'The work itself. You show up, you do the job, you get paid directly',
  'The big calls: your prices, new services, who you hire, where you work',
  'A couple of edge cases a week where we ask what you would do',
  'Thirty seconds on the morning brief',
];

const NOT = [
  {
    h: 'We do not do your books.',
    p: 'We chase what is owed and show you what came in. We are not your bookkeeper and we do not file your taxes.',
  },
  {
    h: 'We do not take your money.',
    p: 'Your customers pay you, directly, the way they always have. We never sit between you and your money.',
  },
  {
    h: 'We do not dispatch your crew.',
    p: 'We book the work and hand you a clean calendar. Who goes where, and in what truck, is still your call.',
  },
  {
    h: 'We do not spend your money on ads.',
    p: 'The plan is organic: your site, your Google presence, your reviews, your existing customers. If paid advertising ever makes sense, that is a separate conversation, and we will tell you honestly if we do not think you need it.',
  },
  {
    h: 'We do not promise you a number of leads.',
    p: 'Anyone who does is guessing. We promise that nothing that comes in gets dropped, and we show you the real numbers every month.',
  },
  {
    h: 'We do not pretend we will never get one wrong.',
    p: 'We answer in your voice, from your prices, and a person checks anything unusual before it reaches your customer. But if a wrong number ever does get out, we bring it straight to you, you decide what you want to honour, and we are the ones who go back to the customer and sort it out. You will hear it from us before you hear it from them, and you are never the one making that phone call.',
  },
  {
    h: 'We do not lock you in.',
    p: 'No term, no contract to be trapped in, no exit fee. Cancel any time on thirty days notice. We build the whole thing before you have paid us a dollar, which means the risk is ours, and it should be.',
  },
];

const KEEP = [
  'The website. Yours, permanently',
  'Your domain, in your name',
  'Your Google Business Profile login',
  'Your customer list, exported whenever you want it',
  'Your reviews, which were always yours anyway',
];

const CSS = `
.inc{background:#fff;color:var(--v4-ink);}
.inc .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.inc .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.inc h1,.inc h2,.inc h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.inc-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 30px;text-decoration:none;transition:transform .3s ease;}
.inc-btn:hover{transform:translateY(-1px);}

/* hero */
.inc-hero{position:relative;background:#050506;text-align:center;padding:clamp(140px,18vh,210px) 0 clamp(70px,9vw,110px);overflow:hidden;}
.inc-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(62% 52% at 50% 0%,rgba(16,185,129,.15),transparent 62%);pointer-events:none;}
.inc-hero .wrap{position:relative;}
.inc-hero .eyebrow{color:#c9cdd6;}
.inc-hero h1{margin-top:18px;font-size:clamp(42px,6.6vw,86px);line-height:1.0;max-width:14ch;margin-left:auto;margin-right:auto;color:#f5f5f7;}
.inc-hero p{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);line-height:1.45;color:#aeb4c0;max-width:46ch;}
.inc-hero .price{margin:30px auto 0;display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:11px 20px;font-size:14.5px;color:#e5e9ef;}
.inc-hero .price b{font-weight:600;color:#fff;}

/* groups */
.inc-list{padding:clamp(70px,9vw,120px) 0;}
.grp{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(28px,5vw,72px);padding:clamp(38px,5vw,60px) 0;border-top:1px solid #ececf0;}
.grp:first-child{border-top:0;padding-top:0;}
.grp .lead .n{font-size:12.5px;font-weight:700;letter-spacing:.16em;color:#c4c9d0;}
.grp .lead .k{margin-top:10px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#059669;}
.grp .lead h2{margin-top:8px;font-size:clamp(26px,3.2vw,40px);line-height:1.06;}
.grp .lead p{margin-top:14px;font-size:16px;line-height:1.6;color:#6b7280;max-width:34ch;}
.grp ul{list-style:none;margin:0;padding:0;}
.grp li{display:grid;grid-template-columns:20px 1fr;gap:13px;align-items:start;padding:13px 0;border-top:1px solid #f2f2f5;font-size:16px;line-height:1.55;color:#33373e;}
.grp li:first-child{border-top:0;padding-top:0;}
.grp li svg{margin-top:5px;}
@media(max-width:860px){.grp{grid-template-columns:1fr;gap:24px;}.grp .lead p{max-width:46ch;}}

/* human */
.inc-human{background:var(--v4-cream);padding:clamp(80px,11vw,140px) 0;}
.inc-human .hd{text-align:center;max-width:620px;margin:0 auto clamp(38px,5vw,58px);}
.inc-human .hd h2{margin-top:14px;font-size:clamp(30px,4.2vw,52px);line-height:1.05;}
.inc-human .hd p{margin-top:16px;font-size:17px;line-height:1.6;color:#6b7280;}
.inc-human .row{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.inc-human .c{background:#fff;border:1px solid #e9e9e5;border-radius:22px;padding:clamp(24px,3vw,32px);box-shadow:0 26px 54px -42px rgba(6,12,20,.4);}
.inc-human .c h3{font-size:19px;line-height:1.25;}
.inc-human .c p{margin-top:12px;font-size:15px;line-height:1.6;color:#6b7280;}
@media(max-width:860px){.inc-human .row{grid-template-columns:1fr;}}

/* you / not */
.inc-split{padding:clamp(80px,11vw,140px) 0;}
.inc-split .two{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,6vw,80px);}
.inc-split h2{font-size:clamp(26px,3.2vw,40px);line-height:1.06;}
.inc-split .sub{margin-top:14px;font-size:16px;line-height:1.6;color:#6b7280;max-width:36ch;}
.inc-split ul{list-style:none;margin:26px 0 0;padding:0;}
.inc-split li{display:grid;grid-template-columns:20px 1fr;gap:12px;padding:13px 0;border-top:1px solid #f2f2f5;font-size:16px;line-height:1.55;color:#33373e;}
.inc-split li svg{margin-top:5px;}
@media(max-width:860px){.inc-split .two{grid-template-columns:1fr;gap:48px;}}

/* not-a-list (honest limits) */
.inc-not{background:#050506;color:#f5f5f7;padding:clamp(80px,11vw,140px) 0;}
.inc-not h2{color:#f5f5f7;font-size:clamp(30px,4.2vw,52px);line-height:1.05;max-width:16ch;}
.inc-not .eyebrow{color:#86868b;}
.inc-not .sub{margin-top:18px;font-size:17px;line-height:1.6;color:#aeb4c0;max-width:46ch;}
.inc-not .grid{margin-top:clamp(38px,5vw,56px);display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.09);border-radius:22px;overflow:hidden;}
.inc-not .cell{background:#050506;padding:clamp(24px,3vw,32px);}
.inc-not .cell h3{color:#f5f5f7;font-size:18px;line-height:1.3;}
.inc-not .cell p{margin-top:11px;font-size:15px;line-height:1.6;color:#9aa0ab;}
@media(max-width:760px){.inc-not .grid{grid-template-columns:1fr;}}

/* closer */
.inc-close{text-align:center;padding:clamp(100px,14vw,180px) 0;background:#fff;}
.inc-close h2{font-size:clamp(34px,5.4vw,72px);line-height:1.0;max-width:17ch;margin:0 auto;}
.inc-close p{margin:24px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.55;color:#52565e;max-width:44ch;}
.inc-close .cta{margin-top:34px;}
.inc-close .fine{margin-top:22px;font-size:15px;color:#8a8f98;}
.inc-close .fine a{color:#0284c7;text-decoration:none;font-weight:600;}
`;

function Tick() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
    </svg>
  );
}

function Dot() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9298a1" strokeWidth={2.4} aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

export default function WhatsIncludedPage() {
  return (
    <main className="inc">
      <style>{CSS}</style>
      <Nav />

      <header className="inc-hero">
        <div className="wrap">
          <div className="eyebrow">What&apos;s included</div>
          <h1>Everything, in plain English.</h1>
          <p>
            The whole list. No asterisks, no fine print. Here is exactly what we do, what you still
            do, and the things we do not do.
          </p>
          <div className="price">
            <b>$199 a month</b>, plus applicable taxes. Nothing upfront. No lock-in, cancel on
            thirty days notice. Ninety days to change your mind, for any reason.
          </div>
        </div>
      </header>

      <section className="inc-list">
        <div className="wrap">
          {GROUPS.map((g) => (
            <div className="grp" key={g.h}>
              <div className="lead">
                <div className="n">{g.n}</div>
                <div className="k">{g.k}</div>
                <h2>{g.h}</h2>
                <p>{g.p}</p>
              </div>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>
                    <Tick />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="inc-human">
        <div className="wrap">
          <div className="hd">
            <div className="eyebrow">The honest bit</div>
            <h2>Is it AI, or a real person?</h2>
            <p>
              Both, on purpose. Anyone telling you it is all human is lying about the price. Anyone
              telling you it is all AI is lying about the quality.
            </p>
          </div>
          <div className="row">
            {HUMAN.map((h) => (
              <div className="c" key={h.h}>
                <h3>{h.h}</h3>
                <p>{h.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inc-split">
        <div className="wrap">
          <div className="two">
            <div>
              <div className="eyebrow">Still yours</div>
              <h2 style={{ marginTop: 14 }}>What you still do.</h2>
              <p className="sub">
                Short list, on purpose. If it grows, we have built the wrong thing.
              </p>
              <ul>
                {YOURS.map((y) => (
                  <li key={y}>
                    <Dot />
                    <span>{y}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow">Yours to keep</div>
              <h2 style={{ marginTop: 14 }}>What you own, forever.</h2>
              <p className="sub">
                If we ever part ways, you walk out with everything that matters. Nothing here is
                held hostage.
              </p>
              <ul>
                {KEEP.map((k) => (
                  <li key={k}>
                    <Tick />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="inc-not">
        <div className="wrap">
          <div className="eyebrow">Just as important</div>
          <h2 style={{ marginTop: 14 }}>What we do not do.</h2>
          <p className="sub">
            Every company shows you the list of what they include. Almost nobody shows you the other
            list. Here it is, so nothing is a surprise on month two.
          </p>
          <div className="grid">
            {NOT.map((n) => (
              <div className="cell" key={n.h}>
                <h3>{n.h}</h3>
                <p>{n.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE THIS IS GOING. Fenced, dark, and explicitly not-yet. It sits AFTER
          "what we do not do" on purpose: the list of what $199 buys today has to
          stay clean. A roadmap mixed into that list reads as a bait-and-switch,
          and we have watched a reader quit at exactly that moment. */}
      <Coming />

      <section className="inc-close">
        <div className="wrap">
          <h2>That is the whole list.</h2>
          <p>
            If something on it is not what you need, tell us on the call and we will say so. We
            would rather lose the sale than sell you the wrong thing.
          </p>
          <div className="cta">
            <a className="inc-btn" href={START_LINK}>
              Pick a time
            </a>
          </div>
          <p className="fine">
            Want the story instead of the list? <a href="/how-it-works">See how it works</a>
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
