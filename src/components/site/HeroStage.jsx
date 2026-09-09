import { useEffect, useState } from "react";
import { Photo } from "./Photo.jsx";

export function HeroStage({ images, interval = 6000, children, height = "min(88vh,760px)" }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <section className="relative overflow-hidden  bg-navy" style={{ minHeight: height }}>
      {images.map((src, n) => (
        <div
          key={n}
          className="absolute inset-0"
          style={{ opacity: n === i ? 1 : 0, transition: "opacity 1500ms cubic-bezier(.4,0,.2,1)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: n === i ? "scale(1.09)" : "scale(1)",
              transition: `transform ${interval + 1600}ms linear`,
            }}
          >
            <Photo src={src} fill label="صورة الغلاف" />
          </div>
        </div>
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to left,rgba(8,24,38,.86) 0%,rgba(8,24,38,.62) 46%,rgba(8,24,38,.30) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[120px]"
        style={{ background: "linear-gradient(to top,rgba(8,24,38,.72),transparent)" }}
      />
      <div className="absolute bottom-[104px] start-[var(--gut)] z-[6] flex gap-2">
        {images.map((_, n) => (
          <button
            key={n}
            onClick={() => setI(n)}
            aria-label={`صورة ${n + 1}`}
            className="h-[3px] cursor-pointer transition-[width,background] duration-base ease-standard"
            style={{
              width: n === i ? 34 : 12,
              background: n === i ? "var(--copper)" : "rgba(255,255,255,.4)",
            }}
          />
        ))}
      </div>
      <div className="relative flex items-center" style={{ minHeight: height, paddingBlock: "96px 140px" }}>
        <div className="wrap w-full">{children}</div>
      </div>
    </section>
  );
}
