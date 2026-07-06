import { TopNav } from '@/components/TopNav';
import SiteFooter from '@/components/SiteFooter';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'The two of us | StayBookt',
  description:
    'StayBookt is built and run by two founders who have been on both sides of a service business: the one bringing in the work, and the one making the operation run.',
  alternates: { canonical: '/founders' },
};

const AV = 'flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white font-display text-xl';
const AV_BG = { background: 'linear-gradient(135deg,#06B6D4 0%,#10B981 55%,#4F46E5 100%)' };

export default function FoundersPage() {
  return (
    <main className="bg-paper text-ink">
      <TopNav active="founders" />

      <section className="mx-auto max-w-5xl px-6 pt-36 pb-16 sm:px-12 sm:pt-44">
        <p className="eyebrow">Founders</p>
        <h1 className="display-1 mt-4 text-ink">The two of us.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-body">
          StayBookt is built and run by two founders who have been on both sides of a service business:
          the one bringing in the work, and the one making the operation actually run.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 sm:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-cream p-8">
            <div className="flex items-center gap-4">
              <div className={AV} style={AV_BG}>JC</div>
              <div>
                <h2 className="display-3 text-ink">Jacob Charendoff</h2>
                <p className="mt-1 text-sm font-semibold text-mute">Brand, product, and growth.</p>
              </div>
            </div>
            <p className="mt-6 text-base leading-relaxed text-body">
              Jacob runs the outside game: the brand, the product, and how StayBookt shows up in the world.
              His focus is making a service business impossible to miss and effortless to hire, then turning
              that first impression into a system the owner can actually hand off.
            </p>
          </div>

          <div className="card-cream p-8">
            <div className="flex items-center gap-4">
              <div className={AV} style={AV_BG}>R</div>
              <div>
                <h2 className="display-3 text-ink">Richard</h2>
                <p className="mt-1 text-sm font-semibold text-mute">Operations, growth, and finance.</p>
              </div>
            </div>
            <p className="mt-6 text-base leading-relaxed text-body">
              Two plus decades of executive-level leadership in high-growth service businesses at scale.
              Responsible for multiple start-up efforts and leading significant growth at Venterra from $15M
              to $500M+ in revenues. Deep understanding of the entire customer journey and all aspects of
              delivering world-class revenue performance. A CPA who has a passion for operations and
              leveraging technology to deliver tangible results.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-12">
        <div className="panel-ink p-10 sm:p-14">
          <p className="display-3 leading-snug text-white">
            One of us builds the demand. One of us builds the operation. Together, we build the thing that
            runs without you.
          </p>
          <div className="mt-8">
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-ondark">
              Book a 30-minute call
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
