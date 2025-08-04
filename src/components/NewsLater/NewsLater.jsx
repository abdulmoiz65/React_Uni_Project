import React from "react";
import styles from "./NewsLater.module.css";

const newsData = {
  heading: "MAJU UNIVERSITY LATEST NEWS",
  mainNews: {
    title:
      "QTYR25: WHERE YOUNG QUANTUM RESEARCHERS SHAPE THE FUTURE OF TECHNOLOGY",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    date: "24/07/2023",
    paragraphs: [
      "Quantum Technologies Workshop connects Spain’s quantum community and showcases IE Sci-Tech’s VR innovation.",
      "Quantum technologies are expected to redefine what’s computationally feasible, enabling unbreakable communication, ultra-precise measurements, and the simulation of the world’s most complex problems. Building the ecosystem requires the exchange of knowledge, collaboration, and direct foundation of the next generation.",
      "QTYR25, the Quantum Technologies for Young Researchers workshop, is powered each year by IE School of Science & Technology. The gathering brings together the brightest minds from universities and industry in Spain to tackle quantum computing, quantum information, quantum optics, quantum communication, and quantum imaging.",
    ],
  },
  sideNews: [
    {
      title:
        "IE LAW SCHOOL CELEBRATES THE GRADUATION OF OVER 250 MASTER’S STUDENTS",
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
      description:
        "The ceremony, which also included several awards for students and faculty, featured emotive and inspiring moments.",
      date: "21/07/2023",
    },
    {
      title:
        "IE SCHOOL OF ARCHITECTURE AND DESIGN STUDENTS EXPLORE MADRID’S DESIGN CULTURE",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      description:
        "Organized by IE School of Architecture and Design and hosted by IED, the program offered students deep immersion into the city’s design culture and heritage.",
      date: "18/07/2023",
    },
  ],
};

const NewsLater = () => {
  const { heading, mainNews, sideNews } = newsData;

  return (
    <section className={`container py-5 ${styles.newsLater}`}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className="row">
        {/* Main News */}
        <div className="col-lg-8 mb-4">
          <div className={`ratio ratio-16x9 mb-3`}>
            <img
              src={mainNews.image}
              alt={mainNews.title}
              className={styles.mainImage}
            />
          </div>
          <div>
            <h5 className={styles.title}>{mainNews.title}</h5>
            {mainNews.paragraphs.map((para, idx) => (
              <p key={idx} className={styles.description}>
                {para}
              </p>
            ))}
            <div className={styles.date}>{mainNews.date}</div>
          </div>
        </div>

        {/* Side News */}
        <div className="col-lg-4">
          {sideNews.map((item, idx) => (
            <div className="mb-4" key={idx}>
              <div className={`ratio ratio-16x9`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.sideImage}
                />
              </div>
              <span className={styles.sideTitle}>{item.title}</span>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.date}>{item.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsLater;
