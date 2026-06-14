import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const PULSE_API_BASE = process.env.PULSE_API_BASE || '';
const PULSE_WEB_KEY = process.env.PULSE_WEB_KEY || '';

/**
 * GET /api/pulse/status/[jobId]
 * Proxies job-status polling to the Pulse Railway backend.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;

  if (!PULSE_API_BASE || !PULSE_WEB_KEY) {
    return NextResponse.json({ error: 'pulse_not_configured' }, { status: 503 });
  }
  if (!/^[A-Za-z0-9_-]{6,40}$/.test(jobId)) {
    return NextResponse.json({ error: 'bad_id' }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${PULSE_API_BASE}/api/analyze/${jobId}`, {
      method: 'GET',
      headers: { 'X-Pulse-Web-Key': PULSE_WEB_KEY },
      cache: 'no-store',
    });
    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json({ error: 'pulse_unreachable' }, { status: 502 });
  }
}
