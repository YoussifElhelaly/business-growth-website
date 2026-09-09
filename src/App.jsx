import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useSiteContent } from "./api/hooks.js";
import { LoadingScreen } from "./ui/LoadingScreen.jsx";
import { SiteLayout } from "./layouts/SiteLayout.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ServicesPage } from "./pages/ServicesPage.jsx";
import { FaqPage } from "./pages/FaqPage.jsx";
import { BlogPage } from "./pages/BlogPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";

export default function App() {
  const { content, isLoading } = useSiteContent();

  return (
    <>
      <AnimatePresence>{!content && isLoading && <LoadingScreen />}</AnimatePresence>
      {content && (
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} /> */}
          </Route>
        </Routes>
      )}
    </>
  );
}
