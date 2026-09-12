import { Reveal, CountUp } from "../../design-system/index.js";

export function StatStrip({ items, overlap = true }) {
  return (
    <div className="wrap relative z-[5]" style={{ marginTop: overlap ? -72 : 0 }}>
      <div
        className="r-strip grid grid-cols-4 bg-sand shadow-[0_24px_60px_-32px_rgba(23,28,40,.45)]"
      >
        {items.map((s, i) => (
          <Reveal key={i} delay={i * 90} className={i ? "border-s border-sand-deep" : ""} style={{ padding: "34px 30px" }}>
            <div className="flex items-baseline gap-[2px] font-display text-[52px] font-bold leading-none text-navy">
              <CountUp to={s.value} />
              <span className="text-copper">{s.suffix || ""}</span>
            </div>
            <p className="mt-[10px] text-sm leading-[1.6] text-text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
