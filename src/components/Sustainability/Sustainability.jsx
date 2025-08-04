import React from "react";
import styles from "./Sustainability.module.css";

const Sustainability = () => {
  return (
    <section className={styles.sustainabilitySection}>
      <div className="container-fluid">
        <div className="row align-items-stretch">
          {/* Left Text Content */}
          <div className={`col-md-7 d-flex align-items-center ${styles.sustainabilityContent}`}>
            <div>
              <h2>SUSTAINABILITY</h2>
              <p>
                As a leading higher-education institution, we’ve thought a lot about how tomorrow’s
                world will look and what kind of knowledge we must cultivate for our students to
                thrive in it. We are committed to fostering environmental and ethical stewardship as
                well as promoting increased awareness and public understanding.
              </p>
              <a href="#" className={styles.sustainabilityButton}>
                DISCOVER MORE ABOUT SUSTAINABILITY
                <i className="fas fa-arrow-up-right-from-square ms-2"></i>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className={`col-md-5 p-0 ${styles.sustainabilityImage}`}>
            <img src="./assets/maju2.jpg" alt="Sustainability Windmills" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
