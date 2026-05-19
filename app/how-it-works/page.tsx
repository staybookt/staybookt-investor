import { redirect } from 'next/navigation';

/* /how-it-works retired in v13. Content absorbed into /proof (Customer).
 * Operating cycle still visible on the homepage via FlywheelOS. */
export default function HowItWorksRedirect() {
  redirect('/proof');
}
