import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "../components/site/Navbar.jsx";
import { Footer } from "../components/site/Footer.jsx";
import { WhatsappFab } from "../components/site/WhatsappFab.jsx";
import { RequestDialog } from "./RequestDialog.jsx";
import { useSiteContent } from "../api/hooks.js";
import { TopProgressBar } from "../ui/TopProgressBar.jsx";

export function SiteLayout() {
  const location = useLocation();
  const { isFetching } = useSiteContent();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div>
      <TopProgressBar show={isFetching} />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.2, 0.6, 0.2, 1] }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Footer />
      <WhatsappFab />
      <RequestDialog />
    </div>
  );
}
