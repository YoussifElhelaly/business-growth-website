import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function LoadingScreen() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4"
      style={{
        background:
          "radial-gradient(120% 95% at 82% -15%, #2f3749 0%, #23293a 38%, #171c28 72%, #171c28 100%)",
      }}
    >
      <svg width="56" height="56" viewBox="0 0 48 48">
        <rect width="48" height="48" fill="var(--navy)" stroke="rgba(255,255,255,.14)" />
        <motion.path
          d="M11 33 L21 23 L27 29 L37 16"
          stroke="var(--green)"
          strokeWidth="4.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, times: [0, 0.55, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M28.5 15 H38 V24.5"
          stroke="var(--green)"
          strokeWidth="4.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 0, 1, 1, 0] }}
          transition={{ duration: 1.8, times: [0, 0.3, 0.6, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <div className="text-center">
        <div className="font-display text-[15px] font-bold tracking-wide text-white">{t("loading.title")}</div>
        <div className="mt-1 text-xs text-text-on-dark-muted">{t("loading.subtitle")}</div>
      </div>
    </motion.div>
  );
}
