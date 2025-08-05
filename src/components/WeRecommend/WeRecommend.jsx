import React from "react";
import styles from "./WeRecommend.module.css";

// Font Awesome CDN (for demo, in real app, use npm package)
const fontAwesomeLink = (
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  />
);

const recommendLinks = [
  [
    { text: "FINANCIAL AID", href: "scholarships-link.html" },
    { text: "ADMISSIONS", href: "admissions-link.html" },
  ],
  [
    { text: "FEE STRUCTURE", href: "feestructure-link.html" },
    { text: "ORIC", href: "oric-link.html" },
  ],
  [
    { text: "PROGRAMS", href: "programs-link.html" },
    { text: "JBERJ", href: "jberj-link.html" },
  ],
];

const WeRecommend = () => (
  <>
    {fontAwesomeLink}
    <section className={styles.importantLinks}>
      <div className={`container ${styles.importantLinksList}`}>
        <span className={styles.importantLinksHeading}>WE RECOMMEND</span>
        <div className="row">
          {recommendLinks.map((col, colIdx) => (
            <div className="col-md-4 col-lg-4 col-sm-6" key={colIdx}>
              <ul>
                {col.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.text}
                      <i className={`fas fa-arrow-up-right-from-square ${styles.externalLink}`}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default WeRecommend;