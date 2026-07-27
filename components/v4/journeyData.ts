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
export type Joy = { svg: string; line: string };
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
  banner: string;         // city skyline strip (their world, faint behind the dark opening)
  hue: string;            // this journey's brand hue (road HUD, reward chip)
  joy: Joy;               // the reward from the map, delivered in the payoff chapter
  finale: string;         // the full-screen gradient close: THE question this journey earns (html)
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
    banner: '/banner-toronto.jpg',
    hue: '#06b6d4',
    joy: { svg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', line: 'Ten days east with the family.' },
    finale: 'What would you do with<br/>your evenings back?',
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
    /* TIGHTENED 5 -> 3 (Jacob, July 27: every chapter earns its scroll). Paid merged
       into Chased (both are the follow-up machine); Home's payoff folded into the
       closing chapter, where the reward chip + life line land. */
    wins: [
      { kick: 'Win one', word: 'Answered.', wsub: 'Every call. In his voice. Even mid-job.', stamp: 'Missed calls → zero' },
      { kick: 'Win two', word: 'Chased.', wsub: 'Quotes followed to a yes or a no. Invoices chased politely.', stamp: 'Paid in 30, not 90' },
      { kick: 'Win three', word: 'Found.', wsub: 'A review asked after every finished job.', stamp: '7 reviews → 60+', stars: true },
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
    banner: '/banner-chicago.jpg',
    hue: '#4f46e5',
    joy: { svg: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>', line: 'Friday tee times, guilt-free.' },
    finale: 'What would you do with<br/>total pricing power?',
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
      { kick: 'Win one', word: 'Answered.', wsub: 'Every inquiry the same day, booked straight to his calendar. Even mid-sprint.', stamp: '5 days → same day' },
      { kick: 'Win two', word: 'Warm.', wsub: 'A quiet nurture through every delivery week.', stamp: 'Leads stopped going cold' },
      { kick: 'Win three', word: 'Steady.', wsub: 'His proof packaged into case studies. Always two or three engagements deep.', stamp: 'The famine months, gone' },
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
    banner: '/banner-vancouver.jpg',
    hue: '#7c3aed',
    joy: { svg: '<path d="M8 22h8"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>', line: 'Dinner at home, phone face-down.' },
    finale: 'What would you do if you<br/>were always first?',
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
      { kick: 'Win one', word: 'Answered.', wsub: 'Every lead in seconds, booked to a showing. Even mid-showing.', stamp: 'Hours → seconds' },
      { kick: 'Win two', word: 'Warm.', wsub: 'Her database nurtured all year, not just at the sale.', stamp: 'Cold list → warm list' },
      { kick: 'Win three', word: 'Referred.', wsub: 'Past clients kept close, so they keep sending people.', stamp: 'Repeat + referral, compounding', stars: true },
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
