import { redirect } from 'next/navigation';

/* GHOST. This route belongs to a version of StayBookt that no longer exists: the
 * $4,000 Foundation, the $1,999 and $3,499 retainers, the 20% value share, and a
 * customer story we are not entitled to tell. next.config.ts already 308s this path
 * to /, so nobody reaches this file. It stayed dangerous anyway, because it
 * still IMPORTED the old components and therefore kept them compiling and alive.
 *
 * It is a stub now. The redirect below is belt and braces behind the config rule.
 * Do not rebuild a page here. If this route ever needs to mean something again,
 * delete the entry in GHOSTS first, on purpose. */
export default function Page() {
  redirect('/');
}
