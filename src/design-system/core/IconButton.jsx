import { motion } from "framer-motion";
import clsx from "clsx";
import { Icon } from "./Icon.jsx";

export function IconButton({ name, label, onClick, size = 20, className = "", variant = "ghost" }) {
  const variants = {
    ghost: "text-text-muted hover:bg-ink-100 hover:text-text-strong",
    onDark: "text-text-on-dark-muted hover:bg-white/10 hover:text-white",
  };
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className={clsx(
        "inline-flex h-9 w-9 items-center justify-center rounded-sm transition-colors duration-base",
        variants[variant] || variants.ghost,
        className
      )}
    >
      <Icon name={name} size={size} />
    </motion.button>
  );
}
