import React from "react";
import styles from "./NewsCards.module.css";

const newsItems = [
  {
    title: "IE LAW SCHOOL LAUNCHES THE GLOBAL LEGAL IMPACT FELLOWSHIP",
    description: "A unique opportunity for future leaders in International Law.",
    date: "18/07/2025",
    image: "./assets/bachmatemathics-students-teacher.webp",
  },
  {
    title: "IE UNIVERSITY CELEBRATES THE AI USE CASE AWARDS 2025",
    description: "The AI Use Case Awards 2025 is a competition in which staff and faculty members participated.",
    date: "18/07/2025",
    image: "./assets/program.webp",
  },
  {
    title: "RCRC AND IE UNIVERSITY PARTNER TO LAUNCH THE IE CENTER FOR LEADERSHIP AND INNOVATION IN THE MIDDLE EAST, IN RIYADH'S CREATIVE DISTRICT",
    description:
      "The new IE University Center will be a collaborative space for executives, entrepreneurs, and creative professionals to learn, expand their networks, and share ideas.",
    date: "17/07/2025",
    image:
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80",
  },
];

const NewsCards = () => {
  return (
    <div className={`container-fluid ${styles.newsSection}`}>
      <div className={`row justify-content-center ${styles.cardWrapper}`}>
        {newsItems.map((news, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
            <div className={styles.newsCard}>
              <img src={news.image} alt={news.title} className={styles.newsImage} />
              <span className={styles.newsTitle}>{news.title}</span>
              <p className={styles.newsDescription}>{news.description}</p>
              <div className={styles.newsDate}>{news.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCards;
