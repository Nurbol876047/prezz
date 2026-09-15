"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { SLIDE_TITLES, byId } from "@/data/slides";
import { IconCompress, IconExpand, IconNext, IconPrev } from "./Icons";
import TitleSlide from "./slides/TitleSlide";
import OverviewSlide from "./slides/OverviewSlide";
import IntroSlide from "./slides/IntroSlide";
import PyramidSlide from "./slides/PyramidSlide";
import FactorsSlide from "./slides/FactorsSlide";
import NeedsSlide from "./slides/NeedsSlide";
import FormulaSlide from "./slides/FormulaSlide";
import ConclusionSlide from "./slides/ConclusionSlide";

const Scene = dynamic(() => import("./three/Scene"), { ssr: false });

const TOTAL = SLIDE_TITLES.length;
const clamp = (n: number) => Math.min(TOTAL - 1, Math.max(0, n));

export default function Presentation() {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [isFs, setIsFs] = useState(false);
  const [idle, setIdle] = useState(false);
  const touchX = useRef<number | null>(null);

  const active = hover ?? pinned;

  const jump = useCallback((n: number) => setIndex(clamp(n)), []);
  const go = useCallback((d: number) => setIndex((i) => clamp(i + d)), []);
  const togglePin = useCallback((i: number) => setPinned((p) => (p === i ? null : i)), []);

  /* ---- fullscreen ---- */
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen({ navigationUI: "hide" });
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* browser refused (e.g. iOS Safari) — nothing to do */
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  /* ---- deep link: #3 opens slide 3; the hash follows the current slide ---- */
  const hashRead = useRef(false);
  useEffect(() => {
    if (!hashRead.current) {
      // first run only: adopt the hash instead of overwriting it
      // (kept in a ref so StrictMode's double-invoke does not clobber it)
      hashRead.current = true;
      const h = parseInt(window.location.hash.slice(1), 10);
      if (h >= 1 && h <= TOTAL && h - 1 !== index) {
        setIndex(h - 1);
        return;
      }
    }
    window.history.replaceState(null, "", `#${index + 1}`);
  }, [index]);

  useEffect(() => {
    const onHash = () => {
      const h = parseInt(window.location.hash.slice(1), 10);
      if (h >= 1 && h <= TOTAL) setIndex(h - 1);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    setPinned(null);
    setHover(null);
  }, [index]);

  /* ---- keyboard ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
        case "Enter":
          e.preventDefault();
          go(1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
        case "Backspace":
          e.preventDefault();
          go(-1);
          break;
        case "Home":
          jump(0);
          break;
        case "End":
          jump(TOTAL - 1);
          break;
        case "f":
        case "F":
        case "а":
        case "А":
          toggleFullscreen();
          break;
        default:
          if (/^[1-9]$/.test(e.key)) jump(Number(e.key) - 1);
          if (e.key === "0") jump(9);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, jump, toggleFullscreen]);

  /* ---- hide chrome when the mouse is idle ---- */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const wake = () => {
      setIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setIdle(true), 3000);
    };
    wake();
    window.addEventListener("mousemove", wake);
    window.addEventListener("keydown", wake);
    window.addEventListener("touchstart", wake);
    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", wake);
      window.removeEventListener("keydown", wake);
      window.removeEventListener("touchstart", wake);
    };
  }, []);

  /* ---- swipe ---- */
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  };

  const slides = [
    <TitleSlide
      key="title"
      onStart={() => jump(1)}
      onFullscreenStart={() => {
        toggleFullscreen();
        jump(1);
      }}
    />,
    <OverviewSlide key="overview" />,
    <IntroSlide
      key="maslow"
      t={byId("maslow")}
      quote="Адамның қажеттіліктері бес деңгейге бөлінеді. Төменгі деңгей қанағаттандырылмайынша, жоғарғы деңгей толық ынталандырмайды."
      body="Маслоу адамның қажеттіліктерін иерархия — пирамида түрінде ұсынды: физиологиялық қажеттіліктерден бастап өзін-өзі жүзеге асыруға дейін. Адам бір деңгейді қанағаттандырған соң келесі деңгейге ұмтылады."
      facts={[
        { k: "1943", v: "«A Theory of Human Motivation» мақаласы" },
        { k: "5 деңгей", v: "пирамида түрінде" },
        { k: "Мазмұндық", v: "теория — «адам нені қалайды?»" },
      ]}
    />,
    <PyramidSlide key="pyramid" active={active} onHover={setHover} onPin={togglePin} />,
    <IntroSlide
      key="herzberg"
      t={byId("herzberg")}
      quote="Қанағаттанудың қарама-қарсысы — қанағаттанбау емес. Бұл екі бөлек шкала."
      body="Адам мотивациясына әсер ететін факторлар екіге бөлінеді: гигиеналық факторлар (болмаса — наразылық) және мотивациялық факторлар (болса — ынта). Бірінің болуы екіншісін алмастырмайды."
      facts={[
        { k: "1959", v: "«The Motivation to Work» кітабы" },
        { k: "203", v: "инженер мен бухгалтерге зерттеу (Питтсбург)" },
        { k: "Гигиена", v: "мотивацияны алмастырмайды" },
      ]}
    />,
    <FactorsSlide key="factors" />,
    <NeedsSlide key="needs" />,
    <IntroSlide
      key="vroom"
      t={byId("vroom")}
      quote="Мотивация — адамның күтуіне байланысты: «күш салсам → нәтиже → сыйақы»."
      body="Адам «Егер мен күш салсам, жақсы нәтиже көрсетемін, ал жақсы нәтиже үшін сыйақы аламын» деп сенсе, оның мотивациясы жоғары болады. Сондықтан мотивация еңбектің нақты нәтижеге және маңызды сыйақыға әкелетініне байланысты."
      facts={[
        { k: "1964", v: "«Work and Motivation» кітабы" },
        { k: "Процессуалдық", v: "теория — «мотивация қалай пайда болады?»" },
        { k: "Йель", v: "менеджмент мектебінің профессоры" },
      ]}
    />,
    <FormulaSlide key="formula" />,
    <ConclusionSlide key="conclusion" />,
  ];

  return (
    <div className={`deck ${idle && isFs ? "idle" : ""}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <Scene slide={index} active={active} onHover={setHover} onPin={togglePin} />

      <div className="progress" style={{ width: `${((index + 1) / TOTAL) * 100}%` }} />

      <main className="stage" key={index}>
        {slides[index]}
      </main>

      <div className="topbar">
        <span className="brand">Мотивация теориялары</span>
        <button className="icon-btn fs" onClick={toggleFullscreen} title={isFs ? "Толық экраннан шығу (F)" : "Толық экран (F)"}>
          {isFs ? <IconCompress /> : <IconExpand />}
          <span>{isFs ? "Шығу" : "Толық экран"}</span>
        </button>
      </div>

      <div className="bottombar glass">
        <button className="icon-btn" onClick={() => go(-1)} disabled={index === 0} title="Алдыңғы (←)">
          <IconPrev />
        </button>
        <div className="dots" role="tablist" aria-label="Слайдтар">
          {SLIDE_TITLES.map((t, i) => (
            <button
              key={t}
              role="tab"
              aria-selected={i === index}
              className={`dot-btn ${i === index ? "active" : ""}`}
              onClick={() => jump(i)}
              title={`${i + 1}. ${t}`}
            />
          ))}
        </div>
        <span className="counter">
          <b>{index + 1}</b> / {TOTAL}
        </span>
        <button className="icon-btn" onClick={() => go(1)} disabled={index === TOTAL - 1} title="Келесі (→)">
          <IconNext />
        </button>
      </div>

      <div className="hint">
        <kbd>←</kbd>
        <kbd>→</kbd>
        <span>навигация</span>
        <kbd>F</kbd>
        <span>толық экран</span>
      </div>
    </div>
  );
}
