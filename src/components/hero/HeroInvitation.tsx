/* eslint-disable react-hooks/set-state-in-effect, react-hooks/immutability */
'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';
import { BISMILLAH_PATHS } from './bismillahPaths';
import { weddingConfig } from '../../../config/wedding';
import './hero-invitation.css';

/* Wire these to config/wedding.ts (real data, Persian digits on purpose). */
export const HERO_DEFAULTS = {
  intro: 'به یاری خداوند متعال',
  bride: weddingConfig.brideFa,
  groom: weddingConfig.groomFa,
  weekday: weddingConfig.weekdayFa,
  month: weddingConfig.solarHijriMonthFa,
  day: weddingConfig.solarHijriDayFa,
  year: weddingConfig.solarHijriYearFa,
  gregorian: weddingConfig.gregorianDateFa,
  venue: weddingConfig.venueNameFa,
  time: `ساعت ${weddingConfig.startTimeFa}`,
  cue: 'ادامه',
};

type HeroProps = Partial<typeof HERO_DEFAULTS> & {
  /** Pass true when the envelope intro has finished. If omitted, the hero starts by itself:
   *  immediately when no [data-envelope-overlay] exists, otherwise on the 'wedding:envelope-opened' window event. */
  play?: boolean;
  /** Called when the scroll cue is clicked (default: smooth-scroll one viewport down). */
  onCue?: () => void;
};

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
const G = '#a07032';

/** Scales the 440px design block so it always fits the free zone. No overflow on any device. */
function useFitToZone(zone: RefObject<HTMLDivElement | null>, inner: RefObject<HTMLDivElement | null>, onReady: () => void) {
  useIsoLayoutEffect(() => {
    const z = zone.current;
    const e = inner.current;
    if (!z || !e) return;
    const fit = () => {
      const cs = getComputedStyle(z);
      const aw = z.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const ah = z.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      e.style.transform = 'none';
      e.style.margin = '0';
      const w = e.offsetWidth;
      const h = e.offsetHeight;
      if (!w || !h) return;
      const s = Math.max(0.2, Math.min(1.45, aw / w, ah / h));
      e.style.transform = `scale(${s})`;
      e.style.margin = `${-(h * (1 - s)) / 2}px ${-(w * (1 - s)) / 2}px`;
    };
    fit();
    onReady();
    window.addEventListener('resize', fit);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
    ro?.observe(e);
    document.fonts?.ready.then(fit);
    return () => {
      window.removeEventListener('resize', fit);
      ro?.disconnect();
    };
  }, []);
}

function Orn({ d }: { d: number }) {
  return (
    <svg className="hi-orn hi-r" style={{ animationDelay: `${d}s` }} viewBox="0 0 150 14" aria-hidden="true">
      <path d="M0 7H55M95 7H150" stroke={G} strokeWidth="1" fill="none" />
      <path d="M75 1L81 7L75 13L69 7Z" fill="none" stroke={G} />
      <circle cx="62" cy="7" r="2" fill={G} />
      <circle cx="88" cy="7" r="2" fill={G} />
    </svg>
  );
}

