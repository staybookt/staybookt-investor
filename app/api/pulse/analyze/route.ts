import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const PULSE_API_BASE = process.env.PULSE_API_BASE || '';
const PULSE_WEB_KEY = process.env.PULSE_WEB_KEY || '';

/**
 * POST /api/pulse/analyze
 * body: { url: string }
 * Proxies to the Pulse Railway backend with the X-Pulse-Web-Key header
 * injected server-side. The browser never sees the secret.
 */
export async function POST(req: Request) {
  if (!PULSE_API_BASE || !PULSE_WEB_KEY) {
    return NextResponse.json(
      { error: 'pulse_not_configured', message: 'The diagnostic is not configured for this environment yet.' },
      { status: 503 }
    );
  }

  let body: { url?: string; name?: string } = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const raw = (body.url || '').trim();
  const name = (body.name || '').trim();
  if (!raw && !name) {
    return NextResponse.json(
      { error: 'no_input', message: 'Add your business URL to start.' },
      { status: 400 }
    );
  }

  let payload: Record<string, string> = {};
  if (raw) {
    const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    payload = { url: normalized };
  } else {
    payload = { name };
  }

  try {
    const upstream = await fetch(`${PULSE_API_BASE}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Pulse-Web-Key': PULSE_WEB_KEY,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });
    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json(
      { error: 'pulse_unreachable', message: 'The diagnostic is briefly offline. Try again in a moment, or text your URL to (647) 490-8937.' },
      { status: 502 }
    );
  }
}
