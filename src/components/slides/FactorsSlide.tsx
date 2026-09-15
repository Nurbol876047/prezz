import { HERZBERG } from "@/data/slides";

export default function FactorsSlide() {
  const h = HERZBERG.hygiene;
  const m = HERZBERG.motivators;
  return (
    <div className="slide">
      <div className="overline rise" style={{ "--i": 0 } as React.CSSProperties}>
        2-адам · Герцберг
      </div>
      <h2 className="h2 rise" style={{ "--i": 1 } as React.CSSProperties}>
        Екі факторлы теория: <span style={{ color: "#22d3ee" }}>гигиена</span> және{" "}
        <span style={{ color: "#f5b942" }}>мотивация</span>
      </h2>

      <div className="two-cols">
        <div className="factor glass rise" style={{ "--c": "#22d3ee", "--i": 2 } as React.CSSProperties}>
          <h3>{h.title}</h3>
          <div className="sub">{h.sub}</div>
          <ul>
            {h.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
        <div className="vs" aria-hidden />
        <div className="factor glass rise" style={{ "--c": "#f5b942", "--i": 4 } as React.CSSProperties}>
          <h3>{m.title}</h3>
          <div className="sub">{m.sub}</div>
          <ul>
            {m.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="example glass rise" style={{ "--i": 5 } as React.CSSProperties}>
        <b>Қорытынды:</b> жақсы жалақы адамның жұмысына көңілі толмауын азайтады, бірақ оны шын мәнінде ынталандыру үшін
        даму мен жетістік мүмкіндігі де маңызды.
      </div>
    </div>
  );
}
