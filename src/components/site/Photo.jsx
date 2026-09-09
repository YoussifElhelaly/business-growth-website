import { useState } from "react";
import clsx from "clsx";

export function Photo({ src, alt, label, ratio, zoom, fill, className = "", style }) {
  const [err, setErr] = useState(false);
  return (
    <div
      className={clsx("ph", zoom && "ph-zoom", fill && "absolute inset-0", className)}
      style={{ aspectRatio: ratio, ...style }}
    >
      {!err && (
        <img src={src} alt={alt || ""} loading="lazy" onError={() => setErr(true)} />
      )}
      {err && (
        <div className="ph-fb">
          <span>{label || alt || "صورة"}</span>
        </div>
      )}
    </div>
  );
}
