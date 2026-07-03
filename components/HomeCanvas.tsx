// The single painted background for the homepage. Every section is transparent
// and shares this one continuous ink field, so the page reads as one surface
// instead of stacked slabs. Lives once, behind everything.
export default function HomeCanvas() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          'radial-gradient(120% 80% at 50% -10%, #0F172A 0%, #050811 55%), #050811',
      }}
    />
  );
}
