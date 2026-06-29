// Central site config. Change these in one place; every section reads from here.

// FALLBACK: the cal.com/jacobcharendoff/staybookt page does not exist yet (404).
// Until Jacob creates it, every CTA routes to email so nothing dead-ends.
// One-line flip back to the cal.com URL once the booking page is live.
export const CAL_LINK = 'mailto:info@staybookt.com?subject=Booking%20a%2030-minute%20call%20with%20StayBookt';
export const EMAIL = 'info@staybookt.com';

// Phone: a Twilio number for call + text. Not provisioned yet, so we leave it
// null and render nothing rather than ship a fake number. Set both once live.
export const PHONE_DISPLAY: string | null = null;
export const PHONE_HREF: string | null = null;

export const PRICING = {
  build: '$2,500',
  care: '$149',
  performance: '5%',
} as const;
