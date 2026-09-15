import { THEORISTS } from "@/data/slides";

const BLURBS: Record<string, string> = {
  maslow: "Қажеттіліктер 5 деңгейлі пирамида: төменгісі қанағаттанбай, жоғарғысы ынталандырмайды.",
  herzberg: "Гигиеналық факторлар наразылықты азайтады, мотивациялық факторлар шынайы ынта береді.",
  mcclelland: "Адамды үш қажеттілік ынталандырады: жетістік, билік және қарым-қатынас.",
  vroom: "Мотивация = «күш салсам → нәтиже → маңызды сыйақы» деген сенімге байланысты.",
};

export default function OverviewSlide() {
  return (
    <div className="slide">
      <div className="overline rise" style={{ "--i": 0 } as React.CSSProperties}>
        Шолу
      </div>
      <h2 className="h2 rise" style={{ "--i": 1 } as React.CSSProperties}>
        Төрт теория — <span className="accent">бір сұрақ</span>: адамды не ынталандырады?
      </h2>
      <p className="lead rise" style={{ "--i": 2 } as React.CSSProperties}>
        Маслоу мен МакКлелланд — <b>мазмұндық</b> теориялар (нені қалаймыз), Герцберг — факторлар, ал Врум —{" "}
        <b>процессуалдық</b> теория (мотивация қалай пайда болады).
      </p>
      <div className="cards-4">
        {THEORISTS.map((t, i) => (
          <div key={t.id} className="card glass rise" style={{ "--c": t.color, "--i": 3 + i } as React.CSSProperties}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="num">0{i + 1}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="avatar" src={t.photo} alt={t.fullName} />
            </div>
            <h3 className="h3">{t.fullName}</h3>
            <div className="chip">
              <span className="dot" /> {t.theory} · {t.year}
            </div>
            <p>{BLURBS[t.id]}</p>
            <span className="small">{t.speaker}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
