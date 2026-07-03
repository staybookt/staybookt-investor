// Platform preview mockups. These are illustrative concept screens of the
// StayBookt operating layer, which is rolling out through 2026. Every screen
// is labeled "Preview" so no one mistakes it for live, shipped product or
// real customer data. Numbers are sample data, clearly fictional.

import React from 'react';

export function PreviewPill({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-elec/40 bg-elec/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-light ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-elec animate-pulse" />
      Preview
    </span>
  );
}

// Thin window chrome wrapper so each screen reads as "a product."
function AppFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
  accent?: 'elec' | 'hvac';
}) {
  return (
    <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.015] p-6 sm:p-7">
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-mute">{title}</p>
      <div>{children}</div>
    </div>
  );
}

/* 1. DASHBOARD — the owner's morning glance */
export function DashboardScreen() {
  const stats = [
    { label: 'New leads today', value: '7', sub: 'all answered', tone: 'elec' },
    { label: 'Jobs booked', value: '5', sub: 'this week', tone: 'hvac' },
    { label: 'Follow-ups sent', value: '23', sub: 'automatically', tone: 'elec' },
    { label: 'Reviews requested', value: '4', sub: '2 came back 5★', tone: 'hvac' },
  ];
  return (
    <AppFrame title="Dashboard — Today">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-mute">Good morning</p>
          <p className="font-semibold text-white">Here is what happened while you worked.</p>
        </div>
        <span className="rounded-md bg-hvac/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-hvac-light">
          Nothing needs you
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-mute">{s.label}</p>
            <p className={`mt-1 font-display text-3xl leading-none ${s.tone === 'hvac' ? 'text-hvac-light' : 'text-elec-light'}`}>{s.value}</p>
            <p className="mt-1 text-[11px] text-mute-dark">{s.sub}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.02] p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-platinum-soft">Pipeline this week</p>
          <p className="text-[11px] text-mute">sample data</p>
        </div>
        <div className="flex items-end gap-2 h-20">
          {[40, 55, 35, 70, 60, 85, 50].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-elec/30 to-elec" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-mute">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>
    </AppFrame>
  );
}

