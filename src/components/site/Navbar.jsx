import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Icon, Button } from "../../design-system/index.js";
import { useSiteContent } from "../../api/hooks.js";
import { toggleMobileMenu, closeMobileMenu } from "../../app/uiSlice.js";
import logo from "../../assets/logo.jpg";

const NAV_ITEMS = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/services", key: "services" },
  { to: "/faq", key: "faq" },
  { to: "/blog", key: "blog" },
  { to: "/contact", key: "contact" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const menuOpen = useSelector((s) => s.ui.mobileMenuOpen);
  const { content } = useSiteContent();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith("en") ? "ar" : "en");
  };

  return (
    <header className="sticky top-0 z-40">
      <div
        className="overflow-hidden bg-navy-deep text-text-on-dark-muted text-[13px] transition-[height,opacity] duration-slow ease-standard"
        style={{ height: scrolled ? 0 : 40, opacity: scrolled ? 0 : 1 }}
      >
        <div className="wrap flex h-10 items-center gap-7 whitespace-nowrap">
          <a href={`tel:${content?.contact.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-inherit">
            <Icon name="phone" size={14} />
            <span className="num">{content?.contact.phone}</span>
          </a>
          <a href={`mailto:${content?.contact.email}`} className="topbar-extra inline-flex items-center gap-2 text-inherit">
            <Icon name="mail" size={14} />
            <span className="num">{content?.contact.email}</span>
          </a>
          <span className="topbar-extra inline-flex items-center gap-2">
            <Icon name="clock" size={14} />
            {content?.contact.hours}
          </span>
          <button
            onClick={toggleLanguage}
            className="ms-auto inline-flex items-center gap-2 text-green-400 cursor-pointer"
          >
            <Icon name="globe" size={14} />
            {t("nav.languageSwitch")}
          </button>
        </div>
      </div>
      <div
        className={clsx(
          "bg-white/95 backdrop-blur-md transition-shadow duration-base",
          scrolled ? "border-b border-sand-deep shadow-[0_10px_30px_-22px_rgba(23,28,40,.5)]" : "border-b border-border-subtle"
        )}
      >
        <div
          className="wrap flex items-center gap-8 transition-[height] duration-slow ease-standard"
          style={{ height: scrolled ? 68 : 82 }}
        >
          <Link to="/" onClick={() => dispatch(closeMobileMenu())} className="flex items-center gap-3">
            <img src={logo} alt="" className="h-[38px] w-auto" onError={(e) => (e.currentTarget.style.display = "none")} />
            <span className="max-w-[140px] truncate font-display text-[22px] font-bold leading-none text-navy sm:max-w-none">
              {content?.brand.name}
            </span>
          </Link>
          <nav className="nav-links">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  clsx(
                    "relative py-2 text-[15px] transition-colors duration-base",
                    isActive ? "font-semibold text-navy" : "font-medium text-text-muted"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {t(`nav.${item.key}`)}
                    <span
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-right bg-copper transition-transform duration-base ease-standard"
                      style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="ms-auto flex items-center gap-3">
            <Button size="sm" iconEnd="arrow-left" to="/contact" className="hidden sm:inline-flex">
              {t("nav.bookConsult")}
            </Button>
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              aria-label={t("nav.menu")}
              className="nav-burger h-11 w-11 items-center justify-center border border-sand-deep text-navy cursor-pointer"
            >
              <Icon name={menuOpen ? "x" : "menu"} size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-sand-deep">
            <div className="wrap flex flex-col py-3">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => dispatch(closeMobileMenu())}
                  style={({ isActive }) => ({
                    borderInlineStartWidth: 2,
                    borderInlineStartColor: isActive ? "var(--copper)" : "transparent",
                  })}
                  className={({ isActive }) =>
                    clsx(
                      "border-b border-border-subtle py-[14px] ps-[14px] text-[16px]",
                      isActive ? "font-semibold text-navy" : "font-medium text-text-muted"
                    )
                  }
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
