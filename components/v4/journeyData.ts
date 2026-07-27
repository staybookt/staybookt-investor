/* JOURNEY CONTENT — three illustrative owner journeys (Marcus / Sean / Kim).
 *
 * ILLUSTRATIVE, NOT REAL CLIENTS. These are composite example journeys built from the
 * narratives in Projects/StayBookt/Client-Journey-Stories.md. Jacob's call (July 2026):
 * run the numbers without an on-page illustrative label for now; disclosure treatment
 * is an open item to revisit before any investor/press push. When a real client goes
 * on record (TCE/Tim), a real journey replaces one of these and is labeled real.
 *
 * Strings may carry limited HTML (<span class="g">, <br>, colored spans) rendered via
 * dangerouslySetInnerHTML inside Journey.tsx. Keep markup to those forms.
 *
 * FAQ TERRITORY RULE: money questions live on /pricing only (see PricingFaq.tsx).
 * Journey FAQs own persona objections; the aside links to /pricing for money. */

export type Win = { kick: string; word: string; wsub: string; stamp: string; stars?: boolean };
export type Flip = { label: string; before: string; after: string };
export type FaqItem = { k: string; c: string; q: string; a: string };

export type JourneyData = {
  id: string;
  path: string;
  tag: string;            // "Journeys · Home service"
  person: string;
  role: string;           // "Owner · Seamless Electric"
  short: string;          // first name
  biz: string;
  img: string;
  imgPos: string;         // avatar object-position
  her: boolean;
  heroA: string;          // headline line 1 (solid)
  heroB: string;          // headline line 2 (gradient payoff, no period)
  heroSub: string;
  leaksTitle: string;     // 'His week was <span ...>leaking</span>.'
  leaks: string[];
  breakKick: string;
  breakBig: string;
  breakCap: string;
  turnCap: string;
  wins: Win[];
  receipt: {
    moneyTo: number;      // counts up, rendered $X,XXX+
    moneyLabel: string;
    timeTo: number;
    timeSuffix: string;   // ' hrs/wk'
    timeLabel: string;
    flips: Flip[];
  };
  payoffKick: string;
  payoffBig: string;
  payoffCap: string;
  quote: string;          // may carry <span class="g">
  faqLede: string;
  faq: FaqItem[];
};

