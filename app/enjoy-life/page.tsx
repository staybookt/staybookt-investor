import { redirect } from 'next/navigation';

/* This page used to sell the 20% value share: we agree what the business is worth,
 * we take twenty percent of the increase, a broker takes 8-12% of the whole sale,
 * a franchise takes 6% forever. All of that is dead (Richard, July 14 2026). We do
 * not take a share of the customer's business.
 *
 * The route was already redirecting via next.config, so nothing here was being
 * served, but the copy was still sitting in the repo waiting for someone to drop
 * the redirect and resurrect it. Gutted to a stub so that cannot happen.
 *
 * Enjoy Life survives as the OUTCOME and the third rung of the ladder. It is what
 * the owner gets. It is not a fee. */
export default function Page() {
  redirect('/pricing');
}
