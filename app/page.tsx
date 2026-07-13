import type { ReactNode } from 'react';
import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import JourneyMap from '@/components/v4/JourneyMap';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

const SHARE_DESCRIPTION =
  'StayBookt finds the revenue you are missing, runs your business day to day, and builds lasting value in what you have made. You built your business to enjoy your life.';

const CLOSER_IMG =
  'https://images.pexels.com/photos/30660768/pexels-photo-30660768.jpeg?auto=compress&cs=tinysrgb&w=2000';

const EXPLORE: { k: string; t: string; d: string; href: string; c: string }[] = [
  { k: 'THE PRODUCT', t: 'How it works', d: 'The website, the front office, the whole system, in one place.', href: '/how-it-works', c: '#38bdf8' },
  { k: 'PRICING', t: 'Pricing', d: 'The simple, honest ways to work with us.', href: '/pricing', c: '#34d399' },
  { k: 'THE TEAM', t: 'About us', d: 'The two founders behind StayBookt, and why we built it.', href: '/founders', c: '#e5e7eb' },
];

export const metadata = {
  title: 'StayBookt. Enjoy Life.',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'StayBookt. Enjoy Life.',
    description: SHARE_DESCRIPTION,
    url: 'https://www.staybookt.com',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'StayBookt. Enjoy Life.', description: SHARE_DESCRIPTION },
};

function ArrowUpRight(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ display: 'inline-block', verticalAlign: '-2px', marginLeft: 5 }} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

