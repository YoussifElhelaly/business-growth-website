import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Icon } from "../../design-system/index.js";

export function WhatsappFab() {
  const { t } = useTranslation();
  return (
    <motion.a
      href="#"
      aria-label={t("fab.whatsapp")}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-[26px] start-[26px] z-50 flex h-14 w-14 items-center justify-center rounded-pill bg-whatsapp text-[#04301A] shadow-[0_14px_32px_-12px_rgba(23,28,40,.6)]"
    >
      <Icon name="message-circle" size={25} />
    </motion.a>
  );
}
