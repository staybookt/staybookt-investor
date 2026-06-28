// Central site config. Change these in one place; every section reads from here.

export const CAL_LINK = 'https://cal.com/jacobcharendoff/staybookt'; // TODO: confirm/create the live Cal.com booking page
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