/* 2. AI RECEPTIONIST — a real-feeling text thread, always on */
export function ReceptionistScreen() {
  const thread = [
    { from: 'them', t: 'Hi, my AC stopped working. Can someone come today?' },
    { from: 'us', t: 'Hi Sarah, sorry to hear that. We can get a tech to you today. Are you at 14 Maple Crescent?' },
    { from: 'them', t: 'Yes that is right.' },
    { from: 'us', t: 'Great. I can do 2:00pm or 4:30pm today. Which works?' },
    { from: 'them', t: '2pm please' },
    { from: 'us', t: "Booked. You'll get a text reminder at 1pm. Anything else I can help with?" },
  ];
  return (
    <AppFrame title="AI Receptionist — always on" accent="hvac">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-mute">Inbound · 2:14 a.m. · answered in 4 seconds</p>
        <span className="rounded-md bg-hvac/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-hvac-light">Booked</span>
      </div>
      <div className="space-y-2.5">
        {thread.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'us' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${
                m.from === 'us'
                  ? 'rounded-br-sm bg-elec text-ink'
                  : 'rounded-bl-sm border border-white/10 bg-white/[0.04] text-platinum'
              }`}
            >
              {m.t}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-mute">Always on. It answers every call and text, day or night, and escalates to you only when it should.</p>
    </AppFrame>
  );
}

/* 3. MORNING BRIEF — the configurable owner brief, bookended by an end-of-day debrief */
export function BriefScreen() {
  const lines = [
    { k: 'Booked last week', v: '11 jobs', good: true },
    { k: 'Revenue booked', v: '$14,200', good: true },
    { k: 'Leads recovered (would have been missed)', v: '3', good: true },
    { k: 'Reviews added to your profile', v: '4 new, 4.9★ avg', good: true },
    { k: 'Needs your call', v: '1 quote over $5k', good: false },
  ];
  return (
    <AppFrame title="Morning Brief — your day in 30 seconds">
      <p className="mb-3 text-sm text-platinum">
        Here is your business. <span className="text-mute">No dashboard to log into. It comes to you.</span>
      </p>
      <div className="divide-y divide-white/8 rounded-xl border border-white/8 bg-white/[0.02]">
        {lines.map((l) => (
          <div key={l.k} className="flex items-center justify-between gap-4 px-4 py-3">
            <span className="text-[13px] text-platinum-soft">{l.k}</span>
            <span className={`text-[13px] font-semibold ${l.good ? 'text-hvac-light' : 'text-elec-light'}`}>{l.v}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-mute">Sample brief. Runs every morning, or weekly, your call. An end-of-day debrief bookends it with what got done.</p>
    </AppFrame>
  );
}

/* 4. REVIEW FLOW — request to 5 stars */
export function ReviewScreen() {
  return (
    <AppFrame title="Reviews — automatic after every job" accent="hvac">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-mute">We send, automatically</p>
          <div className="mt-2 rounded-lg bg-elec/10 p-3 text-[13px] text-platinum">
            "Thanks for choosing us today, Sarah. If we did good work, a quick review really helps. Tap here ⭐"
          </div>
          <p className="mt-2 text-[11px] text-mute">Sent 2 hours after the job is marked complete.</p>
        </div>
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-mute">What lands on your profile</p>
          <div className="mt-2 space-y-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
              <div className="text-hvac-light text-sm">★★★★★</div>
              <p className="mt-1 text-[12px] text-platinum-soft">"Same day fix, friendly tech, fair price."</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
              <div className="text-hvac-light text-sm">★★★★★</div>
              <p className="mt-1 text-[12px] text-platinum-soft">"Booked by text in two minutes. Easy."</p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-mute">Sample reviews. More reviews lift you in local search, which brings more calls.</p>
    </AppFrame>
  );
}

/* 5. BOOKING CALENDAR — the week filling itself */
export function BookingScreen() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const slots = [
    ['', 'AC repair', '', 'Install', ''],
    ['Tune-up', '', 'Quote', '', 'Service'],
    ['', 'Service', 'AC repair', '', 'Quote'],
    ['Install', '', '', 'Tune-up', ''],
  ];
  const times = ['9:00', '11:00', '1:00', '3:00'];
  return (
    <AppFrame title="Booking — your calendar, kept full">
      <div className="grid grid-cols-6 gap-1.5 text-center">
        <div />
        {days.map((d) => (
          <div key={d} className="text-[10px] font-semibold uppercase tracking-wide text-mute">{d}</div>
        ))}
        {slots.map((row, ri) => (
          <React.Fragment key={ri}>
            <div className="flex items-center justify-end pr-1 text-[10px] text-mute">{times[ri]}</div>
            {row.map((cell, ci) => (
              <div
                key={ci}
                className={`rounded-md py-2 text-[10px] font-medium ${
                  cell
                    ? 'border border-elec/30 bg-elec/15 text-elec-light'
                    : 'border border-dashed border-white/8 text-transparent'
                }`}
              >
                {cell || '·'}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-mute">Sample week. Customers book themselves. Reminders go out so they show up.</p>
    </AppFrame>
  );
}

/* 6. QUOTES & FOLLOW-UP — nothing goes cold, everything tracked */
export function QuoteFollowupScreen() {
  const rows = [
    { job: 'Panel upgrade · R. Okafor', amount: '$3,200', status: 'Sent', note: 'Auto follow-up in 2 days', tone: 'elec' },
    { job: 'AC install · Sarah M.', amount: '$6,800', status: 'Followed up', note: 'Nudge sent this morning', tone: 'elec' },
    { job: 'Service call · The Patels', amount: '$480', status: 'Won', note: 'Booked for Thursday', tone: 'hvac' },
    { job: 'Rewire · J. Diaz', amount: '$9,400', status: 'Needs you', note: 'Over $5k, your call', tone: 'amber' },
  ];
  const pill: Record<string, string> = {
    elec: 'text-elec-light',
    hvac: 'text-hvac-light',
    amber: 'text-amber-300',
  };
  return (
    <AppFrame title="Quotes & follow-up — nothing goes cold">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-mute">Open quotes, chased on a schedule</p>
        <span className="rounded-md bg-elec/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-elec-light">$19,400 in play</span>
      </div>
      <div className="divide-y divide-white/8 rounded-xl border border-white/8 bg-white/[0.02]">
        {rows.map((r) => (
          <div key={r.job} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white">{r.job}</p>
              <p className="text-[11px] text-mute">{r.note}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[13px] font-semibold text-platinum">{r.amount}</span>
              <span className={`rounded-md border border-white/12 px-2 py-1 text-[10px] font-semibold ${pill[r.tone]}`}>{r.status}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-mute">Sample board. Every quote is tracked and chased for you, so no estimate dies in a text thread and you always see what is in play.</p>
    </AppFrame>
  );
}

/* 7. THE ANALYST — conversational business intelligence by text or phone */
export function AnalystScreen() {
  const thread = [
    { from: 'you', t: 'How did we do last week?' },
    { from: 'sb', t: 'Strong week. 11 jobs booked, $14,200 in revenue, up 18% from the week before. Your service-area page drove the most leads.' },
    { from: 'you', t: 'Who haven’t we heard from in a while?' },
    { from: 'sb', t: '23 past customers are due for annual service. Want me to reach out and book what comes back?' },
    { from: 'you', t: 'Yes, do it.' },
    { from: 'sb', t: 'On it. Texting them today. Anything that books goes straight on your calendar.' },
  ];
  return (
    <AppFrame title="Ask StayBookt — by text or phone">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-mute">Your business analyst, in your pocket</p>
        <span className="rounded-md bg-elec/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-elec-light">Live answer</span>
      </div>
      <div className="space-y-2.5">
        {thread.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${m.from === 'you' ? 'rounded-br-sm bg-elec text-ink' : 'rounded-bl-sm border border-white/10 bg-white/[0.04] text-platinum'}`}>{m.t}</div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-mute">Ask in plain English, day or night. The numbers come back in a sentence, not a spreadsheet.</p>
    </AppFrame>
  );
}

