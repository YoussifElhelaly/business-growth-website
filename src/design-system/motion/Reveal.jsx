import { motion } from "framer-motion";

export function Reveal({ children, delay = 0, className = "", style, as = "div" }) {
  const Cmp = motion[as] || motion.div;
  return (
    <Cmp
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: delay / 1000, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
      style={style}
    >
      {children}
    </Cmp>
  );
}
