'use client';

import { useEffect, useRef, useState } from 'react';
import PulseSignalRing from './PulseSignalRing';

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
    const MAX_ATTEMPTS = 80;
    pollRef.current = setInterval(async () => {
      attempts += 1;
      if (attempts > MAX_ATTEMPTS) {
        stopPoll();
        stopTick();
        setState('error');
        setError('Took longer than expected. Text your URL to (647) 490-8937 and we will send the diagnostic to your phone.');
        return;
      }
      try {
        const r = await fetch(`/api/pulse/status/${jobId}`, { cache: 'no-store' });
        const data = await r.json();
        if (Array.isArray(data.progress)) setProgress(data.progress);
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
        // keep polling on transient errors
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
    setResult(null);
    setError(null);
    setElapsed(0);
  }

  // Map progress event count to filled nodes (clamp to 14)
  const progressCount =
    state === 'done'
      ? 14
      : state === 'running'
      ? Math.min(progress.length, 14)
      : state === 'submitting'
      ? 1
      : 0;

  const score = (() => {
    const s = result?.scorecard?.overall_score;
    if (typeof s === 'number') return s;
    if (typeof s === 'string') {
      const n = Number(s);
      return Number.isNaN(n) ? null : n;
    }
    return null;
  })();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 px-6 sm:px-12">
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold mb-7 inline-flex items-center gap-2.5 justify-center">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-elec" aria-hidden />
          <span className="text-platinum-soft">Service businesses under $1M</span>
        </p>

        <h1 className="font-display text-[44px] sm:text-[68px] lg:text-[88px] leading-[1.02] tracking-[-0.035em] mb-12 max-w-5xl mx-auto mobile-text-balance">
          Software{' '}
          <span className="text-brand-gradient-slow">should do the job</span>
          ,<br className="hidden sm:block" />{' '}
          not hand you another one.
        </h1>

        {/* THE SIGNAL RING centerpiece */}
        <div className="w-full max-w-[520px] mx-auto">
          <PulseSignalRing state={state} progressCount={progressCount}>
            {state === 'idle' && (
              <form onSubmit={onSubmit} className="flex flex-col items-center gap-4 w-full">
                <p className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase font-bold text-elec">
                  Try it on your business
                </p>
                <input
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  spellCheck={false}
                  placeholder="yourbusiness.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-ink-deep/60 backdrop-blur border border-divider/60 focus:border-elec/70 text-white placeholder:text-mute-dark text-center text-sm sm:text-base px-3 py-3 rounded-lg outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="w-full bg-gradient-to-r from-elec to-hvac disabled:opacity-40 disabled:cursor-not-allowed text-ink font-bold px-4 py-3 rounded-lg text-sm transition-opacity"
                >
                  Run Pulse
                </button>
              </form>
            )}

            {(state === 'submitting' || state === 'running') && (
              <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
                <p className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase font-bold text-elec">
                  Analyzing
                </p>
                <p className="font-display text-lg sm:text-xl text-white tracking-tight break-all max-w-[200px]">
                  {submittedUrl}
                </p>
                <div className="flex items-center gap-2 text-mute text-[10px] sm:text-xs">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-elec animate-pulse" />
                  <span className="font-mono uppercase tracking-wider">{elapsed}s elapsed</span>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="text-[9px] sm:text-[10px] text-mute hover:text-platinum-soft transition-colors mt-1 underline"
                >
                  Cancel
                </button>
              </div>
            )}

            {state === 'done' && result && (
              <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2">
                <p className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase font-bold text-emerald-400">
                  Complete
                </p>
                {score != null && (
                  <p className="font-display text-5xl sm:text-6xl leading-none text-brand-gradient">
                    {score}
                  </p>
                )}
                {result.est_leak && (
                  <p className="text-platinum-soft text-[10px] sm:text-xs tracking-wider">
                    Est. leak <span className="text-white font-semibold">{result.est_leak}</span>
                  </p>
                )}
                <a
                  href={PULSE_SMS}
                  className="mt-2 inline-flex items-center gap-1.5 bg-elec hover:bg-elec-light text-ink font-bold px-3 py-2 rounded-lg text-[11px] transition-colors"
                >
                  Text me the PDF
                  <span aria-hidden>{'→'}</span>
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="text-[9px] text-mute hover:text-platinum-soft transition-colors mt-1 underline"
                >
                  Run another
                </button>
              </div>
            )}

            {state === 'error' && (
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-amber-300/90 text-[11px] sm:text-xs leading-snug px-2">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="text-[10px] text-mute hover:text-platinum-soft transition-colors underline"
                >
                  Try again
                </button>
              </div>
            )}
          </PulseSignalRing>
        </div>

        {/* SMS fallback + call link below the ring */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <a href={PULSE_SMS_PLAIN} className="text-platinum-soft hover:text-white transition-colors">
            Prefer SMS? Text your URL to (647) 490-8937
          </a>
          <span className="text-divider hidden sm:inline">{'·'}</span>
          <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="text-mute hover:text-platinum-soft transition-colors">
            Or book 30 minutes with Jacob
          </a>
        </div>
      </div>
    </section>
  );
}
