import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Navbar1.module.css";
import NavbarData from "./Navbar1Data"; // ✅ single source of truth

export default function Navbar({
  logoWhite = "/assets/logo/logowhite.png",
  logoColor = "/assets/maju-logo.webp",
  brandAltWhite = "IE University Logo (white)",
  brandAltColor = "MAJU University Logo (color)",
  ctaHref = "#",
}) {
  const { topLinks, megaMenu, nextPanelData, offcanvasExtra } = NavbarData;

  const [scrolled, setScrolled] = useState(false);
  const [navHover, setNavHover] = useState(false);

  // Mega menu (desktop) hover intent
  const [megaOpen, setMegaOpen] = useState(false);
  const hoverTimer = useRef(null);

  // Offcanvas state (mobile)
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [openMenuKey, setOpenMenuKey] = useState(null); 
  const [nextOpen, setNextOpen] = useState(false);
  const [nextTitle, setNextTitle] = useState("TITLE");
  const [nextLinks, setNextLinks] = useState([]);

  // Detect scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close offcanvas on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1200 && offcanvasOpen) {
        setOffcanvasOpen(false);
        setOpenMenuKey(null);
        setNextOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [offcanvasOpen]);

  // Lock body scroll when offcanvas open
  useEffect(() => {
    if (offcanvasOpen) {
      document.body.classList.add("offcanvas-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("offcanvas-open");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("offcanvas-open");
      document.body.style.overflow = "";
    };
  }, [offcanvasOpen]);

  // Desktop hover
  const handleNavEnter = () => {
    if (window.innerWidth >= 992) setNavHover(true);
  };
  const handleNavLeave = () => {
    if (window.innerWidth >= 992) setNavHover(false);
  };

  const openMega = () => {
    clearTimeout(hoverTimer.current);
    setMegaOpen(true);
  };
  const delayedCloseMega = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMegaOpen(false), 80);
  };

  // Offcanvas helpers
  const toggleOffcanvas = (open) => {
    setOffcanvasOpen((prev) => (typeof open === "boolean" ? open : !prev));
    if (!open) {
      setOpenMenuKey(null);
      setNextOpen(false);
    }
  };

  const toggleAccordion = (key) => {
    setOpenMenuKey((prev) => (prev === key ? null : key));
  };

  const openNextPanel = (title) => {
    setNextTitle(title);
    setNextLinks(nextPanelData[title] || []);
    setNextOpen(true);
  };

  const closeNextPanel = () => setNextOpen(false);

  const handleMaybeCloseOffcanvas = (href) => {
    const h = (href || "").trim();
    if (h && h !== "#") toggleOffcanvas(false);
  };

  const topNavClass = useMemo(() => {
    let cls = styles.topNav;
    if (navHover) cls += ` ${styles.navHover}`;
    if (scrolled) cls += ` ${styles.scrolled}`;
    if (offcanvasOpen) cls += ` ${styles.hiddenWhenOffcanvas}`;
    return cls;
  }, [navHover, scrolled, offcanvasOpen]);

  return (
    <>
      {/* Backdrop */}
      {offcanvasOpen && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={() => toggleOffcanvas(false)}
          style={{ zIndex: 1040 }}
        />
      )}

      <div className={topNavClass}>
        <header
          className={styles.navbar}
          id="navbar"
          onMouseEnter={handleNavEnter}
          onMouseLeave={handleNavLeave}
        >
          <div className={styles.inner}>
            {/* Logo */}
            <div className={styles.logo}>
              <img src={logoWhite} alt={brandAltWhite} className={styles.logoWhite} />
              <img src={logoColor} alt={brandAltColor} className={styles.logoColor} />
            </div>

            {/* Center Nav */}
            <nav className={styles.navLinks}>
              {topLinks.map((item, idx) => {
                const key = item.label.toLowerCase().replace(/\s+/g, "");
                const menuData = megaMenu[key];

                if (item.hasMega && menuData) {
                  return (
                    <div
                      key={idx}
                      className={`${styles.navItemWithMega} ${megaOpen ? styles.megaOpen : ""}`}
                      onMouseEnter={() => window.innerWidth >= 992 && openMega()}
                      onMouseLeave={() => window.innerWidth >= 992 && delayedCloseMega()}
                    >
                      <a href={item.href} onClick={(e) => e.preventDefault()}>
                        {item.label}
                      </a>

                      <div className={styles.megaMenu}>
                        <div className={styles.megaMenuInner}>
                          {menuData.columns.map((col, cIdx) => (
                            <div key={cIdx}>
                              <h6>{col.title}</h6>
                              {col.links.map((l, lIdx) => (
                                <a key={lIdx} href="#">
                                  {l}
                                </a>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <a key={idx} href={item.href}>
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Controls */}
            <div className={styles.rightCtrls}>
              <div className={styles.topButton}>
                <a href={ctaHref}>FIND YOUR PROGRAM</a>
              </div>

              <button
                className={styles.hamburger}
                aria-label="Open menu"
                onClick={() => toggleOffcanvas(true)}
                type="button"
              >
                <span></span>
                <span></span>
                <span></span>
                <div className={styles.hamburgerLabel}>Menu</div>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Offcanvas */}
      <div
        className={`offcanvas offcanvas-end ${styles.offcanvasIe} ${offcanvasOpen ? "show" : ""}`}
        role="dialog"
        aria-modal={offcanvasOpen ? "true" : "false"}
        style={{
          visibility: offcanvasOpen ? "visible" : "hidden",
          zIndex: 1050,
        }}
      >
        <div className="offcanvas-header">
          <div className={styles.logo}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7e/IE_University_logo.svg"
              alt="MAJU University Logo"
            />
          </div>
          <button
            className="btn-close btn-close-white ms-auto"
            aria-label="Close"
            onClick={() => toggleOffcanvas(false)}
            type="button"
          />
        </div>

        <div className="offcanvas-body position-relative">
          <a
            href={ctaHref}
            className="btn btn-outline-light"
            onClick={() => handleMaybeCloseOffcanvas(ctaHref)}
          >
            Find Your Program
          </a>

          <nav className={`${styles.navLinks} mt-3`}>
            {topLinks.map((item, idx) => {
              const key = item.label.toLowerCase().replace(/\s+/g, "");
              const menuData = megaMenu[key];

              return (
                <div key={idx}>
                  <button
                    className={`${styles.mainLink} ${openMenuKey === key ? styles.open : ""}`}
                    onClick={() => toggleAccordion(key)}
                    type="button"
                  >
                    {item.label} <span className={styles.icon}>+</span>
                  </button>

                  {item.hasMega && menuData && (
                    <div
                      className={styles.submenu}
                      style={{ display: openMenuKey === key ? "block" : "none" }}
                    >
                      {menuData.columns.map((col, cIdx) => (
                        <div
                          key={cIdx}
                          className={styles.submenuItem}
                          onClick={() => openNextPanel(col.title)}
                        >
                          {col.title}{" "}
                          <i className={`fa-solid fa-arrow-right ${styles.arrow}`}></i>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className={`mt-4 ${styles.extraLinks}`}>
            {offcanvasExtra.map((t, i) => (
              <div key={i}>{t}</div>
            ))}
          </div>

          {/* Next Canvas Panel */}
          <div className={`${styles.offcanvasNext} ${nextOpen ? styles.openPanel : ""}`}>
            <button className={styles.backBtn} onClick={closeNextPanel} type="button">
              <i className={`fa-solid fa-arrow-left ${styles.arrow}`}></i> BACK
            </button>
            <h5 className={styles.nextTitle}>{nextTitle}</h5>
            <div className={styles.nextLinks}>
              {nextLinks.map((l, i) => (
                <a key={i} href="#" onClick={(e) => e.preventDefault()}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
