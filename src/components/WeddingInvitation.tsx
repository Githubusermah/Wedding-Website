"use client";

import { useEffect, useRef } from "react";
import { Poppins, Aref_Ruqaa, Mrs_Saint_Delafield } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-aref",
});

const mrsSaintDelafield = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export default function WeddingInvitation() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function fit() {
      const stage = stageRef.current;
      if (!stage) return;
      const scale =
        Math.min(window.innerWidth / 1240, window.innerHeight / 1748) * 0.98;
      stage.style.transform = `scale(${scale})`;
    }
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
    };
  }, []);

  return (
    <div
      className={`${poppins.variable} ${arefRuqaa.variable} ${mrsSaintDelafield.variable}`}
      style={{
        width: "100%",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        overscrollBehavior: "none",
        background: "var(--bg-cream, #ece6d8)",
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div ref={stageRef} className="invitation-stage">
        <div className="invitation-page">
          {/* Animated Botanical Foliage Accents */}
          <svg className="botanical-leaf top-left" viewBox="0 0 100 100">
            <path d="M10 80 Q 50 10 90 80 Q 50 50 10 80 Z" fill="#37472f" opacity="0.3" />
          </svg>
          <svg className="botanical-leaf bottom-right" viewBox="0 0 100 100">
            <path d="M10 80 Q 50 10 90 80 Q 50 50 10 80 Z" fill="#b8923f" opacity="0.25" />
          </svg>

          <div className="el bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="el invited">
            You Are Invited To
            <br />
            The Wedding Of
          </div>

          <div className="el name-first handwriting">Daniel</div>
          <div className="el amp">&amp;</div>
          <div className="el name-second handwriting">Marceline</div>

          <div className="el month">DECEMBER</div>
          <div className="date-row">
            <div className="side">SATURDAY</div>
            <div className="bar" />
            <div className="day">14</div>
            <div className="bar" />
            <div className="side">AT 07:00 PM</div>
          </div>
          <div className="el year">2024</div>
          <div className="el address">
            123 Anywhere St., Any City,
            <br />
            ST 12345
          </div>
          <div className="el reception handwriting-subtle">Reception to follow</div>
        </div>
      </div>

      <style jsx>{`
        .invitation-stage {
          width: 1240px;
          height: 1748px;
          transform-origin: center center;
          position: relative;
          flex-shrink: 0;
        }
        .invitation-page {
          width: 1240px;
          height: 1748px;
          position: relative;
          background-image: url("/invitation-bg.png");
          background-size: 1240px 1748px;
          background-repeat: no-repeat;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          opacity: 0;
          animation: pageIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Botanical Foliage Floating */
        .botanical-leaf {
          position: absolute;
          width: 220px;
          height: 220px;
          z-index: 2;
          pointer-events: none;
        }
        .top-left {
          top: 40px;
          left: 40px;
          animation: sway 6s ease-in-out infinite alternate;
        }
        .bottom-right {
          bottom: 40px;
          right: 40px;
          transform: rotate(180deg);
          animation: sway 8s ease-in-out infinite alternate-reverse;
        }

        @keyframes sway {
          0% { transform: rotate(0deg) translate(0px, 0px); }
          100% { transform: rotate(6deg) translate(10px, 12px); }
        }

        @keyframes pageIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .el {
          position: absolute;
          left: 0;
          width: 1240px;
          text-align: center;
          color: #37472f;
          opacity: 0;
          transform: translateY(28px);
          animation: riseIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          font-family: var(--font-poppins);
        }

        /* Handwriting Reveal Effect */
        .handwriting {
          clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
          animation: writeIn 1.4s cubic-bezier(0.25, 1, 0.5, 1) forwards !important;
        }

        @keyframes writeIn {
          to {
            opacity: 1;
            transform: translateY(0);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }

        @keyframes riseIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bismillah {
          top: 214px;
          font-family: var(--font-aref);
          font-weight: 700;
          font-size: 48px;
          direction: rtl;
          animation-delay: 0.3s;
        }
        .invited {
          top: 372px;
          font-weight: 500;
          letter-spacing: 2px;
          font-size: 27px;
          line-height: 1.65;
          animation-delay: 0.5s;
        }
        .name-first {
          top: 548px;
          font-family: var(--font-script);
          font-size: 145px;
          line-height: 1;
          animation-delay: 0.75s;
        }
        .amp {
          top: 722px;
          font-weight: 600;
          font-size: 40px;
          opacity: 0;
          transform: scale(0.7);
          animation: ampPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 1.1s;
        }
        @keyframes ampPop {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .name-second {
          top: 782px;
          font-family: var(--font-script);
          font-size: 145px;
          line-height: 1;
          animation-delay: 1.35s;
        }
        .month {
          top: 1024px;
          font-weight: 500;
          letter-spacing: 5px;
          font-size: 21px;
          animation-delay: 1.65s;
        }
        .date-row {
          top: 1085px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 22px;
          position: absolute;
          left: 0;
          width: 1240px;
          opacity: 0;
          transform: translateY(20px);
          animation: riseIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.8s;
          font-family: var(--font-poppins);
        }
        .side {
          font-weight: 500;
          letter-spacing: 2.5px;
          font-size: 23px;
          color: #37472f;
        }
        .bar {
          width: 3px;
          height: 95px;
          background: #b8923f;
          transform: scaleY(0);
          transform-origin: center;
          animation: barIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 2.1s;
        }
        @keyframes barIn {
          to {
            transform: scaleY(1);
          }
        }
        .day {
          font-weight: 600;
          font-size: 130px;
          color: #37472f;
          line-height: 1;
        }
        .year {
          top: 1262px;
          font-weight: 500;
          font-size: 30px;
          animation-delay: 2s;
        }
        .address {
          top: 1362px;
          font-weight: 500;
          font-size: 24px;
          line-height: 1.5;
          animation-delay: 2.2s;
        }
        .reception {
          top: 1488px;
          font-family: var(--font-script);
          font-size: 64px;
          animation-delay: 2.4s;
        }
      `}</style>
    </div>
  );
}
