import { MCCLELLAND_NEEDS, byId } from "@/data/slides";

export default function NeedsSlide() {
  const t = byId("mcclelland");
  return (
    <div className="slide">
      <div className="split">
        <div className="needs">
          <div className="mini-author rise" style={{ "--c": t.color, "--i": 0 } as React.CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.photo} alt={t.fullName} />
            <div>
              <b>{t.fullName}</b>
              <span>
                {t.speaker} · {t.years} · {t.book}, {t.year}
              </span>
            </div>
          </div>
          <h2 className="h2 rise" style={{ "--i": 1 } as React.CSSProperties}>
            Үш қажеттілік <span className="accent">теориясы</span>
          </h2>
          <p className="lead rise" style={{ "--i": 2 } as React.CSSProperties}>
            Адамды үш негізгі қажеттілік ынталандырады. Олар туа біткен емес — тәжірибе мен орта арқылы қалыптасады,
            және әр адамда біреуі басым болады.
          </p>
          {MCCLELLAND_NEEDS.map((n, i) => (
            <div key={n.key} className="need glass rise" style={{ "--c": n.color, "--i": 3 + i } as React.CSSProperties}>
              <span className="badge">{n.key}</span>
              <div>
                <b>{n.title}</b>
                <p>{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="three-space" />
      </div>
    </div>
  );
}
