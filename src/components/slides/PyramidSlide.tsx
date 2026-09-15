import { MASLOW_LEVELS } from "@/data/slides";

type Props = {
  active: number | null;
  onHover: (i: number | null) => void;
  onPin: (i: number) => void;
};

export default function PyramidSlide({ active, onHover, onPin }: Props) {
  return (
    <div className="slide">
      <div className="pyramid-layout">
        <div className="pyramid-space" />
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 1.6vh, 18px)" }}>
          <div className="overline rise" style={{ "--i": 0 } as React.CSSProperties}>
            1-адам · Маслоу
          </div>
          <h2 className="h2 rise" style={{ "--i": 1 } as React.CSSProperties}>
            Қажеттіліктер <span className="accent">пирамидасы</span>
          </h2>
          <div className="small rise" style={{ "--i": 2 } as React.CSSProperties}>
            Деңгейге тінтуірді апарыңыз немесе пирамидадағы қабатты басыңыз
          </div>
          <div className={`levels ${active !== null ? "has-active" : ""}`}>
            {MASLOW_LEVELS.map((l, i) => (
              <button
                key={l.n}
                className={`level rise ${active === i ? "active" : ""}`}
                style={{ "--c": l.color, "--i": 3 + (MASLOW_LEVELS.length - i) } as React.CSSProperties}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(i)}
                onBlur={() => onHover(null)}
                onClick={() => onPin(i)}
              >
                <span className="n">{l.n}</span>
                <span>
                  <b>{l.title}</b>
                  <span>{l.items}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="example glass rise" style={{ "--i": 9 } as React.CSSProperties}>
            <b>Мысалы:</b> студент алдымен негізгі қажеттіліктерін қамтамасыз етеді, кейін жақсы орта қалыптастырып,
            жоғары нәтижеге жетуге және өзін дамытуға тырысады.
          </div>
        </div>
      </div>
    </div>
  );
}