const PAGE_CSS = `
.v4{--v4-muted:#86868b;}
.v4 h1,.v4 h2,.v4 h3{font-weight:600;}
.v4 .scene>video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.v4 .scene .reveal{opacity:1;transform:none;}
/* HERO */
.v4 header.scene{align-items:flex-start;}
.v4 header.scene .grad-ov{background:linear-gradient(180deg,rgba(5,5,6,.55) 0%,rgba(5,5,6,.12) 36%,rgba(5,5,6,.38) 68%,rgba(5,5,6,.86) 90%,#050506 100%);}
.v4 header.scene .cta .pill{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.28);backdrop-filter:saturate(160%) blur(14px);-webkit-backdrop-filter:saturate(160%) blur(14px);}
.v4 header.scene .cta .pill:hover{background:rgba(255,255,255,.22);transform:translateY(-1px);}
.v4 header.scene .inner{padding:15vh 0 0;text-align:center;max-width:940px;margin:0 auto;}
.v4 header.scene h1{max-width:16ch;margin:20px auto 0;font-size:clamp(40px,6.6vw,88px);letter-spacing:-.03em;line-height:1.05;color:#f5f5f7;}
.v4 header.scene p.sub{margin:24px auto 0;color:#e9e9ec;max-width:46ch;}
.v4 header.scene .cta{justify-content:center;}
.v4 header.scene .eyebrow{color:#c9cdd6;}
.v4 .kicker{font-size:14px;font-weight:600;letter-spacing:.02em;margin-bottom:14px;background:linear-gradient(90deg,#0ea5e9,#06b6d4 34%,#14b8a6 66%,#10b981);-webkit-background-clip:text;background-clip:text;color:transparent;}
.v4 .sbwrap,.v4 .sb-clook{--grad:linear-gradient(90deg,#0ea5e9,#06b6d4 34%,#14b8a6 66%,#10b981);}
.v4 .sb-clook{background:#fff;padding:clamp(80px,10vw,120px) 0;}
.v4 .sb-clook .cl-head{text-align:center;max-width:600px;margin:0 auto;}
.v4 .sb-clook .cl-head h2{font-size:clamp(30px,4.4vw,52px);letter-spacing:-.025em;line-height:1.08;color:var(--v4-ink);}
.v4 .sb-clook .cl-head p{margin-top:16px;font-size:clamp(17px,1.9vw,21px);color:#86868b;line-height:1.4;}
.v4 .sb-clook .cl-stage{display:grid;grid-template-columns:.82fr 1.18fr;gap:52px;align-items:start;margin-top:clamp(44px,5vw,60px);}
.v4 .sb-clook .cl-menu{display:flex;flex-direction:column;}
.v4 .sb-clook .cli{text-align:left;background:transparent;border:0;border-bottom:1px solid #e6e6ea;padding:17px 40px 17px 6px;cursor:pointer;position:relative;font-family:inherit;width:100%;}
.v4 .sb-clook .cli .ck{display:block;font-size:10.5px;font-weight:700;letter-spacing:.06em;color:#86868b;}
.v4 .sb-clook .cli .cl-lbl{display:block;font-size:21px;font-weight:600;letter-spacing:-.02em;color:#b9b9c0;margin-top:3px;transition:color .25s;}
.v4 .sb-clook .cli .cl-plus{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:24px;height:24px;border-radius:50%;border:1px solid #d0d0d7;color:#9a9aa2;display:flex;align-items:center;justify-content:center;font-size:16px;line-height:1;transition:.28s;}
.v4 .sb-clook .cli .cl-desc{display:block;max-height:0;overflow:hidden;font-size:15px;color:#86868b;line-height:1.46;transition:max-height .38s ease,margin .38s ease;}
.v4 .sb-clook .cli.on .cl-lbl{color:var(--v4-ink);}
.v4 .sb-clook .cli.on .cl-plus{background:var(--grad);border-color:transparent;color:#fff;transform:translateY(-50%) rotate(45deg);}
.v4 .sb-clook .cli.on .cl-desc{max-height:90px;margin-top:11px;}
.v4 .sb-clook .cli:hover .cl-lbl{color:#6a6a72;}
.v4 .sb-clook .cl-viz{position:sticky;top:max(84px,calc(50vh - 290px));min-height:540px;display:flex;align-items:center;justify-content:center;}
.v4 .sb-clook .cl-viz::before{content:'';position:absolute;inset:0;border-radius:32px;background:radial-gradient(75% 62% at 50% 42%,rgba(16,185,129,.07),transparent 72%);border:1px solid rgba(255,255,255,.06);pointer-events:none;}
.v4 .sb-clook .vpanel{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.97) translateY(10px);transition:.5s cubic-bezier(.2,.6,.2,1);pointer-events:none;}
.v4 .sb-clook .vpanel.on{opacity:1;transform:none;pointer-events:auto;}
@media(max-width:880px){.v4 .sb-clook .cl-stage{grid-template-columns:1fr;gap:12px;}.v4 .sb-clook .cl-viz{position:static;min-height:520px;order:-1;margin-bottom:20px;}}
.v4 .sb-clook .cl-viz .appwin{width:470px;}
.v4 .sb-clook .cl-viz .phone{width:264px;}
.v4 .sb-clook .cl-viz .phone .screen{height:472px;}
.v4 .sb-clook .cl-viz .phone .ph-body{gap:8px;padding:14px 12px;}
.v4 .sbwrap .phone{width:300px;max-width:82%;background:#0b0b0d;border-radius:44px;padding:12px;box-shadow:0 40px 80px -30px rgba(0,0,0,.45);position:relative;}
.v4 .sbwrap .phone .screen{background:#f2f2f5;border-radius:33px;overflow:hidden;height:600px;display:flex;flex-direction:column;}
.v4 .sbwrap .phone .notch{position:absolute;top:20px;left:50%;transform:translateX(-50%);width:120px;height:26px;background:#0b0b0d;border-radius:0 0 16px 16px;z-index:3;}
.v4 .sbwrap .ph-bar{background:#fff;padding:14px 16px 12px;border-bottom:1px solid #ececf0;display:flex;align-items:center;gap:10px;}
.v4 .sbwrap .ph-ava{width:34px;height:34px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;flex:0 0 auto;}
.v4 .sbwrap .ph-name{font-size:14px;font-weight:600;}
.v4 .sbwrap .ph-sub{font-size:11px;color:#86868b;}
.v4 .sbwrap .ph-body{flex:1;padding:16px 14px;display:flex;flex-direction:column;gap:9px;overflow:hidden;background:#f2f2f5;}
.v4 .sbwrap .bub{max-width:80%;padding:9px 13px;border-radius:18px;font-size:13.5px;line-height:1.35;}
.v4 .sbwrap .bub.them{align-self:flex-start;background:#e7e7ec;color:#111;border-bottom-left-radius:5px;}
.v4 .sbwrap .bub.us{align-self:flex-end;background:#0a84ff;color:#fff;border-bottom-right-radius:5px;}
.v4 .sbwrap .bub.sys{align-self:center;background:transparent;color:#86868b;font-size:11px;padding:2px;}
.v4 .sbwrap .bub.us.ok{background:#10b981;}
.v4 .sbwrap .ph-tag{background:#fff;border-top:1px solid #ececf0;padding:11px 14px;font-size:11px;color:#86868b;text-align:center;}
.v4 .sbwrap .gsearch{background:#fff;height:100%;display:flex;flex-direction:column;}
.v4 .sbwrap .gs-top{padding:14px 14px 10px;border-bottom:1px solid #eee;}
.v4 .sbwrap .gs-inp{border:1px solid #dcdce1;border-radius:999px;padding:8px 14px;font-size:12.5px;color:#333;}
.v4 .sbwrap .gs-map{height:96px;background:linear-gradient(135deg,#dbe8d5,#cfe0ea);}
.v4 .sbwrap .gs-list{padding:12px 14px;display:flex;flex-direction:column;gap:12px;}
.v4 .sbwrap .gbiz{border:1px solid #ececf0;border-radius:12px;padding:11px 12px;position:relative;}
.v4 .sbwrap .gbiz.first{border-color:rgba(16,185,129,.5);box-shadow:0 6px 20px -10px rgba(16,185,129,.4);}
.v4 .sbwrap .gbiz .rank{position:absolute;top:-8px;left:12px;background:#10b981;color:#fff;font-size:9px;font-weight:700;padding:2px 8px;border-radius:999px;}
.v4 .sbwrap .gbiz .bn{font-size:14px;font-weight:600;}
.v4 .sbwrap .gbiz .stars{font-size:11px;color:#f59e0b;margin-top:3px;}
.v4 .sbwrap .gbiz .stars span{color:#86868b;}
.v4 .sbwrap .gbiz .meta{font-size:11px;color:#86868b;margin-top:3px;}
.v4 .sbwrap .gbiz .acts{display:flex;gap:8px;margin-top:9px;}
.v4 .sbwrap .gbiz .acts .b{font-size:10.5px;font-weight:600;padding:5px 12px;border-radius:999px;border:1px solid #dcdce1;color:#0a84ff;}
.v4 .sbwrap .gbiz .acts .b.fill{background:#10b981;color:#fff;border-color:#10b981;}
.v4 .sbwrap .gbiz.dim{opacity:.62;}
.v4 .sbwrap .browser{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 40px 80px -34px rgba(0,0,0,.4);border:1px solid rgba(0,0,0,.05);}
.v4 .sbwrap .bz-bar{background:#f0f0f3;padding:11px 14px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #e6e6ea;}
.v4 .sbwrap .bz-dot{width:11px;height:11px;border-radius:50%;}
.v4 .sbwrap .bz-url{margin-left:12px;background:#fff;border:1px solid #e2e2e7;border-radius:7px;font-size:11px;color:#8a8a90;padding:4px 12px;flex:1;max-width:260px;}
.v4 .sbwrap .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
.v4 .sbwrap .stat{background:var(--v4-cream);border:1px solid #eee;border-radius:12px;padding:12px 13px;}
.v4 .sbwrap .stat .lbl{font-size:10.5px;color:#86868b;}
.v4 .sbwrap .stat .val{font-size:22px;font-weight:600;letter-spacing:-.02em;margin-top:5px;color:var(--v4-ink);}
.v4 .sbwrap .stat .val small{font-size:12px;color:#10b981;font-weight:600;margin-left:4px;}
.v4 .sbwrap .card{background:#fff;border:1px solid #ececf0;border-radius:10px;padding:9px 10px;}
.v4 .sbwrap .card .cn{font-size:12px;font-weight:600;}
.v4 .sbwrap .card .cm{font-size:10.5px;color:#86868b;margin-top:3px;}
.v4 .sbwrap .pill{display:inline-block;font-size:9.5px;padding:2px 7px;border-radius:999px;background:rgba(14,165,233,.1);color:#0284c7;font-weight:600;white-space:nowrap;}
.v4 .sbwrap .pill.g{background:rgba(16,185,129,.12);color:#059669;}
@media(max-width:520px){.v4 .sbwrap .stats{grid-template-columns:repeat(2,1fr);}}
.v4 .sbwrap .appwin{width:410px;max-width:90%;background:#fff;border-radius:18px;border:1px solid #ececf0;box-shadow:0 44px 90px -44px rgba(0,0,0,.4);overflow:hidden;}
.v4 .sbwrap .aw-top{padding:14px 17px;border-bottom:1px solid #f1f1f4;display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:var(--v4-ink);}
.v4 .sbwrap .aw-ic{width:26px;height:26px;border-radius:8px;background:var(--grad);flex:0 0 auto;}
.v4 .sbwrap .aw-r{margin-left:auto;font-size:11px;font-weight:600;color:#10b981;}
.v4 .sbwrap .aw-body{padding:18px;}
.v4 .sbwrap .aw-body .sub{font-size:12.5px;color:#86868b;}
.v4 .sbwrap .site-hero{background:linear-gradient(180deg,#0f1720,#1a2733);color:#fff;padding:26px 20px 24px;text-align:left;}
.v4 .sbwrap .site-hero .sh-nav{display:flex;justify-content:space-between;font-size:11px;color:#c7d2da;margin-bottom:26px;}
.v4 .sbwrap .site-hero .sh-nav b{color:#fff;}
.v4 .sbwrap .site-hero h5{font-size:24px;font-weight:600;letter-spacing:-.02em;line-height:1.12;color:#fff;}
.v4 .sbwrap .site-hero p{font-size:13px;color:#c7d2da;margin-top:8px;}
.v4 .sbwrap .site-hero .sh-row{display:flex;gap:10px;align-items:center;margin-top:16px;}
.v4 .sbwrap .site-hero .sh-btn{background:#10b981;color:#04150e;font-size:12px;font-weight:700;padding:8px 16px;border-radius:999px;}
.v4 .sbwrap .site-hero .sh-stars{font-size:11px;color:#ffd479;}
.v4 .sbwrap .bk-days{display:flex;gap:7px;margin-bottom:14px;}
.v4 .sbwrap .bk-days .d{flex:1;text-align:center;font-size:11px;color:#86868b;border:1px solid #e9e9ee;border-radius:9px;padding:7px 0;}
.v4 .sbwrap .bk-days .d b{display:block;font-size:15px;color:var(--v4-ink);font-weight:600;margin-top:2px;}
.v4 .sbwrap .bk-days .d.on{border-color:transparent;background:var(--grad);color:#fff;}
.v4 .sbwrap .bk-days .d.on b{color:#fff;}
.v4 .sbwrap .bk-slots{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.v4 .sbwrap .bk-slots .s{font-size:12px;text-align:center;border:1px solid #e2e2e8;border-radius:9px;padding:9px 0;color:#3b3b42;}
.v4 .sbwrap .bk-slots .s.sel{background:#0a0a0b;color:#fff;border-color:#0a0a0b;}
.v4 .sbwrap .bk-slots .s.x{color:#c2c2c9;text-decoration:line-through;}
.v4 .sbwrap .bk-conf{margin-top:14px;background:rgba(16,185,129,.1);color:#059669;font-size:12.5px;font-weight:600;padding:10px 12px;border-radius:10px;}
.v4 .sbwrap .crm-hd{display:flex;align-items:center;gap:12px;}
.v4 .sbwrap .crm-hd .av{width:44px;height:44px;border-radius:50%;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;flex:0 0 auto;}
.v4 .sbwrap .crm-hd .nm{font-size:16px;font-weight:600;color:var(--v4-ink);}
.v4 .sbwrap .crm-hd .mt{font-size:12px;color:#86868b;}
.v4 .sbwrap .crm-tags{display:flex;gap:6px;margin:12px 0;flex-wrap:wrap;}
.v4 .sbwrap .crm-tags span{font-size:10.5px;font-weight:600;padding:3px 9px;border-radius:999px;background:rgba(14,165,233,.1);color:#0284c7;}
.v4 .sbwrap .crm-row{display:flex;justify-content:space-between;font-size:12.5px;padding:9px 0;border-top:1px solid #f1f1f4;color:var(--v4-ink);}
.v4 .sbwrap .crm-row .amt{font-weight:600;}
.v4 .sbwrap .crm-foot{margin-top:12px;font-size:12px;color:#86868b;}
.v4 .sbwrap .q-row{display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid #f1f1f4;color:var(--v4-ink);}
.v4 .sbwrap .q-row .qd{color:#3b3b42;}
.v4 .sbwrap .q-row .qp{font-weight:600;}
.v4 .sbwrap .q-total{display:flex;justify-content:space-between;font-size:16px;font-weight:700;margin-top:10px;color:var(--v4-ink);}
.v4 .sbwrap .q-status{display:flex;gap:6px;margin-top:14px;flex-wrap:wrap;}
.v4 .sbwrap .q-status .qs{font-size:10.5px;font-weight:600;padding:4px 10px;border-radius:999px;background:#f0f0f3;color:#6a6a72;}
.v4 .sbwrap .q-status .qs.on{background:rgba(16,185,129,.12);color:#059669;}
.v4 .sbwrap .an-ins{font-size:16px;font-weight:600;line-height:1.35;letter-spacing:-.01em;color:var(--v4-ink);}
.v4 .sbwrap .an-ins .hl{background:linear-gradient(180deg,transparent 62%,rgba(245,158,11,.35) 62%);}
.v4 .sbwrap .an-chart{display:flex;align-items:flex-end;gap:6px;height:78px;margin:16px 0 8px;}
.v4 .sbwrap .an-chart .b{flex:1;background:#e6e6ec;border-radius:4px 4px 0 0;}
.v4 .sbwrap .an-chart .b.hot{background:var(--grad);}
.v4 .sbwrap .an-fix{font-size:12.5px;color:#059669;font-weight:600;background:rgba(16,185,129,.09);padding:9px 11px;border-radius:9px;}
.v4 .sbwrap .rv-big{font-size:15px;font-weight:600;color:var(--v4-ink);}
.v4 .sbwrap .rv-big b{font-size:26px;}
.v4 .sbwrap .rv-big .st{color:#f59e0b;}
.v4 .sbwrap .rv-item{border-top:1px solid #f1f1f4;padding:11px 0;font-size:12.5px;color:#3b3b42;}
.v4 .sbwrap .rv-item .st{color:#f59e0b;font-size:11px;}
.v4 .sbwrap .rv-item .who{color:#86868b;margin-top:2px;}
.v4 .sbwrap .rp-camp{font-size:15px;font-weight:600;color:var(--v4-ink);}
.v4 .sbwrap .rp-meta{font-size:12.5px;color:#86868b;margin:6px 0 14px;}
.v4 .sbwrap .rp-bar{height:10px;border-radius:999px;background:#eee;overflow:hidden;}
.v4 .sbwrap .rp-bar i{display:block;height:100%;width:64%;background:var(--grad);}
.v4 .sbwrap .rp-res{display:flex;justify-content:space-between;margin-top:12px;font-size:13px;color:var(--v4-ink);}
.v4 .sbwrap .rp-res b{font-weight:700;}
.v4 .sbwrap .brief-l .bi{display:flex;gap:12px;padding:11px 0;border-top:1px solid #f1f1f4;align-items:flex-start;font-size:14px;color:#2b2b30;}
.v4 .sbwrap .brief-l .bi:first-of-type{border-top:0;}
.v4 .sbwrap .brief-l .bic{width:8px;height:8px;border-radius:50%;margin-top:6px;flex:0 0 auto;}
/* proof line */
.v4 .proofline{background:#050506;padding:0 0 clamp(64px,9vw,104px);text-align:center;}
.v4 .proofline p{font-size:15px;color:#86868b;}
.v4 .proofline a{color:#38bdf8;font-weight:600;text-decoration:none;}
/* LADDER */
.v4 .price h2{font-weight:600;letter-spacing:-.025em;}
.v4 .price .seefull a{color:#0891b2;}
/* WHY US */
/* One black. This band used to render as var(--v4-ink) (#06080d) between two
   #050506 sections, which read as a stray black rectangle sitting on the page. */
.v4 .whyus{background:#050506;padding:clamp(84px,11vw,140px) 0;text-align:center;position:relative;overflow:hidden;}
.v4 .whyus::before{content:'';position:absolute;inset:0;background:radial-gradient(50% 60% at 20% 0%,rgba(6,182,212,.12),transparent 60%),radial-gradient(50% 60% at 85% 110%,rgba(16,185,129,.12),transparent 60%);pointer-events:none;}
.v4 .whyus .wrap{position:relative;z-index:1;}
.v4 .whyus .eyebrow{color:#86868b;}
.v4 .whyus blockquote{margin:22px auto 0;font-size:clamp(26px,3.4vw,44px);font-weight:600;letter-spacing:-.03em;line-height:1.14;color:#f5f5f7;max-width:18ch;}
.v4 .whyus .qsub{margin:22px auto 0;font-size:clamp(16px,1.9vw,19px);font-weight:400;line-height:1.55;color:#aeb4c0;max-width:48ch;}
.v4 .whyus cite{display:block;margin-top:26px;font-style:normal;font-size:15px;font-weight:600;color:#86868b;}
.v4 .whyus .learn{color:#38bdf8;}
.v4 .learn{display:inline-block;margin-top:22px;color:#0891b2;font-weight:600;font-size:15px;text-decoration:none;}
/* ===== ALL-DARK CINEMATIC CONSISTENCY PASS ===== */
.v4{font-family:var(--font-display),'Inter Tight','Helvetica Neue',Arial,sans-serif;background:#050506;}
.v4 p,.v4 a,.v4 span,.v4 div,.v4 li,.v4 blockquote,.v4 cite,.v4 button{font-family:inherit;}
.v4 .seam{background:linear-gradient(180deg,rgba(5,5,6,0) 0%,rgba(5,5,6,.55) 45%,#050506 88%) !important;}
.v4 .sb-clook{background:#050506;}
.v4 .sb-clook .cl-head h2{color:#f5f5f7;}
.v4 .sb-clook .cl-head p{color:#a1a1aa;}
.v4 .sb-clook .cli{border-bottom-color:rgba(255,255,255,.1);}
.v4 .sb-clook .cli .cl-lbl{color:#5f6068;}
.v4 .sb-clook .cli.on .cl-lbl{color:#f5f5f7;}
.v4 .sb-clook .cli:hover .cl-lbl{color:#a1a1aa;}
.v4 .sb-clook .cli .cl-plus{border-color:rgba(255,255,255,.22);color:#8a8a90;}
.v4 .sb-clook .cli .cl-desc{color:#9a9aa4;}
.v4 .price{background:#050506;}
.v4 .price h2{color:#f5f5f7;}
.v4 .price .eyebrow{color:#86868b;}
.v4 .price .seefull a{color:#38bdf8;}
.v4 .price .pill-ink{background:#f5f5f7;color:#050506;}
.v4 .price{text-align:center;}
.v4 .price .priceline{font-size:clamp(18px,2.2vw,25px);color:#c7ccd6;margin:18px auto 0;max-width:38ch;line-height:1.42;}
/* WHY US supporting line */
.v4 .whyus .qsub{margin:22px auto 0;font-weight:400;line-height:1.55;color:#aeb4c0;}
/* GO DEEPER / explore navigation */
.v4 .explore{background:#050506;padding:clamp(78px,10vw,128px) 0 clamp(64px,8vw,104px);text-align:center;}
.v4 .explore .eyebrow{color:#86868b;}
.v4 .explore h2{margin-top:14px;font-size:clamp(26px,3.4vw,42px);letter-spacing:-.03em;color:#f5f5f7;font-weight:600;}
.v4 .explore .xgrid{margin:clamp(38px,5vw,58px) auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:1040px;text-align:left;}
@media(max-width:920px){.v4 .explore .xgrid{grid-template-columns:1fr 1fr;}}
.v4 .explore .xcard{display:block;height:100%;text-decoration:none;background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.018));border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:clamp(24px,3vw,34px);transition:border-color .3s ease,transform .3s ease,background .3s ease;}
.v4 .explore .xcard:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.22);background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.02));}
.v4 .explore .xk{font-size:12px;font-weight:700;letter-spacing:.16em;}
.v4 .explore .xt{margin-top:12px;font-size:clamp(20px,2.2vw,26px);font-weight:600;letter-spacing:-.02em;color:#f5f5f7;}
.v4 .explore .xt .ar{color:#86868b;display:inline-block;transition:transform .3s ease;}
.v4 .explore .xcard:hover .xt .ar{transform:translate(3px,-3px);}
.v4 .explore .xd{margin-top:10px;font-size:15px;line-height:1.5;color:#9aa0ab;max-width:36ch;}
@media(max-width:720px){.v4 .explore .xgrid{grid-template-columns:1fr;}}
/* CLOSER promise headline */
.v4 .closer .close-h{font-size:clamp(34px,5.4vw,74px);font-weight:600;letter-spacing:-.035em;line-height:1.03;color:#fff;max-width:15ch;margin:0 auto;text-shadow:0 2px 34px rgba(0,0,0,.55);}
.v4 .closer .close-sub{margin:20px auto 0;font-size:clamp(16px,1.9vw,20px);line-height:1.5;color:#eef1f5;max-width:38ch;text-shadow:0 1px 22px rgba(0,0,0,.6);}
`;

