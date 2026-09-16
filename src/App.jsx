import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { AdminGuard } from "./admin/AdminGuard.jsx";
import { AdminLayout } from "./admin/AdminLayout.jsx";
import { LoginPage as AdminLoginPage } from "./admin/LoginPage.jsx";
import { ServicesListPage } from "./admin/ServicesListPage.jsx";
import { ResourcePage } from "./admin/ResourcePage.jsx";

export default function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");
  const { content, isLoading } = useSiteContent();

  return (
    <>
      <AnimatePresence>{!isAdminRoute && !content && isLoading && <LoadingScreen />}</AnimatePresence>
      <Routes>
        {content && (
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        )}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<Navigate to="services" replace />} />
          <Route path="services" element={<ServicesListPage />} />
          <Route path=":resourceKey" element={<ResourcePage />} />
        </Route>
      </Routes>
    </>
  );
}
