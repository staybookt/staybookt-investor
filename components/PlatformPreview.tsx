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
  accent = 'elec',
}: {
  title: string;
  children: React.ReactNode;
  accent?: 'elec' | 'hvac';
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl shadow-black/40 ring-1 ring-white/5">
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-[11px] font-medium tracking-wide text-mute">{title}</span>
        <span className={`ml-auto text-[10px] font-bold uppercase tracking-[0.2em] ${accent === 'hvac' ? 'text-hvac-light' : 'text-elec-light'}`}>
          StayBookt
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
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

/* 2. AI RECEPTIONIST — a real-feeling text thread */
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
    <AppFrame title="AI Receptionist — Live conversation" accent="hvac">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-mute">Inbound text · answered in 4 seconds</p>
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
      <p className="mt-3 text-center text-[10px] text-mute">Handled by StayBookt. Escalates to you only when it should.</p>
    </AppFrame>
  );
}

/* 3. MONDAY BRIEF — the weekly owner email */
export function BriefScreen() {
  const lines = [
    { k: 'Booked last week', v: '11 jobs', good: true },
    { k: 'Revenue booked', v: '$14,200', good: true },
    { k: 'Leads recovered (would have been missed)', v: '3', good: true },
    { k: 'Reviews added to your profile', v: '4 new, 4.9★ avg', good: true },
    { k: 'Needs your call', v: '1 quote over $5k', good: false },
  ];
  return (
    <AppFrame title="Monday Brief — your week in 30 seconds">
      <p className="mb-3 text-sm text-platinum">
        Here is your business last week. <span className="text-mute">No dashboard to log into. It comes to you.</span>
      </p>
      <div className="divide-y divide-white/8 rounded-xl border border-white/8 bg-white/[0.02]">
        {lines.map((l) => (
          <div key={l.k} className="flex items-center justify-between gap-4 px-4 py-3">
            <span className="text-[13px] text-platinum-soft">{l.k}</span>
            <span className={`text-[13px] font-semibold ${l.good ? 'text-hvac-light' : 'text-elec-light'}`}>{l.v}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-mute">Sample brief. Sent every Monday, 7am.</p>
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

/* 6. THE ANALYST — conversational business intelligence by text or phone */
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

/* 7. REPEAT BUSINESS — the CRM that turns past work into future work */
export function RepeatBusinessScreen() {
  const rows = [
    { name: 'Sarah M.', last: 'AC install · 11 mo ago', due: 'Tune-up due' },
    { name: 'John D.', last: 'Panel upgrade · 2 yr ago', due: 'Safety check due' },
    { name: 'The Patels', last: 'Furnace · 9 mo ago', due: 'Service due' },
    { name: 'R. Okafor', last: 'Rewire · 6 mo ago', due: 'Referral ask ready' },
  ];
  return (
    <AppFrame title="Customer database — past work into future work" accent="hvac">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-mute">Due to hear from you</p>
        <span className="rounded-md bg-hvac/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-hvac-light">23 this month</span>
      </div>
      <div className="divide-y divide-white/8 rounded-xl border border-white/8 bg-white/[0.02]">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white">{r.name}</p>
              <p className="text-[11px] text-mute">{r.last}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-hvac-light">{r.due}</span>
              <span className="rounded-md border border-white/12 px-2 py-1 text-[10px] font-semibold text-platinum-soft">Reach out</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-mute">Sample list. Every job you’ve done is future business. We surface who’s due and bring them back.</p>
    </AppFrame>
  );
}

export const PREVIEW_SCREENS = [
  { id: 'dashboard', label: 'Your morning dashboard', Comp: DashboardScreen },
  { id: 'receptionist', label: 'The AI receptionist', Comp: ReceptionistScreen },
  { id: 'booking', label: 'Self-serve booking', Comp: BookingScreen },
  { id: 'brief', label: 'The Monday brief', Comp: BriefScreen },
  { id: 'reviews', label: 'Reviews on autopilot', Comp: ReviewScreen },
] as const;
