import React from "react";
import styles from "./DegreeCards.module.css";

const cards = [
  {
    title: "Bachelor’s",
    image: "/assets/program.webp",
    color: "light",
    link: "#",
  },
  {
    title: "Master’s",
    image: "/assets/bachmatemathics-students-teacher.webp",
    color: "blue",
    link: "#",
  },
  {
    title: "Doctorate",
    image: "/assets/program.webp",
    color: "light",
    link: "#",
  },
  {
    title: "Associate",
    image: "/assets/bachmatemathics-students-teacher.webp",
    color: "blue",
    link: "#",
  },
];

const DegreeCards = () => {
  return (
    <section className="py-3">
      <div className={`container ${styles.Degree}`}>
        <div className="text-left mb-5">
          <h2>DISCOVER OUR PROGRAMS</h2>
          <p>
            At IE University, we specialize in training future-forward leaders with a global vision and a passion for innovation.
            By pushing the boundaries of higher education, our extensive global network—and strategic institutional partnerships—are able to make a lasting impact in their field.
            Discover the right program for your learning journey.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {cards.map((card, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <a href={card.link} className="text-decoration-none">
                <div className={styles.degreeCard}>
                  <div className={styles.imgWrapper}>
                    <img src={card.image} alt={card.title} className="img-fluid" />
                    <span className={styles.overlayText}>Discover</span>
                    <div className={`${styles.hoverOverlay} d-flex flex-column align-items-center justify-content-center`}>
                      <i className="fa-regular fa-eye text-white mb-2"></i>
                      <span className={styles.discoverText}>Discover</span>
                    </div>
                  </div>
                  <div className={`text-center ${card.color === "blue" ? styles.blue : styles.Text}`}>
                    <h6 className={`fw-bold text-uppercase mb-0 ${card.color === "blue" ? "text-white" : "text-dark"}`}>
                      {card.title}
                    </h6>
                    <div className={`${styles.underline} ${card.color === "blue" ? styles.whiteLine : ""}`}></div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DegreeCards;
