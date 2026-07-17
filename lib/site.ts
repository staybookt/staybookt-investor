// Central site config. Change these in one place; every section reads from here.

// Internal landing page that explains the pre-call work and embeds the calendar.
export const START_LINK = '/start';
export const EMAIL = 'info@staybookt.com';

// Phone. The single NAP number for StayBookt: it must be byte-identical here, in
// the JSON-LD, on the Google Business Profile, and in every directory listing.
// Do not reformat it in one place and not the others.
//
// July 13 2026: this is Richard's cell, standing in as the business line until a
// real number is provisioned. Swap the three constants below when that happens.
// Nothing else in the codebase needs to change.
export const PHONE_DISPLAY = '(905) 717-8264';
export const PHONE_HREF = 'tel:+19057178264';
// E.164, for schema.org and anywhere a machine reads it rather than a human.
export const PHONE_E164 = '+1-905-717-8264';