export default function HomePage() {
  return (
    <main id="top" className="v4">
      <style>{PAGE_CSS}</style>
      <Nav />

      {/* 1 — HERO */}
      <header className="scene">
        <video autoPlay muted loop playsInline poster="/hero-poster.jpg" src="/hero-loop.mp4" />
        <div className="grad-ov" />
        <div className="wrap inner">
          <Reveal className="eyebrow" as="div">For owner-operated service businesses</Reveal>
          <Reveal>
            <h1>You built your business to enjoy your life.</h1>
          </Reveal>
          <Reveal>
            <p className="sub">
              We get you found, run the day to day, and turn the work into something you can keep,
              pass on, or sell.
            </p>
          </Reveal>
          <Reveal>
            <div className="cta">
              <a href={START_LINK} className="pill pill-white" style={{ padding: '14px 28px', fontSize: 15 }}>Get Started</a>
            </div>
          </Reveal>
        </div>
        <div className="scrollcue">Scroll</div>
      </header>

      <div className="seam seam-dark-to-cream" aria-hidden="true" />

      {/* 2 — THE SECRET SAUCE (the story, straight after the hero) */}
      <JourneyMap />

      {/* 3 — WHY WE BUILT THIS */}
      <section className="whyus">
        <div className="wrap">
          <Reveal as="div">
            <img
              src="/photos/richard.jpg"
              alt="Richard, Co-founder of StayBookt"
              width={64}
              height={64}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                display: 'block',
                margin: '0 auto 24px',
                boxShadow: '0 0 0 1px rgba(255,255,255,.14)',
              }}
            />
          </Reveal>
          <Reveal className="eyebrow" as="div">Why we built this</Reveal>
          <Reveal>
            <blockquote>
              Every owner we talked to said the same thing. There was never enough time.
            </blockquote>
          </Reveal>
          <Reveal>
            <p className="qsub">
              StayBookt is our answer. We take the busywork off your plate, so you get back to the
              work you love, and the life you built it for.
            </p>
          </Reveal>
          <Reveal>
            <cite>Richard, Co-founder</cite>
          </Reveal>
          <Reveal>
            <div>
              <a href="/founders" className="learn">Meet the founders<ArrowUpRight /></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 — GO DEEPER (navigation) */}
      <section className="explore">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">Go deeper</Reveal>
          <Reveal>
            <h2>Want to look closer? Start anywhere.</h2>
          </Reveal>
          <div className="xgrid">
            {EXPLORE.map((x) => (
              <Reveal key={x.href}>
                <a href={x.href} className="xcard">
                  <div className="xk" style={{ color: x.c }}>{x.k}</div>
                  <div className="xt">
                    {x.t} <span className="ar">↗</span>
                  </div>
                  <div className="xd">{x.d}</div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — CLOSER */}
      <section className="scene closer">
        <img src={CLOSER_IMG} alt="" loading="lazy" decoding="async" />
        <div className="grad-ov" />
        <div className="wrap inner">
          <Reveal>
            <h2 className="close-h">Go enjoy the life you built it for.</h2>
          </Reveal>
          <Reveal>
            <p className="close-sub">We get you found and run the day to day. You get your time back.</p>
          </Reveal>
          <Reveal>
            <div className="cta" style={{ marginTop: 36 }}>
              <a href={START_LINK} className="pill pill-white" style={{ padding: '15px 30px', fontSize: 15 }}>Get Started</a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
