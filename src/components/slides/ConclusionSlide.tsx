import { COMPARISON, THEORISTS } from "@/data/slides";

export default function ConclusionSlide() {
  return (
    <div className="slide">
      <div className="overline rise" style={{ "--i": 0 } as React.CSSProperties}>
        Қорытынды
      </div>
      <h2 className="h2 rise" style={{ "--i": 1 } as React.CSSProperties}>
        Төрт теорияны <span className="accent">салыстыру</span>
      </h2>
      <div className="glass rise" style={{ "--i": 2, overflow: "hidden" } as React.CSSProperties}>
        <table className="table">
          <thead>
            <tr>
              <th>Теория</th>
              <th>Негізгі идея</th>
              <th>Практикада</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((r) => (
              <tr key={r.theory} style={{ "--c": r.color } as React.CSSProperties}>
                <td>
                  {r.theory}
                  <span className="author">{r.author}</span>
                </td>
                <td>{r.idea}</td>
                <td>{r.practice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="thanks rise" style={{ "--i": 3 } as React.CSSProperties}>
        <h2 className="title">Назарларыңызға рахмет!</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {THEORISTS.map((t) => (
            <span key={t.id} className="chip" style={{ "--c": t.color } as React.CSSProperties}>
              <span className="dot" /> {t.speaker} — {t.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
