'use client';

import { useEffect, useRef, useState } from 'react';

type PulseState = 'idle' | 'submitting' | 'running' | 'done' | 'error';

interface ProgressEvent {
  stage?: string;
  label?: string;
}

interface PulseResult {
  business?: { name?: string; category?: string; location?: string };
  business_name?: string;
  headline?: string;
  headline_short?: string;
  est_leak?: string;
  scorecard?: { overall_score?: number | string; [k: string]: unknown };
  leaks?: Array<string | { label?: string; detail?: string }>;
  pdf_url?: string;
  analyzed_at?: string;
}

const PULSE_SMS = 'sms:+16474908937&body=Send%20my%20Pulse%20report';
const PULSE_SMS_PLAIN = 'sms:+16474908937';
const CAL_LINK = 'https://cal.com/jacobcharendoff/staybookt';

export default function HeroPulse() {
  const [state, setState] = useState<PulseState>('idle');
  const [url, setUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [progress, setProgress] = useState<ProgressEvent[]>([]);
  const [partial, setPartial] = useState<Record<string, unknown>>({});
  const [result, setResult] = useState<PulseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stopPoll() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }
  function stopTick() {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }

  useEffect(() => () => { stopPoll(); stopTick(); }, []);

  function startTick() {
    stopTick();
    setElapsed(0);
    tickRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  }

  function startPolling(jobId: string) {
    stopPoll();
    let attempts = 0;
    const POLL_MS = 2500;
    const MAX_ATTEMPTS = 80; // ~3.3 min ceiling
    pollRef.current = setInterval(async () => {
      attempts += 1;
      if (attempts > MAX_ATTEMPTS) {
        stopPoll();
        stopTick();
        setState('error');
        setError('That took longer than expected. Text your URL to (647) 490-8937 and we will send the diagnostic to your phone.');
        return;
      }
      try {
        const r = await fetch(`/api/pulse/status/${jobId}`, { cache: 'no-store' });
        const data = await r.json();
        if (Array.isArray(data.progress)) setProgress(data.progress);
        if (data.partial && typeof data.partial === 'object') setPartial(data.partial);
        if (data.status === 'done') {
          stopPoll();
          stopTick();
          setResult(data.result || {});
          setState('done');
        } else if (data.status === 'error') {
          stopPoll();
          stopTick();
          setState('error');
          setError(typeof data.error === 'string' ? data.error : 'Something went wrong during analysis.');
        }
      } catch {
        // transient — keep polling
      }
    }, POLL_MS);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'submitting' || state === 'running') return;
    const clean = url.trim();
    if (!clean) return;

    setSubmittedUrl(clean);
    setState('submitting');
    setError(null);
    setProgress([]);
    setPartial({});
    setResult(null);

    try {
      const r = await fetch('/api/pulse/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: clean }),
      });
      const data = await r.json();
      if (!r.ok || !data.job_id) {
        throw new Error(data.message || 'Could not start the diagnostic. Try again.');
      }
      setState('running');
      startTick();
      startPolling(data.job_id);
    } catch (err: unknown) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Something went wrong starting the analysis.');
    }
  }

  function reset() {
    stopPoll();
    stopTick();
    setState('idle');
    setUrl('');
    setSubmittedUrl('');
    setProgress([]);
    setPartial({});
    setResult(null);
    setError(null);
    setElapsed(0);
  }

  const isActive = state === 'running' || state === 'submitting';
  const isResting = state === 'idle' || state === 'error';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20 px-6 sm:px-12">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 30%, rgba(6,182,212,0.10), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(37,99,235,0.08), transparent 60%)',
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-elec font-semibold mb-7">
          Service businesses under $1M
        </p>
        <h1 className="font-display text-[40px] sm:text-[64px] lg:text-[80px] leading-[1.02] tracking-[-0.035em] max-w-4xl mb-9">
          Software should do the job, not hand you another one.
        </h1>
        <p className="text-platinum text-base sm:text-lg leading-relaxed max-w-2xl mb-10">
          StayBookt builds and runs the systems that bring customers to your business and keep them close. The website, the follow-up, the reviews, the Monday roll-up. We work with people whose work is a craft. Owner-operated. Under a million in revenue.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* LEFT: input / state display */}
          <div className="lg:col-span-2">
            {isResting && (
              <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <label className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec">
                  Try it on your business
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    spellCheck={false}
                    placeholder="yourbusiness.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 min-w-0 bg-paper/[0.05] border border-divider/70 focus:border-elec/70 text-white placeholder:text-mute-dark text-base px-4 py-4 rounded-xl outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!url.trim()}
                    className="bg-elec hover:bg-elec-light disabled:opacity-40 disabled:cursor-not-allowed text-ink font-bold px-5 py-4 rounded-xl text-sm transition-colors whitespace-nowrap"
                  >
                    Run Pulse
                  </button>
                </div>
                {error && (
                  <p className="text-amber-300/90 text-sm mt-2 leading-snug">
                    {error}{' '}
                    <button type="button" onClick={reset} className="underline hover:text-amber-200">
                      Try again
                    </button>
                  </p>
                )}
                <p className="text-mute text-xs sm:text-sm mt-3 max-w-md leading-relaxed">
                  Pulse scans 14 signals on your site, your Google profile, your reviews, your competitors. Average analysis: 90 seconds. We will show every step.
                </p>
                <div className="mt-5 flex flex-col gap-2 text-xs">
                  <a href={PULSE_SMS_PLAIN} className="text-platinum-soft hover:text-white transition-colors">
                    Prefer SMS? Text your URL to (647) 490-8937
                  </a>
                  <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="text-mute hover:text-platinum-soft transition-colors">
                    Or book a 30-minute call with Jacob
                  </a>
                </div>
              </form>
            )}

            {isActive && (
              <div className="flex flex-col gap-4">
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec">
                  Analyzing
                </p>
                <p className="font-display text-2xl sm:text-3xl text-white tracking-tight break-all">
                  {submittedUrl}
                </p>
                <div className="flex items-center gap-3 text-platinum-soft text-sm">
                  <span className="inline-block w-2 h-2 rounded-full bg-elec animate-pulse" />
                  <span>{elapsed}s elapsed. Average analysis is about 90 seconds.</span>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs text-mute hover:text-platinum-soft transition-colors self-start mt-3 underline"
                >
                  Cancel and reset
                </button>
              </div>
            )}

            {state === 'done' && result && (
              <div className="flex flex-col gap-5">
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec">
                  Analysis complete
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                  {result.business?.name || result.business_name || submittedUrl}
                </h2>
                {(result.headline_short || result.headline) && (
                  <p className="text-platinum text-base leading-relaxed">
                    {result.headline_short || result.headline}
                  </p>
                )}
                {result.est_leak && (
                  <div className="bg-elec/10 border border-elec/30 rounded-xl p-4">
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-elec mb-1">
                      Estimated annual leak
                    </p>
                    <p className="font-display text-2xl text-white tracking-tight">{result.est_leak}</p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <a
                    href={PULSE_SMS}
                    className="inline-flex items-center justify-center gap-2 bg-elec hover:bg-elec-light text-ink font-bold px-5 py-3 rounded-xl text-sm transition-colors"
                  >
                    Text me the full PDF
                    <span aria-hidden>{'→'}</span>
                  </a>
                  {result.pdf_url && (
                    <a
                      href={result.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border border-divider/60 hover:border-elec/40 text-platinum hover:text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors"
                    >
                      Open PDF now
                    </a>
                  )}
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs text-mute hover:text-platinum-soft transition-colors self-start mt-1 underline"
                >
                  Run another
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: console */}
          <div className="lg:col-span-3">
            <div className="bg-paper/[0.04] border border-divider/60 rounded-2xl p-6 sm:p-7 min-h-[340px] flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-platinum-soft">
                  Pulse console
                </p>
                <div className="flex items-center gap-2 text-mute text-xs">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${isActive ? 'bg-elec animate-pulse' : state === 'done' ? 'bg-emerald-400' : 'bg-mute-dark'}`} />
                  <span className="font-mono uppercase tracking-wider">
                    {state === 'idle' && 'standby'}
                    {state === 'submitting' && 'starting'}
                    {state === 'running' && 'live'}
                    {state === 'done' && 'complete'}
                    {state === 'error' && 'stopped'}
                  </span>
                </div>
              </div>

              {state === 'idle' && (
                <div className="flex-1 flex flex-col gap-4">
                  <Signal label="Site fetch + render" />
                  <Signal label="Google Business Profile" />
                  <Signal label="Local competitor scan" />
                  <Signal label="Review surface check" />
                  <Signal label="On-page conversion path" />
                  <Signal label="AI search visibility" />
                  <Signal label="Page speed and core vitals" />
                  <p className="text-mute text-xs mt-auto leading-relaxed">
                    Pulse will scan 14 signals end to end. Each one appears here as it lands.
                  </p>
                </div>
              )}

              {(state === 'submitting' || state === 'running') && (
                <div className="flex-1 flex flex-col gap-3">
                  {progress.length === 0 && (
                    <p className="text-mute text-sm">Booting analysis...</p>
                  )}
                  {progress.map((p, i) => (
                    <div
                      key={`${i}-${p.stage || ''}`}
                      className="flex items-center gap-3 text-platinum-soft text-sm animate-fade-in"
                    >
                      <span className="font-mono text-[10px] text-elec uppercase tracking-wider w-16 shrink-0">
                        {String(p.stage || '').slice(0, 10)}
                      </span>
                      <span>{p.label || p.stage}</span>
                    </div>
                  ))}
                  {/* Partial findings */}
                  {partial && Object.keys(partial).length > 0 && (
                    <div className="mt-5 pt-5 border-t border-divider/40">
                      <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-platinum-soft mb-3">
                        Live findings
                      </p>
                      <pre className="text-mute text-[11px] font-mono leading-relaxed whitespace-pre-wrap break-words max-h-48 overflow-auto">
{previewPartial(partial)}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {state === 'done' && result && (
                <div className="flex-1 flex flex-col gap-4">
                  <ScoreTile result={result} />
                  <LeakList leaks={result.leaks} />
                </div>
              )}

              {state === 'error' && (
                <div className="flex-1 flex items-center">
                  <p className="text-platinum-soft text-sm leading-relaxed">
                    {error || 'Something went wrong.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function previewPartial(p: Record<string, unknown>): string {
  try {
    const cleaned: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(p)) {
      if (v == null) continue;
      if (typeof v === 'string') cleaned[k] = v.length > 100 ? `${v.slice(0, 100)}...` : v;
      else if (typeof v === 'number' || typeof v === 'boolean') cleaned[k] = v;
      else if (Array.isArray(v)) cleaned[k] = `${v.length} item${v.length === 1 ? '' : 's'}`;
      else if (typeof v === 'object') cleaned[k] = `{${Object.keys(v as object).length} fields}`;
    }
    return JSON.stringify(cleaned, null, 2);
  } catch {
    return '';
  }
}

function Signal({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-mute text-sm">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-divider" />
      <span>{label}</span>
    </div>
  );
}

function ScoreTile({ result }: { result: PulseResult }) {
  const score = result.scorecard?.overall_score;
  const scoreNum = typeof score === 'number' ? score : typeof score === 'string' ? Number(score) : null;
  return (
    <div className="flex items-end gap-6">
      <div className="flex flex-col">
        <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec mb-2">
          Overall score
        </p>
        <p className="font-display text-5xl sm:text-6xl text-white leading-none">
          {scoreNum != null && !Number.isNaN(scoreNum) ? scoreNum : '--'}
          <span className="text-mute text-2xl ml-1">/100</span>
        </p>
      </div>
      {result.business?.category && (
        <div className="flex flex-col">
          <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-platinum-soft mb-2">
            Category
          </p>
          <p className="text-platinum text-sm">{result.business.category}</p>
        </div>
      )}
    </div>
  );
}

function LeakList({ leaks }: { leaks?: PulseResult['leaks'] }) {
  if (!leaks || leaks.length === 0) return null;
  const items = leaks.slice(0, 4).map((l, i) => {
    const label = typeof l === 'string' ? l : (l.label || l.detail || '');
    return (
      <li key={i} className="flex items-start gap-3 text-platinum-soft text-sm leading-snug">
        <span className="text-elec mt-1 text-xs font-mono">0{i + 1}</span>
        <span>{label}</span>
      </li>
    );
  });
  return (
    <div className="mt-3">
      <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-platinum-soft mb-3">
        Top leaks
      </p>
      <ul className="flex flex-col gap-3">{items}</ul>
    </div>
  );
}
