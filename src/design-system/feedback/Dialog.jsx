import { AnimatePresence, motion } from "framer-motion";
import { IconButton } from "../core/IconButton.jsx";

export function Dialog({ open, title, children, footer, onClose, width = 520 }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--overlay-scrim)] p-6 backdrop-blur-sm"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.2, 0.6, 0.2, 1] }}
            style={{ maxWidth: width }}
            className="w-full overflow-hidden rounded-lg bg-white shadow-float"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border-subtle px-6 py-[22px]">
              <h4 className="text-[20px] font-display font-bold text-text-strong">{title}</h4>
              <IconButton name="x" label="إغلاق" onClick={onClose} />
            </div>
            <div className="p-6">{children}</div>
            {footer && (
              <div className="flex justify-start gap-3 border-t border-border-subtle bg-ink-50 px-6 py-[18px]">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
