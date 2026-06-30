/* The StayBookt operating loop. Visualises what/how we run: every customer
 * touch loops back into the database and compounds. The website + measurement
 * run today; the AI steps roll in as the platform ships (see caption in page). */

const NODES = [
  { angle: -90, label: 'Discover', sub: 'Website + Google' },
  { angle: -30, label: 'Capture', sub: 'Lead agent' },
  { angle: 30, label: 'Book', sub: 'Booking + reminders' },
  { angle: 90, label: 'Deliver', sub: 'You, on the tools', isYou: true },
  { angle: 150, label: 'Follow up', sub: 'Review request' },
  { angle: 210, label: 'Bring back', sub: 'Win them twice' },
];

export default function Flywheel() {
  const cx = 300;
  const cy = 300;
  const r = 200;
  const NR = 60;
  const pts = NODES.map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return { ...n, x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  return (
    <svg viewBox="0 0 600 600" className="w-full max-w-2xl mx-auto block" role="img" aria-label="StayBookt operating loop: discover, capture, book, deliver, follow up, bring back">
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
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.65"
            markerEnd="url(#fw-arrow)"
          />
        );
      })}

      <circle cx={cx} cy={cy} r="80" fill="#050811" stroke="url(#fw-grad)" strokeWidth="3" />
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#ffffff" fontSize="19" fontWeight="800" fontFamily="ui-sans-serif, system-ui">Your customer</text>
      <text x={cx} y={cy + 13} textAnchor="middle" fill="#ffffff" fontSize="19" fontWeight="800" fontFamily="ui-sans-serif, system-ui">database</text>
      <text x={cx} y={cy + 35} textAnchor="middle" fill="#67E8F9" fontSize="12" fontWeight="700" fontFamily="ui-monospace, monospace" letterSpacing="2">COMPOUNDS</text>

      {pts.map((p, i) => (
        <g key={`node-${i}`}>
          <circle cx={p.x} cy={p.y} r={NR} fill={p.isYou ? '#10B981' : '#161B2C'} stroke={p.isYou ? '#10B981' : '#22D3EE'} strokeWidth="2.5" />
          {p.isYou && (
            <circle cx={p.x} cy={p.y} r={NR + 6} fill="none" stroke="#10B981" strokeWidth="2" opacity="0.4">
              <animate attributeName="r" values={`${NR + 6};${NR + 14};${NR + 6}`} dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
          )}
          <text x={p.x} y={p.y - 4} textAnchor="middle" fill={p.isYou ? '#050811' : '#ffffff'} fontSize="18" fontWeight="800" fontFamily="ui-sans-serif, system-ui">{p.label}</text>
          <text x={p.x} y={p.y + 15} textAnchor="middle" fill={p.isYou ? '#04231A' : '#D7E3EA'} fontSize="11" fontWeight="600" fontFamily="ui-monospace, monospace" letterSpacing="0.3">{p.sub}</text>
        </g>
      ))}
    </svg>
  );
}
