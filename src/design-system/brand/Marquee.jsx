export function Marquee({ items = [], speed = 38, onDark = false, className = "" }) {
  const row = [...items, ...items];
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
        WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
      }}
    >
      <div className="flex w-max animate-marquee gap-9" style={{ "--marquee-duration": `${speed}s` }}>
        {row.map((it, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-3 whitespace-nowrap text-sm font-medium tracking-wide ${
              onDark ? "text-text-on-dark-muted" : "text-text-subtle"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-pill bg-copper" />
            {typeof it === "string" ? it : it.label}
          </span>
        ))}
      </div>
    </div>
  );
}