function Bismillah() {
  return (
    <svg className="hi-bsvg" viewBox="20 18 695 118" role="img" aria-label="بسم الله الرحمن الرحیم">
      <defs>
        <linearGradient id="hi-wf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4d1029" />
          <stop offset="50%" stopColor="#85264e" />
          <stop offset="100%" stopColor="#4d1029" />
        </linearGradient>
        <linearGradient id="hi-eg">
          <stop offset="0" stopColor="#000" />
          <stop offset=".13" stopColor="#fff" />
        </linearGradient>
        <mask id="hi-wm" maskUnits="userSpaceOnUse" x="-100" y="-50" width="1000" height="300">
          <rect className="hi-edge" x="735" y="-50" width="960" height="300" fill="url(#hi-eg)" />
        </mask>
      </defs>
      <g className="hi-glow" mask="url(#hi-wm)">
        <g transform="translate(0,151) scale(0.1,-0.1)" fill="url(#hi-wf)">
          {BISMILLAH_PATHS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </g>
    </svg>
  );
}

function R({ d, className = '', children }: { d: number; className?: string; children: ReactNode }) {
  return (
    <div className={`hi-r ${className}`} style={{ animationDelay: `${d}s` }}>
      {children}
    </div>
  );
}

type Petal = { l: number; s: number; d: number; dl: number };
type Spark = { l: number; t: number; dl: number };

export default function HeroInvitation(props: HeroProps) {
  const t = { ...HERO_DEFAULTS, ...props };
  const zone = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [go, setGo] = useState(props.play === true);
  const [cueOff, setCueOff] = useState(false);
  const [fx, setFx] = useState<{ petals: Petal[]; sparks: Spark[] }>({ petals: [], sparks: [] });

  useFitToZone(zone, inner, () => setReady(true));

  // Start logic: the hero must never stay invisible.
  useEffect(() => {
    if (props.play === true) setGo(true);
  }, [props.play]);
  useEffect(() => {
    const open = () => setGo(true);
    window.addEventListener('wedding:envelope-opened', open);
    if (props.play === undefined && !document.querySelector('[data-envelope-overlay]')) setGo(true);
    const failsafe = window.setTimeout(() => setGo(true), 25000);
    return () => {
      window.removeEventListener('wedding:envelope-opened', open);
      window.clearTimeout(failsafe);
    };
  }, [props.play]);

  // Client-only randomness (no hydration mismatch).
  useEffect(() => {
    setFx({
      petals: Array.from({ length: 8 }, () => ({ l: Math.random() * 100, s: 8 + Math.random() * 8, d: 20 + Math.random() * 14, dl: -Math.random() * 30 })),
      sparks: Array.from({ length: 12 }, () => ({ l: 4 + Math.random() * 92, t: 4 + Math.random() * 92, dl: Math.random() * 3 })),
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setCueOff(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollNext = () => {
    if (props.onCue) return props.onCue();
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };
  const dl = (v: string) => ({ '--dl': v }) as CSSProperties;

  return (
    <section className={`hi-root${go && ready ? ' hi-go' : ''}`} dir="rtl" lang="fa-AF" aria-label="دعوت‌نامهٔ عروسی">
      <div className="hi-frame" aria-hidden="true" />

      {fx.sparks.map((s, i) => (
        <i key={i} className="hi-sp" aria-hidden="true" style={{ left: `${s.l}%`, top: `${s.t}%`, animationDelay: `${s.dl}s` }} />
      ))}

      <div className="hi-fw hi-tl" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hi-fl" src="/hero/corner-flowers.webp" width={787} height={1400} alt="" decoding="async" draggable={false} />
      </div>
      <div className="hi-fw hi-br" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hi-fl" src="/hero/corner-flowers.webp" width={787} height={1400} alt="" decoding="async" draggable={false} />
      </div>

      <div className="hi-zone" ref={zone}>
        <div className="hi-inner" ref={inner}>
          <Bismillah />
          <Orn d={3.1} />
          <R d={3.2} className="hi-sm">{t.intro}</R>

          <div className="hi-names">
            <div className="hi-nm hi-n1" style={dl('3.5s')}>{t.bride}</div>
            <R d={4.4} className="hi-amp">و</R>
            <div className="hi-nm hi-n2" style={dl('4.5s')}>{t.groom}</div>
          </div>

          <R d={5.4} className="hi-dt">
            <div className="hi-dn">{t.weekday}</div>
            <div className="hi-row">
              <div className="hi-mo">{t.month}</div>
              <div className="hi-d">{t.day}</div>
              <div className="hi-yr">{t.year}</div>
            </div>
            <div className="hi-g">{t.gregorian}</div>
          </R>

          <R d={5.9} className="hi-ven">
            <b>{t.venue}</b>
            <span>{t.time}</span>
          </R>
        </div>
      </div>

      {fx.petals.map((p, i) => (
        <i key={i} className="hi-petal" aria-hidden="true" style={{ left: `${p.l}%`, width: p.s, height: p.s, animationDuration: `${p.d}s`, animationDelay: `${p.dl}s` }} />
      ))}

      <button
        type="button"
        className={`hi-cue hi-r${cueOff ? ' hi-cue-off' : ''}`}
        style={{ animationDelay: '7s', background: 'none', border: 0, cursor: 'pointer' }}
        onClick={scrollNext}
        aria-label={t.cue}
      >
        <span className="hi-cue-i">
          <span>{t.cue}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6l5 5 5-5" />
          </svg>
        </span>
      </button>
    </section>
  );
}
