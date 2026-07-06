interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onDark?: boolean;
  period?: boolean;
  tagline?: boolean;
  className?: string;
}

const sizes = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-5xl',
  xl: 'text-7xl',
};

/* The single source of truth for the wordmark. "Bookt" is always the gradient,
 * the period is always brand purple, "Enjoy Life." is always green. */
export default function Wordmark({
  size = 'md',
  onDark = true,
  period = false,
  tagline = false,
  className = '',
}: Props) {
  const base = onDark ? 'text-white' : 'text-ink';
  return (
    <span className={`font-display ${sizes[size]} tracking-tight ${className}`}>
      <span className={base}>Stay</span>
      <span className="wordmark-gradient">Bookt</span>
      {period && <span className="text-period">.</span>}
      {tagline && (
        <>
          {' '}
          <span className="text-hvac">Enjoy Life.</span>
        </>
      )}
    </span>
  );
}
