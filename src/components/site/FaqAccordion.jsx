import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon, Reveal } from "../../design-system/index.js";

export function FaqItem({ item, isOpen, onToggle, index }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Reveal delay={index * 70}>
      <motion.div
        className="group relative overflow-hidden rounded-xl"
        style={{
          background: isOpen ? "var(--navy)" : "var(--parchment)",
          border: isOpen ? "1px solid var(--navy)" : "1px solid var(--border-subtle)",
        }}
        animate={{
          boxShadow: isOpen
            ? "0 20px 44px -14px rgba(8,24,38,.22), 0 4px 10px rgba(8,24,38,.06)"
            : "0 2px 6px rgba(10,22,38,.05)",
        }}
        transition={{ duration: 0.35, ease: [0.2, 0.6, 0.2, 1] }}
      >
        {/* Decorative accent bar on left */}
        <motion.div
          className="absolute start-0 top-0 bottom-0 w-[3px]"
          style={{ background: "var(--green)" }}
          initial={false}
          animate={{ scaleY: isOpen ? 1 : 0, originY: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.6, 0.2, 1] }}
        />

        {/* Question row */}
        <button
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center gap-5 text-start"
          style={{ padding: "24px 28px 24px 32px" }}
        >
          {/* Number badge */}
          <span
            className="num flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg font-display text-[15px] font-bold transition-colors duration-300"
            style={{
              background: isOpen ? "rgba(37,199,122,.16)" : "var(--sand)",
              color: isOpen ? "var(--green)" : "var(--text-subtle)",
            }}
          >
            {num}
          </span>

          {/* Question text */}
          <span
            className="flex-1 font-display text-[18px] font-bold leading-[1.55] transition-colors duration-300"
            style={{ color: isOpen ? "var(--text-on-dark)" : "var(--text-strong)" }}
          >
            {item.q}
          </span>

          {/* Toggle icon */}
          <motion.span
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full transition-colors duration-300"
            style={{
              background: isOpen ? "var(--green)" : "var(--sand)",
              color: isOpen ? "var(--navy)" : "var(--text-muted)",
            }}
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <Icon name="plus" size={18} />
          </motion.span>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { type: "spring", stiffness: 260, damping: 28 },
                opacity: { duration: 0.25, delay: 0.05 },
              }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="border-t text-[15px] leading-[1.95]"
                style={{
                  padding: "20px 28px 26px 106px",
                  borderColor: "rgba(255,255,255,.12)",
                  color: "var(--text-on-dark-muted)",
                }}
              >
                {item.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Reveal>
  );
}

export function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="flex flex-col gap-[14px]">
      {items.map((item, i) => (
        <FaqItem
          key={i}
          item={item}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
