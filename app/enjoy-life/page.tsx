import { TopNav } from '@/components/TopNav';
import Wordmark from '@/components/Wordmark';
import SiteFooter from '@/components/SiteFooter';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'Enjoy Life',
  alternates: { canonical: '/enjoy-life' },
  description:
    'The point was never the business. It was the life it was supposed to buy. A business that runs without you is an asset you can sell, pass on, or finally step back from.',
};

// Placeholder footage (Pexels, licensed). Swap for owned lifestyle footage.
const LIFE_SRC = 'https://videos.pexels.com/video-files/1966695/1966695-hd_1920_1080_30fps.mp4';

const DOORS = [
  {
    k: 'Sell it',
    h: 'Build an asset, not a job.',
    b: 'A business that runs without you is something a buyer actually wants and you can actually walk away from. The systems we build are what turn years of your work into a number on a term sheet.',
  },
  {
    k: 'Pass it on',
    h: 'Hand it to your family.',
    b: 'A business that does not live and die on your personal phone is one you can give to your kids or your crew, and trust that it keeps running the way you built it.',
  },
  {
    k: 'Get back to the work',
    h: 'Do the part you love.',
    b: 'Or keep it, and just get back to the craft, the tools, the customers, the reason you started, before the admin ate your evenings and your weekends.',
  },
];

export default function EnjoyLifePage() {
  return (
    <>
      <TopNav active="enjoy-life" />
      <main className="bg-paper text-ink">
        {/* Cinematic video hero band (stays dark) */}
        <section className="relative flex items-end overflow-hidden" style={{ minHeight: '66vh', background: '#050811' }}>
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={LIFE_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(5,8,17,0.72) 0%, rgba(5,8,17,0.28) 34%, rgba(5,8,17,0.5) 70%, #050811 100%)',
            }}
          />
          <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-14 sm:px-12">
            <p className="eyebrow text-platinum-soft/90">Enjoy Life</p>
            <h1 className="display-1 mt-4 text-white">
              The point was never the business.
            </h1>
          </div>
        </section>

        <section className="px-6 pt-24 pb-6 sm:px-12">
          <div className="mx-auto max-w-4xl">
            <p className="display-3 max-w-2xl font-normal leading-relaxed text-body">
              It was the life it was supposed to buy. StayBookt runs the front office so the business runs
              without you, and you finally get to go live it.
            </p>
          </div>
        </section>

        {/* Three doors */}
        <section className="px-6 py-24 sm:px-12 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow mb-10">Three doors, one key</p>
            <div className="space-y-14">
              {DOORS.map((d) => (
                <div key={d.k} className="border-t border-divider-lt pt-8">
                  <p className="eyebrow">{d.k}</p>
                  <h2 className="display-2 mt-3 text-ink">{d.h}</h2>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">{d.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The key — dark highlight band */}
        <section className="px-6 py-24 sm:px-12 sm:py-32">
          <div className="panel-ink mx-auto max-w-4xl px-8 py-14 sm:px-14">
            <p className="display-2 text-white">
              Three different doors. The same key: a business that runs without you.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-platinum-soft">
              That is the whole reason StayBookt exists. Not another tool for you to run. We run it, we only get paid
              when it works, and what it buys back is your time, your options, and the life you built it for.
            </p>
          </div>
        </section>

        {/* Close */}
        <section className="px-6 py-24 sm:px-12 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Wordmark onDark={false} period tagline size="lg" />
            <div className="mt-9">
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-onlight"
              >
                Book a 30-minute call
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
