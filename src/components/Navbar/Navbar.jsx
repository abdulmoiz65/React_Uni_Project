import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Navbar.module.css";

// Optional: pass your own assets/links via props to keep it reusable.
export default function Navbar({
  logoWhite = "/assets/logo/logowhite.png",
  logoColor = "/assets/maju-logo.webp",
  brandAltWhite = "IE University Logo (white)",
  brandAltColor = "MAJU University Logo (color)",
  ctaHref = "#",
  topLinks = [
    { label: "About MAJU", href: "#" },
    { label: "Programs", href: "#", hasMega: true },
    { label: "Admissions", href: "#" },
    { label: "Faculty & Research", href: "#" },
    { label: "MAJU Experience", href: "#" },
    { label: "News & Events", href: "#" },
  ],
  megaMenu = {
    columns: [
      {
        title: "Professional Pathways",
        links: [
          "Programs in Business & Management",
          "Programs in Design & Architecture",
          "Programs in Finance, Economics & Trade",
          "Programs in Law, International Affairs & Public Policy",
          "Programs in Leadership & Talent Development",
          "Programs in Marketing, Communication & Sales",
          "Programs in Science, Technology & Data",
        ],
      },
      {
        title: "Degree Types",
        links: [
          "Undergraduate Programs",
          "Master’s Programs",
          "Doctorate Programs",
          "Lifelong Learning",
          "Alternative Credentials",
          "MAJU Summer School Programs",
        ],
      },
      {
        title: "Schools",
        links: [
          "MAJU School of Architecture & Design",
          "MAJU Business School",
          "MAJU School of Politics, Economics & Global Affairs",
          "MAJU School of Science & Technology",
          "MAJU Law School",
          "MAJU School of Humanities",
        ],
      },
    ],
  },
  // Offcanvas “next panel” data
  nextPanelData = {
    "Professional Pathways": [
      "Programs in Business & Management",
      "Programs in Design & Architecture",
      "Programs in Finance, Economics & Trade",
      "Programs in Law, International Affairs & Public Policy",
      "Programs in Leadership & Talent Development",
      "Programs in Marketing, Communication & Sales",
      "Programs in Science, Technology & Data",
    ],
    "Degree Types": [
      "Undergraduate Programs",
      "Master’s Programs",
      "Doctorate Programs",
      "Lifelong Learning",
      "Alternative Credentials",
      "IE Summer School Programs",
    ],
    Schools: [
      "IE School of Architecture & Design",
      "IE Business School",
      "IE School of Politics, Economics & Global Affairs",
      "IE School of Science & Technology",
      "IE Law School",
      "IE School of Humanities",
    ],
  },
  offcanvasExtra = ["Registrars Office", "Students", "Parents", "Alumni", "For Companies"],
}) {
  const [scrolled, setScrolled] = useState(false);
  const [navHover, setNavHover] = useState(false);

  // Mega menu (desktop) hover intent
  const [megaOpen, setMegaOpen] = useState(false);
  const hoverTimer = useRef(null);

  // Offcanvas state (mobile)
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [openMenuKey, setOpenMenuKey] = useState(null); // which accordion is open: "programs", ...
  const [nextOpen, setNextOpen] = useState(false);
  const [nextTitle, setNextTitle] = useState("TITLE");
  const [nextLinks, setNextLinks] = useState([]);

  // Detect scroll for styling swap
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close offcanvas on desktop resize
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

  // Lock body scroll and add a body helper class (to mimic your original CSS intent)
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

  // Desktop hover zones (only ≥ 992px)
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

  // Close offcanvas if a “real” link is clicked
  const handleMaybeCloseOffcanvas = (href) => {
    const h = (href || "").trim();
    if (h && h !== "#") toggleOffcanvas(false);
  };

  // Derived classNames
  const topNavClass = useMemo(() => {
    let cls = styles.topNav;
    if (navHover) cls += ` ${styles.navHover}`;
    if (scrolled) cls += ` ${styles.scrolled}`;
    if (offcanvasOpen) cls += ` ${styles.hiddenWhenOffcanvas}`;
    return cls;
  }, [navHover, scrolled, offcanvasOpen]);

  return (
    <>
      {/* Backdrop to mimic Bootstrap offcanvas backdrop */}
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

            {/* Center Nav (desktop) */}
            <nav className={styles.navLinks}>
              {topLinks.map((item, idx) => {
                if (item.hasMega) {
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

                      {/* Mega Menu */}
                      <div
                        className={styles.megaMenu}
                        onMouseEnter={() => window.innerWidth >= 992 && openMega()}
                        onMouseLeave={() => window.innerWidth >= 992 && delayedCloseMega()}
                        style={{ display: window.innerWidth >= 992 && megaOpen ? "block" : undefined }}
                      >
                        <div className={styles.megaMenuInner}>
                          {megaMenu.columns.map((col, cIdx) => (
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

              {/* Hamburger */}
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

      {/* Offcanvas (mobile ≤ 1199.98px) */}
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
          <a href={ctaHref} className="btn btn-outline-light" onClick={() => handleMaybeCloseOffcanvas(ctaHref)}>
            Find Your Program
          </a>

          <nav className={`${styles.navLinks} mt-3`}>
            {/* About */}
            <button
              className={`${styles.mainLink} ${openMenuKey === "about" ? styles.open : ""}`}
              onClick={() => toggleAccordion("about")}
              type="button"
            >
              About MAJU <span className={styles.icon}>+</span>
            </button>

            {/* Programs */}
            <button
              className={`${styles.mainLink} ${openMenuKey === "programs" ? styles.open : ""}`}
              onClick={() => toggleAccordion("programs")}
              type="button"
            >
              Programs <span className={styles.icon}>+</span>
            </button>
            {/* Only programs has submenu in your markup */}
            <div
              className={styles.submenu}
              style={{ display: openMenuKey === "programs" ? "block" : "none" }}
            >
              <div className={styles.submenuItem} onClick={() => openNextPanel("Professional Pathways")}>
                Professional Pathways <i className={`fa-solid fa-arrow-right ${styles.arrow}`}></i>
              </div>
              <div className={styles.submenuItem} onClick={() => openNextPanel("Degree Types")}>
                Degree Types <i className={`fa-solid fa-arrow-right ${styles.arrow}`}></i>
              </div>
              <div className={styles.submenuItem} onClick={() => openNextPanel("Schools")}>
                Schools <i className={`fa-solid fa-arrow-right ${styles.arrow}`}></i>
              </div>
            </div>

            {/* Other top items (no submenu) */}
            <button
              className={`${styles.mainLink} ${openMenuKey === "admissions" ? styles.open : ""}`}
              onClick={() => toggleAccordion("admissions")}
              type="button"
            >
              Admissions <span className={styles.icon}>+</span>
            </button>
            <button
              className={`${styles.mainLink} ${openMenuKey === "faculty" ? styles.open : ""}`}
              onClick={() => toggleAccordion("faculty")}
              type="button"
            >
              Faculty & Research <span className={styles.icon}>+</span>
            </button>
            <button
              className={`${styles.mainLink} ${openMenuKey === "experience" ? styles.open : ""}`}
              onClick={() => toggleAccordion("experience")}
              type="button"
            >
              MAJU Experience <span className={styles.icon}>+</span>
            </button>
            <button
              className={`${styles.mainLink} ${openMenuKey === "news" ? styles.open : ""}`}
              onClick={() => toggleAccordion("news")}
              type="button"
            >
              News & Events <span className={styles.icon}>+</span>
            </button>
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
