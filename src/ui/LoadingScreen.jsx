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
          "radial-gradient(120% 95% at 82% -15%, #1B4463 0%, #123049 38%, #081826 72%, #050F1B 100%)",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        className="h-12 w-12 rounded-pill border-[3px] border-white/20"
        style={{ borderTopColor: "var(--copper)" }}
      />
      <div className="text-center">
        <div className="font-display text-[15px] font-bold tracking-wide text-white">{t("loading.title")}</div>
        <div className="mt-1 text-xs text-text-on-dark-muted">{t("loading.subtitle")}</div>
      </div>
    </motion.div>
  );
}
