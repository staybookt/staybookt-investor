import { permanentRedirect } from 'next/navigation';

// Platform merged into /how-it-works (June 2026). Keep a permanent (308)
// redirect so old links and any indexed URLs carry over to the one page.
export default function PlatformRedirect() {
  permanentRedirect('/how-it-works');
}
