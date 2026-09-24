"use client";

import React from "react";
import { event } from "@/lib/event";

/**
 * Wedding invitation hero: a full-screen section, no card, border or shadow.
 * Needs two images in the site's public/static folder:
 *   /botanical-corner.png  (leaves)   and   /flower-corner.webp  (flowers)
 * No other files or libraries. Edit the text in DETAILS.
 */

const DETAILS = {
  bismillah: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
  intro: ["You are invited to", "the wedding of"],
  first: event.groomNameEn || "Farhad",
  second: event.brideNameEn || "Adeeba",
  month: "October",
  weekday: "Tuesday",
  day: "13",
  time: "at 6:00 pm",
  year: "2026",
  venue: event.venueNameEn || "Sulaiman Wedding Hall",
  address: "Kabul, Afghanistan",
  after: "Reception to follow",
};

type Props = { cornerSrc?: string; flowerSrc?: string };

const delay = (s: string) => ({ "--d": s } as React.CSSProperties);

export default function WeddingInvitation({
  cornerSrc = "/botanical-corner.png",
  flowerSrc = "/flower-corner.webp",
}: Props) {
  const D = DETAILS;
  return (
    <section className="wh" aria-label="Wedding invitation">
      <style>{css}</style>

      <div className="wh-art wh-tl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cornerSrc} alt="" />
      </div>
      <div className="wh-art wh-br">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cornerSrc} alt="" />
      </div>
      <div className="wh-art wh-fl wh-bl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={flowerSrc} alt="" />
      </div>
      <div className="wh-art wh-fl wh-tr">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={flowerSrc} alt="" />
      </div>

      <div className="wh-stage">
        <div className="wi-content">
          <p className="wi-bism wi-fade" lang="ar" dir="rtl" style={delay("0.7s")}>{D.bismillah}</p>
          <p className="wi-intro wi-fade" style={delay("1.5s")}>
            {D.intro[0]}<br />{D.intro[1]}
          </p>

          <h1 className="wi-names">
            <span className="wi-name wi-wipe" style={delay("2.2s")}>{D.first}</span>
            <span className="wi-amp wi-fade" style={delay("3.3s")}>&amp;</span>
            <span className="wi-name wi-wipe" style={delay("3.6s")}>{D.second}</span>
          </h1>

          <div className="wi-date wi-fade" style={delay("4.9s")}>
            <span className="wi-caps">{D.month}</span>
            <div className="wi-row">
              <span className="wi-caps">{D.weekday}</span>
              <span className="wi-day">
                <i className="wi-bar" style={delay("5.1s")} />
                {D.day}
                <i className="wi-bar" style={delay("5.1s")} />
              </span>
              <span className="wi-caps">{D.time}</span>
            </div>
            <span className="wi-year">{D.year}</span>
          </div>

          <p className="wi-place wi-fade" style={delay("5.6s")}>
            <strong>{D.venue}</strong><br />{D.address}
          </p>
          <p className="wi-after wi-fade" style={delay("6.1s")}>{D.after}</p>
        </div>
      </div>
    </section>
  );
}

const svg = (body: string, size: number) =>
  "data:image/svg+xml," +
  encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>${body}</svg>`);
// paper grain + soft watercolor clouds, generated in code (no image files)
const GRAIN = svg(
  "<filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .32 0 0 0 0 .26 0 0 0 0 .18 0 0 0 .09 0'/></filter><rect width='100%' height='100%' filter='url(#g)'/>",
  320
);
const CLOUD = svg(
  "<filter id='c'><feTurbulence type='fractalNoise' baseFrequency='.008' numOctaves='4' seed='7'/><feColorMatrix values='0 0 0 0 .84 0 0 0 0 .68 0 0 0 0 .54 0 0 0 .28 -.06'/></filter><rect width='100%' height='100%' filter='url(#c)'/>",
  900
);

const css = `
@import url("https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Tenor+Sans&family=Aref+Ruqaa:wght@400;700&display=swap");

