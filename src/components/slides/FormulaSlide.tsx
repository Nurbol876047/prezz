import { VROOM_FACTORS } from "@/data/slides";

export default function FormulaSlide() {
  return (
    <div className="slide">
      <div className="overline rise" style={{ "--i": 0 } as React.CSSProperties}>
        4-адам · Врум
      </div>
      <h2 className="h2 rise" style={{ "--i": 1 } as React.CSSProperties}>
        Күту <span className="accent">формуласы</span>
      </h2>
      <div className="formula rise" style={{ "--i": 2 } as React.CSSProperties}>
        <span className="term m">Мотивация</span>
        <span className="op">=</span>
        {VROOM_FACTORS.map((f, i) => (
          <span key={f.key} style={{ display: "contents" }}>
            <span className="term" style={{ "--c": f.color } as React.CSSProperties}>
              {f.title} ({f.key})
            </span>
            {i < VROOM_FACTORS.length - 1 && <span className="op">×</span>}
          </span>
        ))}
      </div>
      <div className="split split-auto">
        <div className="factors">
          {VROOM_FACTORS.map((f, i) => (
            <div key={f.key} className="factor-row glass rise" style={{ "--c": f.color, "--i": 3 + i } as React.CSSProperties}>
              <span className="k">{f.key}</span>
              <div>
                <b>
                  {f.title}
                  <small>{f.en}</small>
                </b>
                <i>{f.q}</i>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
          <div className="example glass rise" style={{ "--i": 6 } as React.CSSProperties}>
            <b>Мысалы:</b> студент емтиханға жақсы дайындалса, жоғары баға алатынын түсінсе, ол көбірек дайындалады.
            Үш көбейткіштің біреуі нөлге тең болса — мотивация да нөл.
          </div>
        </div>
        <div className="three-space" />
      </div>
    </div>
  );
}
