import ScrollReveal from './ScrollReveal';

/**
 * Interstitial — a full-bleed scene break between zones.
 * Pure visual statement, no card, no chrome. Lives between
 * dense content moments to give the eye a break and ramp emotion.
 */
export default function Interstitial({
  children,
  tone = 'dark',
  height = '85vh',
  align = 'center',
}: {
  children: React.ReactNode;
  tone?: 'dark' | 'cream';
  height?: string;
  align?: 'center' | 'left';
}) {
  const textColor = tone === 'cream' ? 'text-stone-900' : 'text-white';
  const subColor = tone === 'cream' ? 'text-stone-500' : 'text-platinum-soft';
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <section
      className={`relative flex items-center justify-${align === 'center' ? 'center' : 'start'} px-6 sm:px-12 py-20 sm:py-32 ${textColor}`}
      style={{ minHeight: height }}
    >
      <ScrollReveal>
        <div className={`max-w-5xl ${alignClass} relative z-10`}>
          {children}
          <span className={`hidden ${subColor}`} aria-hidden />
        </div>
      </ScrollReveal>
    </section>
  );
}
