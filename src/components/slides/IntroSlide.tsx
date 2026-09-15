import type { Theorist } from "@/data/slides";

type Props = {
  t: Theorist;
  quote: string;
  body: string;
  facts: { k: string; v: string }[];
};

export default function IntroSlide({ t, quote, body, facts }: Props) {
  const c = { "--c": t.color } as React.CSSProperties;
  return (
    <div className="slide">
      <div className="intro">
        <div className="portrait rise" style={{ "--i": 0 } as React.CSSProperties}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.photo} alt={t.fullName} />
          <span className="credit">{t.photoCredit}</span>
          <div className="cap">
            <b>{t.fullName}</b>
            <span>
              {t.years} · {t.role}
            </span>
          </div>
        </div>

        <div className="intro-text">
          <div className="chip rise" style={{ ...c, "--i": 1 } as React.CSSProperties}>
            <span className="dot" /> {t.speaker}
          </div>
          <h2 className="h2 rise" style={{ "--i": 2 } as React.CSSProperties}>
            {t.theory}
          </h2>
          <div className="quote glass rise" style={{ ...c, "--i": 3 } as React.CSSProperties}>
            {quote}
          </div>
          <p className="lead rise" style={{ "--i": 4 } as React.CSSProperties}>
            {body}
          </p>
          <div className="facts rise" style={{ ...c, "--i": 5 } as React.CSSProperties}>
            {facts.map((f) => (
              <div key={f.k} className="fact">
                <b>{f.k}</b> {f.v}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