export const JOURNEYS: Record<string, JourneyData> = {
  'home-service': {
    id: 'home-service',
    path: '/journeys/home-service',
    tag: 'Journeys · Home service',
    person: 'Marcus Bell',
    role: 'Owner · Seamless Electric',
    short: 'Marcus',
    biz: 'Seamless Electric',
    img: '/face-marcus.jpg',
    imgPos: 'center',
    her: false,
    heroA: 'The best electrician for miles.',
    heroB: 'And nobody could reach him',
    heroSub: 'Marcus Bell runs Seamless Electric. Five electricians, three vans, one problem.',
    leaksTitle: 'His week was <span style="color:#fb6a6f">leaking</span>.',
    leaks: [
      'Four of ten calls hit voicemail.',
      'Quotes went out at 10 PM. Then died.',
      'Invoices drifted to 90 days.',
      'Seven reviews in six years.',
      'Admin nights at the kitchen table.',
    ],
    breakKick: '4:47 PM',
    breakBig: 'A <span style="color:#fb6a6f">$14,000</span> job<br>went to voicemail.',
    breakCap: 'Both hands on a breaker, up a ladder. The homeowner hired the shop that picked up.',
    turnCap: 'Two weeks. His prices, his service area, how he talks to a customer. Then it took the front of the business off his hands.',
    wins: [
      { kick: 'Win one', word: 'Answered.', wsub: 'Every call. In his voice. Even mid-job.', stamp: 'Missed calls → zero' },
      { kick: 'Win two', word: 'Chased.', wsub: 'Every quote followed to a yes or a no.', stamp: 'No more dead quotes' },
      { kick: 'Win three', word: 'Paid.', wsub: 'Invoices chased politely. Money inside a month.', stamp: '90 days → 30' },
      { kick: 'Win four', word: 'Found.', wsub: 'A review asked after every finished job.', stamp: '7 reviews → 60+', stars: true },
      { kick: 'Win five', word: 'Home.', wsub: 'One 30-second brief with his coffee. That’s his admin now.', stamp: 'Evenings, returned' },
    ],
    receipt: {
      moneyTo: 40000,
      moneyLabel: 'a year in jobs that used to leak, kept',
      timeTo: 10,
      timeSuffix: ' hrs/wk',
      timeLabel: 'of evenings and weekends, returned',
      flips: [
        { label: 'Calls answered', before: '4 of 10 missed', after: 'about zero' },
        { label: 'Getting paid', before: '90 days', after: 'under 30' },
        { label: 'His admin', before: '10 hours a week', after: '30 seconds a day' },
      ],
    },
    payoffKick: 'A year in',
    payoffBig: 'He runs the business.<br><span class="g">We run the busywork.</span>',
    payoffCap: 'Back on the tools. Ten days east with the family. Pricing a fourth van.',
    quote: '“I’m a better electrician than I ever was a receptionist. <span class="g">Now I don’t have to be both.”</span>',
    faqLede: 'The questions a shop owner asks before handing over the front of the business.',
    faq: [
      { k: 'Your voice', c: '#06b6d4', q: 'Will it actually sound like my shop?', a: 'Yes. The first two weeks are spent learning how you run: what you charge, which jobs you take, your service area, and how you talk to a customer. Everything that goes out comes from that playbook. Your customers hear your shop, not a call centre.' },
      { k: 'The hard calls', c: '#4f46e5', q: 'What happens when a call is too complicated?', a: 'Routine calls get handled: booked, confirmed, reminded. Anything unusual gets escalated to you before it ever touches the customer. You’re never out of the loop on a call that matters. That’s what the morning brief is for.' },
      { k: 'Control', c: '#10b981', q: 'Do I lose touch with my own customers?', a: 'No. You run the business, we run the busywork. Every morning you get a 30-second brief: what came in, what’s booked, what needs a decision from you. You see everything. You just stop being the one answering the phone up a ladder.' },
      { k: 'Speed', c: '#7c3aed', q: 'How fast is it running?', a: 'Two weeks of learning your business, then the front office is on. Most owners feel the difference the first week it’s live, usually the first missed call that doesn’t get missed.' },
    ],
  },

  consultant: {
    id: 'consultant',
    path: '/journeys/consultant',
    tag: 'Journeys · Consultant',
    person: 'Sean Anderson',
    role: 'Founder · Anderson Consulting',
    short: 'Sean',
    biz: 'Anderson Consulting',
    img: '/face-sean.jpg',
    imgPos: 'center',
    her: false,
    heroA: 'Brilliant at the work.',
    heroB: 'Losing the clients who wanted it',
    heroSub: 'Sean Anderson runs a solo ops consultancy. His product is his brain. His problem was everything around it.',
    leaksTitle: 'His pipeline was <span style="color:#fb6a6f">feast or famine</span>.',
    leaks: [
      'Inquiries sat for five days mid-sprint.',
      'His website described the job from two years ago.',
      'Warm leads went cold on their own.',
      'His proof sat trapped in email threads.',
      'Empty months followed every busy one.',
    ],
    breakKick: 'Day five',
    breakBig: 'Two <span style="color:#fb6a6f">dream referrals</span><br>hired someone else.',
    breakCap: 'Exactly his kind of client, sent by people who trusted him. He surfaced from delivery five days later. They were gone.',
    turnCap: 'Two weeks. His niche, his positioning, how he talks about the work. Then it took the front of the business off his hands.',
    wins: [
      { kick: 'Win one', word: 'Answered.', wsub: 'Every inquiry, the same day. Even mid-sprint.', stamp: '5 days → same day' },
      { kick: 'Win two', word: 'Booked.', wsub: 'Discovery calls straight to his calendar.', stamp: 'No more lost referrals' },
      { kick: 'Win three', word: 'Warm.', wsub: 'A quiet nurture through every delivery week.', stamp: 'Leads stopped going cold' },
      { kick: 'Win four', word: 'Proven.', wsub: 'The wins in his inbox, packaged into case studies that sell.', stamp: '0 case studies → a dozen' },
      { kick: 'Win five', word: 'Steady.', wsub: 'Always two or three engagements deep.', stamp: 'The famine months, gone' },
    ],
    receipt: {
      moneyTo: 30000,
      moneyLabel: 'a year in referrals that used to go cold, kept',
      timeTo: 6,
      timeSuffix: ' hrs/wk',
      timeLabel: 'of chasing and admin, returned to billable work',
      flips: [
        { label: 'Response time', before: '5 days', after: 'same day' },
        { label: 'Pipeline', before: 'feast or famine', after: 'always 2–3 deep' },
        { label: 'His proof', before: 'buried in email', after: 'a dozen case studies, live' },
      ],
    },
    payoffKick: 'A year in',
    payoffBig: 'He picks his clients.<br><span class="g">That’s the point.</span>',
    payoffCap: 'Rates up. Work he chooses. No more trading delivery time for chasing.',
    quote: '“I used to lose my best leads while I was busy being good at my job. <span class="g">That stopped.”</span>',
    faqLede: 'The questions a solo consultant asks before handing over the front of the practice.',
    faq: [
      { k: 'Your voice', c: '#06b6d4', q: 'Will it sound like me, or like a generic consultant?', a: 'Like you. The first two weeks map your niche, your positioning, who your ideal client actually is, and how you talk about the work. Every reply, follow-up and nurture comes from that playbook. Your prospects hear you, just faster.' },
      { k: 'The line', c: '#4f46e5', q: 'Does it talk to my existing clients?', a: 'No. It runs the front of the funnel: new inquiries, discovery calls, follow-ups, testimonials at close. Your client relationships stay exactly where they belong, with you. You see everything that happened in a short daily brief.' },
      { k: 'Fit', c: '#10b981', q: 'I’m a one-person firm. Is this overkill?', a: 'It’s built for exactly you. A solo consultant’s whole business is time, and the leak is always the same: the funnel goes quiet while you deliver. This keeps it warm without hiring anyone or learning any software.' },
      { k: 'Speed', c: '#7c3aed', q: 'How fast is it running?', a: 'Two weeks of learning your practice, then it’s on. Most consultants feel it at the first inquiry that gets answered the same day they’re heads-down for a client.' },
    ],
  },

  'real-estate-agent': {
    id: 'real-estate-agent',
    path: '/journeys/real-estate-agent',
    tag: 'Journeys · Real estate',
    person: 'Kim Dempster',
    role: 'Realtor · Dempster Group',
    short: 'Kim',
    biz: 'Dempster Group',
    img: '/face-kim.jpg',
    imgPos: 'center',
    her: true,
    heroA: 'One of the top agents in town.',
    heroB: 'Always the second to call back',
    heroSub: 'Kim Dempster closes when she’s in the room. The problem was getting there first.',
    leaksTitle: 'Her market moves in <span style="color:#fb6a6f">minutes</span>.',
    leaks: [
      'Leads answered in hours, not seconds.',
      'Mid-showing meant missed everything.',
      'Her database sat cold for months.',
      'Follow-up depended on memory at midnight.',
      'She lived on her phone and still missed things.',
    ],
    breakKick: '6:12 PM',
    breakBig: 'Her own <span style="color:#fb6a6f">referral</span><br>toured with someone else.',
    breakCap: 'A couple her past client sent her personally. By the time she called back, they’d seen three homes with the agent who answered in ninety seconds.',
    turnCap: 'Two weeks. Her market, her price bands, how she talks to a nervous first-time buyer. Then it took the front of the business off her hands.',
    wins: [
      { kick: 'Win one', word: 'Answered.', wsub: 'Every lead in seconds. In her voice. Even mid-showing.', stamp: 'Hours → seconds' },
      { kick: 'Win two', word: 'Booked.', wsub: 'Showings straight to her calendar, confirmed and reminded.', stamp: 'No more phone tag' },
      { kick: 'Win three', word: 'Warm.', wsub: 'Her database nurtured all year, not just at the sale.', stamp: 'Cold list → warm list' },
      { kick: 'Win four', word: 'Referred.', wsub: 'Past clients kept close, so they keep sending people.', stamp: 'Repeat + referral, compounding', stars: true },
      { kick: 'Win five', word: 'Present.', wsub: 'First to every door without living on her phone.', stamp: 'Evenings, returned' },
    ],
    receipt: {
      moneyTo: 25000,
      moneyLabel: 'a year in commissions that used to go to faster agents, kept',
      timeTo: 8,
      timeSuffix: ' hrs/wk',
      timeLabel: 'of midnight follow-up, returned',
      flips: [
        { label: 'Speed to lead', before: 'hours', after: 'seconds' },
        { label: 'Her database', before: 'cold for months', after: 'nurtured all year' },
        { label: 'Her evenings', before: 'on the phone', after: 'hers again' },
      ],
    },
    payoffKick: 'A year in',
    payoffBig: 'She sells the homes.<br><span class="g">We run the rest.</span>',
    payoffCap: 'Top producer in her office. More listings. Her evenings back.',
    quote: '“I never lost a client I got in front of. I lost the ones I couldn’t call back fast enough. <span class="g">That doesn’t happen now.”</span>',
    faqLede: 'The questions a busy agent asks before handing over the front of the business.',
    faq: [
      { k: 'Your voice', c: '#06b6d4', q: 'Will it sound like me to my leads?', a: 'Yes. The first two weeks learn your market, your neighbourhoods, your price bands, and how you talk to a nervous first-time buyer versus a move-up family. Every reply comes from that playbook. Leads hear you, in seconds instead of hours.' },
      { k: 'Mid-showing', c: '#4f46e5', q: 'What happens when a lead comes in while I’m with a client?', a: 'It gets answered in seconds, qualified, and booked to your calendar. Anything unusual is escalated to you before it touches the lead. You walk out of the showing to a booked appointment instead of a cold voicemail.' },
      { k: 'Your tools', c: '#10b981', q: 'My brokerage already gives me a CRM. Why this?', a: 'A CRM is a filing cabinet: it holds the leads you remember to put in it. This is the person working the cabinet: answering first, following up, nurturing the database all year. Nothing to learn, nothing to log into.' },
      { k: 'Speed', c: '#7c3aed', q: 'How fast is it running?', a: 'Two weeks of learning your business, then it’s on. Most agents feel it at the first 6 PM lead that gets answered while they’re mid-showing.' },
    ],
  },
};

export const JOURNEY_ORDER = ['home-service', 'consultant', 'real-estate-agent'] as const;
