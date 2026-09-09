import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Icon } from "./Icon.jsx";

const sizes = {
  sm: { pad: "px-4 py-[9px]", text: "text-sm", gap: "gap-2", icon: 16 },
  md: { pad: "px-6 py-[13px]", text: "text-base", gap: "gap-2", icon: 18 },
  lg: { pad: "px-[34px] py-[17px]", text: "text-[19px]", gap: "gap-3", icon: 20 },
};

const variants = {
  primary: "bg-navy text-white border border-navy hover:bg-navy-700 hover:shadow-md",
  accent: "bg-green text-navy-950 border border-green hover:bg-green-600 hover:border-green-600 hover:text-white hover:shadow-md",
  secondary: "bg-transparent text-text-brand border border-navy hover:bg-navy-50",
  ghost: "bg-transparent text-text-body border border-transparent hover:bg-ink-100",
  onDark: "bg-white text-navy-900 border border-white hover:bg-navy-50",
  whatsapp: "bg-whatsapp text-[#04301A] border border-whatsapp hover:bg-[#3ddd7a]",
};

const MotionButton = motion.button;
const MotionAnchor = motion.a;
const MotionLink = motion.create(Link);

export function Button({
  children,
  variant = "primary",
  size = "md",
  iconStart,
  iconEnd,
  disabled,
  fullWidth,
  to,
  href,
  onClick,
  type = "button",
  className = "",
}) {
  const s = sizes[size] || sizes.md;
  const Cmp = to ? MotionLink : href ? MotionAnchor : MotionButton;
  const extraProps = to ? { to } : href ? { href } : { type, disabled };

  return (
    <Cmp
      {...extraProps}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.2, ease: [0.2, 0.6, 0.2, 1] }}
      className={clsx(
        "group inline-flex items-center justify-center whitespace-nowrap rounded-md font-display font-semibold leading-tight transition-colors transition-shadow duration-base ease-standard",
        s.pad,
        s.text,
        s.gap,
        variants[variant] || variants.primary,
        fullWidth ? "w-full" : "w-auto",
        disabled ? "opacity-45 cursor-not-allowed pointer-events-none" : "cursor-pointer",
        className
      )}
    >
      {iconStart && <Icon name={iconStart} size={s.icon} />}
      <span>{children}</span>
      {iconEnd && (
        <span className="flex transition-transform duration-base ease-standard rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1">
          <Icon name={iconEnd} size={s.icon} />
        </span>
      )}
    </Cmp>
  );
}
