import { THEORISTS } from "@/data/slides";
import { IconExpand, IconPlay } from "@/components/Icons";

type Props = {
  onStart: () => void;
  onFullscreenStart: () => void;
};

export default function TitleSlide({ onStart, onFullscreenStart }: Props) {
  return (
    <div className="slide slide-title">
      <div className="overline rise" style={{ "--i": 0 } as React.CSSProperties}>
        Менеджмент негіздері · Мотивация
      </div>
      <h1 className="title rise" style={{ "--i": 1 } as React.CSSProperties}>
        Мотивация теориялары
      </h1>
      <p className="lead rise" style={{ "--i": 2, textAlign: "center" } as React.CSSProperties}>
        Адамды не ынталандырады? Төрт классикалық жауап — Маслоу, Герцберг, МакКлелланд және Врум.
      </p>

      <div className="speakers rise" style={{ "--i": 3 } as React.CSSProperties}>
        {THEORISTS.map((t) => (
          <div key={t.id} className="speaker glass" style={{ "--c": t.color } as React.CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="avatar" src={t.photo} alt={t.fullName} />
            <b>{t.fullName}</b>
            <span>
              {t.speaker} · {t.theory}
            </span>
          </div>
        ))}
      </div>

      <div className="title-actions rise" style={{ "--i": 4 } as React.CSSProperties}>
        <button className="btn btn-primary" onClick={onFullscreenStart}>
          <IconExpand /> Толық экранда бастау
        </button>
        <button className="btn" onClick={onStart}>
          <IconPlay /> Бастау
        </button>
      </div>
      <div className="small rise" style={{ "--i": 5 } as React.CSSProperties}>
        <kbd>←</kbd> <kbd>→</kbd> <kbd>Space</kbd> — слайдтар · <kbd>F</kbd> — толық экран
      </div>
    </div>
  );
}