/* 8. REPEAT BUSINESS — the database that grows revenue from customers you already have */
export function RepeatBusinessScreen() {
  const rows = [
    { name: 'Sarah M.', last: 'AC install · 11 mo ago', action: 'Offer a maintenance plan', tag: 'Upsell' },
    { name: 'John D.', last: 'Panel upgrade · 2 yr ago', action: 'Add surge protection', tag: 'Cross-sell' },
    { name: 'The Patels', last: 'Furnace · 9 mo ago', action: 'Annual tune-up due', tag: 'Repeat' },
    { name: 'R. Okafor', last: 'Rewire · 6 mo ago', action: 'Ask for a referral', tag: 'Referral' },
  ];
  const tagTone: Record<string, string> = {
    Upsell: 'text-hvac-light',
    'Cross-sell': 'text-elec-light',
    Repeat: 'text-platinum-soft',
    Referral: 'text-hvac-light',
  };
  return (
    <AppFrame title="Customer database — grow what you already have" accent="hvac">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-mute">Revenue hiding in your customer list</p>
        <span className="rounded-md bg-hvac/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-hvac-light">11 opportunities</span>
      </div>
      <div className="divide-y divide-white/8 rounded-xl border border-white/8 bg-white/[0.02]">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white">{r.name}</p>
              <p className="text-[11px] text-mute">{r.last}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-platinum-soft">{r.action}</span>
              <span className={`rounded-md border border-white/12 px-2 py-1 text-[10px] font-semibold ${tagTone[r.tag]}`}>{r.tag}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-mute">Sample list. Repeat jobs, upsells, cross-sells, and referrals — more revenue and a higher average job from the customers you already earned, with nothing spent to find them.</p>
    </AppFrame>
  );
}

export const PREVIEW_SCREENS = [
  { id: 'dashboard', label: 'Your morning dashboard', Comp: DashboardScreen },
  { id: 'receptionist', label: 'The AI receptionist', Comp: ReceptionistScreen },
  { id: 'booking', label: 'Self-serve booking', Comp: BookingScreen },
  { id: 'brief', label: 'The morning brief', Comp: BriefScreen },
  { id: 'reviews', label: 'Reviews on autopilot', Comp: ReviewScreen },
] as const;
