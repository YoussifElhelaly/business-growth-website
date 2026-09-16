import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";
import { BrandMark, Icon, IconButton } from "../design-system/index.js";
import { useAdminLogout } from "../api/adminHooks.js";
import { RESOURCES, NAV_GROUPS } from "../../shared/resources.js";

const SIDEBAR_WIDTH = 260;

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "flex items-center gap-3 border-s-[3px] px-3 py-2.5 text-sm font-semibold transition-colors duration-base",
          isActive
            ? "border-copper bg-white/5 text-white"
            : "border-transparent text-text-on-dark-muted hover:bg-white/5 hover:text-white"
        )
      }
    >
      <Icon name={icon} size={17} />
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export function AdminLayout() {
  const navigate = useNavigate();
  const logout = useAdminLogout();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout.mutate(undefined, { onSuccess: () => navigate("/admin/login", { replace: true }) });
  };

  return (
    <div className="flex min-h-screen bg-sand">
      <motion.aside
        animate={{ width: sidebarOpen ? SIDEBAR_WIDTH : 0 }}
        transition={{ duration: 0.28, ease: [0.2, 0.6, 0.2, 1] }}
        className="shrink-0 overflow-hidden bg-navy text-text-on-dark"
      >
        <div className="flex h-screen flex-col" style={{ width: SIDEBAR_WIDTH }}>
          <div className="flex items-center gap-3 px-6 py-6">
            <BrandMark size={32} className="text-copper" />
            <span className="font-display text-base font-bold">لوحة التحكم</span>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-3">
            <NavItem to="/admin/services" label="الخدمات" icon="building" />
            {NAV_GROUPS.map((group) => {
              const items = RESOURCES.filter((r) => r.navGroup === group.key);
              if (items.length === 0) return null;
              return (
                <div key={group.key} className="mt-3">
                  <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wide text-text-on-dark-muted/70">
                    {group.label}
                  </p>
                  {items.map((r) => (
                    <NavItem key={r.key} to={`/admin/${r.key}`} label={r.navLabel} icon={r.fields.some((f) => f.key === "icon") ? "sparkles" : "file-text"} />
                  ))}
                </div>
              );
            })}
          </nav>
          <button
            onClick={handleLogout}
            disabled={logout.isPending}
            className="flex items-center gap-3 border-t border-white/10 px-6 py-4 text-sm font-semibold text-text-on-dark-muted transition-colors duration-base hover:text-white disabled:opacity-55"
          >
            <Icon name="log-out" size={18} />
            تسجيل الخروج
          </button>
        </div>
      </motion.aside>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center border-b border-border-subtle bg-white px-4 py-3">
          <IconButton
            name="menu"
            label={sidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setSidebarOpen((o) => !o)}
          />
        </div>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
