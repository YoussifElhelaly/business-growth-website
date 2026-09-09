import { AnimatePresence, motion } from "framer-motion";

export function TopProgressBar({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "linear" }}
          className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-copper"
        />
      )}
    </AnimatePresence>
  );
}
