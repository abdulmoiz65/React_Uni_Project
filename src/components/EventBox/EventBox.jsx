import React from "react";
import styles from "./EventBox.module.css";

const EventBox = () => {
  return (
    <section className={`${styles.eventBox} text-white py-5`}>
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="mb-4 mb-md-0">
          <h2 className={`${styles.heading} fw-bold mb-2`}>
            STAY UP TO DATE WITH OUR EVENTS
          </h2>
          <p className={styles.paragraph}>
            We organize over 1,500 events per year, from conferences to master
            classes, networking, and so much more.
          </p>
        </div>
        <a href="#" className={styles.eventButton}>
          DISCOVER OUR EVENTS
          <i className={`fas fa-arrow-up-right-from-square ${styles.externalIcon}`}></i>
        </a>
      </div>
    </section>
  );
};

export default EventBox;
