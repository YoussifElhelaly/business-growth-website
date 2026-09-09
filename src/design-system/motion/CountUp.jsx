import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export function CountUp({ to = 0, duration = 1.3, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      delay: delay / 1000,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, delay]);

  return (
    <span ref={ref} className={`num ${className}`}>
      {value}
    </span>
  );
}
