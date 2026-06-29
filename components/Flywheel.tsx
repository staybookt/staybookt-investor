/* The StayBookt operating loop. Visualises what/how we run: every customer
 * touch loops back into the database and compounds. The website + measurement
 * run today; the AI steps roll in as the platform ships (see caption in page). */

const NODES = [
  { angle: -90, label: 'Discover', sub: 'Website + Google' },
  { angle: -30, label: 'Capture', sub: 'Lead agent' },
  { angle: 30, label: 'Book', sub: 'Booking + reminders' },
  { angle: 90, label: 'Deliver', sub: 'You, on the tools', isYou: true },
  { angle: 150, label: 'Follow up', sub: 'Review request' },
  { angle: 210, label: 'Bring back', sub: 'Re-engage' },
];

export default function Flywheel() {
  const cx = 300;
  const cy = 300;
  const r = 200;
  const pts = NODES.map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return { ...n, x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  return (
    <svg viewBox="0 0 600 600" className="w-full max-w-xl mx-auto block" role="img" aria-label="StayBookt operating loop: discover, capture, book, deliver, follow up, bring back">
      <defs>
        <linearGradient id="fw-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <marker id="fw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#06B6D4" />
        </marker>
      </defs>

      {pts.map((from, i) => {
        const to = pts[(i + 1) % pts.length];
        return (
          <path
            key={`arc-${i}`}
            d={`M ${from.x} ${from.y} A ${r} ${r} 0 0 1 ${to.x} ${to.y}`}
            stroke="url(#fw-grad)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
            markerEnd="url(#fw-arrow)"
          />
        );
      })}

      <circle cx={cx} cy={cy} r="70" fill="#050811" stroke="url(#fw-grad)" strokeWidth="2" />
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="700" fontFamily="ui-sans-serif, system-ui">Your customer</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="700" fontFamily="ui-sans-serif, system-ui">database</text>
      <text x={cx} y={cy + 32} textAnchor="middle" fill="#06B6D4" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="1.5">COMPOUNDS</text>

      {pts.map((p, i) => (
        <g key={`node-${i}`}>
          <circle cx={p.x} cy={p.y} r="52" fill={p.isYou ? '#10B981' : '#141826'} stroke={p.isYou ? '#10B981' : '#06B6D4'} strokeWidth="2" />
          {p.isYou && (
            <circle cx={p.x} cy={p.y} r="58" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.4">
              <animate attributeName="r" values="58;66;58" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
          )}
          <text x={p.x} y={p.y - 3} textAnchor="middle" fill={p.isYou ? '#050811' : '#ffffff'} fontSize="15" fontWeight="700" fontFamily="ui-sans-serif, system-ui">{p.label}</text>
          <text x={p.x} y={p.y + 14} textAnchor="middle" fill={p.isYou ? '#050811' : '#C7C7CC'} fontSize="9.5" fontFamily="ui-monospace, monospace" letterSpacing="0.4">{p.sub}</text>
        </g>
      ))}
    </svg>
  );
}
