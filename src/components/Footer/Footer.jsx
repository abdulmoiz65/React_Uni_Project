import React from "react";
import styles from "./Footer.module.css";

// Font Awesome CDN (for demo, in real app, use npm package)
const fontAwesomeLink = (
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  />
);

// Update these with your real URLs
const footerLinks1 = [
  { text: "MAJU Business School", href: "#" },
  { text: "School of Computing", href: "#" },
  { text: "ORIC", href: "#" },
  { text: "IT Services", href: "#" },
  { text: "Library", href: "#" },
  { text: "Career Development Center", href: "#" },
];

const footerLinks2 = [
  { text: "MAJU University", href: "#" },
  { text: "Law School", href: "#" },
  { text: "School of Engineering", href: "#" },
  { text: "School of Social Sciences", href: "#" },
  { text: "FYP Portal", href: "#" },
  { text: "Academy", href: "#" },
];

const socialLinks = [
  {
    href: "#",
    icon: "fab fa-facebook-f",
    label: "Facebook",
  },
  {
    href: "#",
    icon: "fab fa-linkedin-in",
    label: "LinkedIn",
  },
  {
    href: "#",
    icon: "fab fa-instagram",
    label: "Instagram",
  },
  {
    href: "#",
    icon: "fab fa-youtube",
    label: "YouTube",
  },
  {
    href: "#",
    icon: "fab fa-tiktok",
    label: "TikTok",
  },
  {
    href: "#",
    icon: "fab fa-twitter",
    label: "Twitter",
  },
  {
    href: "#",
    icon: "fas fa-microphone",
    label: "Podcast",
  },
];

const navLinks = [
  { text: "Legal Notice", href: "/legal-notice" },
  { text: "Privacy Policy", href: "/privacy-policy" },
  { text: "Cookie Policy", href: "/cookie-policy" },
  { text: "Security Policy", href: "/security-policy" },
  { text: "International Offices", href: "/international-offices" },
  { text: "Communications Team", href: "/communications-team" },
  { text: "Student Academic Standards", href: "/student-academic-standards" },
  { text: "Contact", href: "/contact" },
  { text: "MAJU Jobs", href: "#" },
  { text: "MAJU Store", href: "/store" },
  { text: "Donate", href: "/donate" },
  { text: "Site Map", href: "/site-map" },
];

const Footer = () => {
  return (
    <>
      {fontAwesomeLink}
      <footer className={styles.majuFooter}>
        <div className="container">
          {/* Heading */}
          <div className="mb-4">
            <span className={`text-uppercase ${styles.heading}`}>
              MAJU - Inspiring Future Generations
            </span>
          </div>

          {/* Link Columns */}
          <div className={`row ${styles.footerLinks}`}>
            <div className="col-md-6 col-lg-4">
              <ul>
                {footerLinks1.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.text}
                      <i className={`fas fa-arrow-up-right-from-square ${styles.externalIcon}`}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-6 col-lg-4">
              <ul>
                {footerLinks2.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.text}
                      <i className={`fas fa-arrow-up-right-from-square ${styles.externalIcon}`}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="row mt-4">
            <div className="col text-center">
              <h5 className="fw-semibold mb-3">Follow Us</h5>
              <div className={styles.socialIcons}>
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    aria-label={`MAJU on ${item.label}`}
                    title={item.label}
                    rel="noopener"
                    target="_blank"
                    className={styles.socialLink}
                  >
                    <i className={item.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Nav Links */}
          <div className={`row ${styles.footerBottom} mt-4`}>
            <div className="col-12 d-flex flex-wrap justify-content-center mb-2">
              {navLinks.map((item, idx) => (
                <React.Fragment key={idx}>
                  <a href={item.href} className="text-white text-decoration-none mx-2">
                    {item.text}
                  </a>
                  {idx !== navLinks.length - 1 && (
                    <span className="text-white">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Footer Copy and Logo */}
            <div className={`col-12 ${styles.footerCopy}`}>
              <span className="mb-3">&copy; MAJU University 2025</span>
              <div className={styles.footerLogo}>
                <img src="/assets/logo/logowhite.png" alt="MAJU Logo" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;