.wh{
  --ink:#45463A; --sage:#5C775F; --gold:#BF8B3E;
  --sans:"Tenor Sans","Helvetica Neue",Arial,sans-serif;
  --script:"Pinyon Script","Snell Roundhand","Apple Chancery",Georgia,serif;
  --ns:12; --as:6.2; /* size of the names / closing line, in % of the invitation width */
  --w:min(100vw,calc(100vh*.7071),520px);
  --art:max(calc(var(--w)*.42),min(24vw,34vh));
  position:relative; overflow:hidden; box-sizing:border-box;
  width:100%; min-height:100vh; display:grid; place-items:center;
  color:var(--ink); text-align:center; font-family:var(--sans);
  background:
    url("${GRAIN}"),
    url("${CLOUD}") 0 0/100% 100%,
    radial-gradient(70% 38% at 82% 40%, rgba(236,207,186,.18), transparent 70%),
    radial-gradient(60% 34% at 10% 62%, rgba(238,222,204,.30), transparent 70%),
    radial-gradient(90% 40% at 50% 104%, rgba(226,203,180,.20), transparent 70%),
    linear-gradient(180deg,#FCFAF6 0%,#F8F2EA 100%);
}
@supports (height:100svh){
  .wh{--w:min(100vw,calc(100svh*.7071),520px);--art:max(calc(var(--w)*.42),min(24vw,34svh));min-height:100svh}
}
:where(.wh) :is(p,h1){margin:0}

/* corner artwork: same two images used twice, the second copy rotated 180deg */
.wh-art{position:absolute;width:var(--art);pointer-events:none;z-index:0;--off:calc(var(--art)*-.05)}
.wh-fl{width:calc(var(--art)*.9)}
.wh-tl{top:var(--off);left:var(--off);--wd:7s;--wl:2.4s}
.wh-br{bottom:var(--off);right:var(--off);transform:rotate(180deg);--wd:8.5s;--wl:2.7s}
.wh-bl{bottom:var(--off);left:var(--off);--gt:-4% 4%}
.wh-tr{top:var(--off);right:var(--off);transform:rotate(180deg);--gt:-4% 4%}
.wh-art img{
  display:block;width:100%;height:auto;transform-origin:0 0;
  animation:wi-grow 2.4s cubic-bezier(.2,.7,.2,1) both, wi-wind var(--wd) var(--wl) ease-in-out infinite both;
}
/* flowers stay still; only the leaves move in the wind */
.wh-fl img{transform-origin:0 100%;animation:wi-grow 2.6s .5s cubic-bezier(.2,.7,.2,1) both}

.wh-stage{position:relative;z-index:1;width:var(--w);aspect-ratio:1240/1754;container-type:inline-size}
.wi-content{
  position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:11cqw 16cqw 9cqw;
}
.wi-bism{font-family:"Aref Ruqaa","Amiri","Noto Naskh Arabic",serif;font-size:5.4cqw;line-height:1.9;margin-bottom:4cqw}
.wi-intro{font-size:3.3cqw;line-height:1.6;letter-spacing:.07em}
.wi-names{display:flex;flex-direction:column;align-items:center;margin:4cqw 0 5.5cqw;font-weight:400}
.wi-name{display:block;font-family:var(--script);font-size:calc(var(--ns)*1cqw);line-height:1.2;padding:0 5cqw}
.wi-amp{font-size:5cqw;color:var(--sage);line-height:1.5}

.wi-date{display:flex;flex-direction:column;align-items:center;gap:1.6cqw}
.wi-caps{font-size:2.8cqw;letter-spacing:.14em;text-transform:uppercase}
.wi-row{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:3cqw;width:100%}
.wi-day{display:flex;align-items:center;gap:2.8cqw;font-size:11cqw;line-height:1;color:var(--sage)}
.wi-bar{display:block;width:.4cqw;height:10.5cqw;background:var(--gold);transform-origin:center;animation:wi-bar 1.1s var(--d) cubic-bezier(.5,0,.2,1) both}
.wi-year{font-size:4.2cqw;letter-spacing:.1em}

.wi-place{margin-top:5cqw;font-size:3cqw;line-height:1.75;letter-spacing:.05em}
.wi-place strong{font-weight:400}
.wi-after{margin-top:2.5cqw;font-family:var(--script);font-size:calc(var(--as)*1cqw);line-height:1.3;color:var(--sage)}

.wi-fade{animation:wi-fade 1.8s var(--d) ease both}
.wi-wipe{animation:wi-wipe 2s var(--d) cubic-bezier(.5,0,.2,1) both}

@keyframes wi-grow{from{opacity:0;scale:.9;translate:var(--gt,-4% -4%);filter:blur(8px)}to{opacity:1;scale:1;translate:0 0;filter:blur(0)}}
/* wind: uneven gusts that bend the leaves from the corner they grow out of */
@keyframes wi-wind{
  0%{transform:rotate(0) skewX(0)}
  16%{transform:rotate(2.2deg) skewX(2.8deg)}
  30%{transform:rotate(.9deg) skewX(1deg)}
  52%{transform:rotate(-1.3deg) skewX(-1.8deg)}
  70%{transform:rotate(1.5deg) skewX(2deg)}
  100%{transform:rotate(0) skewX(0)}
}
@keyframes wi-fade{from{opacity:0}to{opacity:1}}
@keyframes wi-wipe{from{clip-path:inset(-30% 100% -40% -10%)}to{clip-path:inset(-30% -10% -40% -10%)}}
@keyframes wi-bar{from{transform:scaleY(0)}to{transform:scaleY(1)}}

@media (prefers-reduced-motion:reduce){.wh *{animation:none !important}}
`;
