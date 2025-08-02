import { Link } from "react-router-dom";
import React from "react";
import styles from "./AdmissionProcessCards.module.css";

const AdmissionProcessCards = () => {
  return (
    <section className={`py-5 ${styles.admissionProcess}`}>
      <div className="container">
        <h2 className={`text-uppercase mb-3 ${styles.heading}`}>
          Admission Process at IE University
        </h2>
        <p className="mb-5">
          Our rigorous admissions process is focused on identifying the best aspects of each individual’s personal, academic, and professional journey while ensuring diverse and unique students join our community. Learn more about admissions at IE University, including who can apply and how we can assist and support you at each stage of the process.
        </p>

        <div className="row g-4">
          {cardData.map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className="card border-0 shadow-sm h-100">
                <div className={styles.cardImageWrapper}>
                  <img src={card.image} className="card-img-top" alt={card.title} />
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <h6 className="fw-bold text-uppercase">{card.title}</h6>
                  <p>{card.description}</p>
                  <a href={card.link} className={styles.button}>
                    <span>{card.linkText}</span>
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmissionProcessCards;

const cardData = [
  {
    title: "Admissions",
    description:
      "Discover the requirements you must meet to apply, the documentation you’ll have to submit, and the general timeline of the application process.",
    image: "./assets/maju2.jpg",
    linkText: "LEARN MORE ABOUT ADMISSIONS",
    link: "/admissions",
  },
  {
    title: "Financial Aid",
    description:
      "We offer a wide range of financial aid options, from awards to scholarships, flexible payment plans, and attractive financing options.",
    image: "./assets/maju3.jpg",
    linkText: "DISCOVER MORE ABOUT FINANCIAL AID",
    link: "/financial-aid",
  },
  {
    title: "Student Services",
    description:
      "We’re committed to making your time with us as seamless and stress-free as possible, so you can focus on studying and enjoying the IE experience.",
    image: "./assets/bachmatemathics-students-teacher.webp",
    linkText: "EXPLORE STUDENT SERVICES",
    link: "/student-services",
  },
];

