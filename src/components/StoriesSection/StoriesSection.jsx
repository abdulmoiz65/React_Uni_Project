import { useEffect } from "react";
import styles from "./StoriesSection.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const stories = [
  {
    img: "https://i.pravatar.cc/800?img=12",
    name: "Leonie Zillikens",
    quote:
      "“IE University’s training in data interpretation and human-centered research gave me a strong foundation to advise clients and colleagues.”",
  },
  {
    img: "https://i.pravatar.cc/800?img=5",
    name: "Isabella Gelberg-Hansen",
    quote:
      "“Behavior & Social Sciences prepared me to navigate complex environments and manage diverse priorities.”",
  },
  {
    img: "https://i.pravatar.cc/800?img=33",
    name: "Joaquín González",
    quote:
      "“I combined analytical rigor with creativity—crucial for my consulting role.”",
  },
  {
    img: "https://i.pravatar.cc/800?img=47",
    name: "María Baeza",
    quote:
      "“Hands-on projects showed me how to turn insights into impact and lead teams.”",
  },
  {
    img: "https://i.pravatar.cc/800?img=48",
    name: "Jill Fiore Van Well",
    quote:
      "“The international environment made me adaptable and solution-oriented.”",
  },
  {
    img: "https://i.pravatar.cc/800?img=56",
    name: "Kyuchul (Peter) Kim",
    quote:
      "“I learned to bridge qualitative and quantitative perspectives for partners.”",
  },
  {
    img: "https://i.pravatar.cc/800?img=58",
    name: "Rahyun Kim",
    quote:
      "“I turn complex data into simple stories so decisions are evidence-based.”",
  },
  {
    img: "https://i.pravatar.cc/800?img=62",
    name: "Andy Hyunjo Lee",
    quote:
      "“Real-world casework and mentorship gave me confidence to lead projects.”",
  },
  {
    img: "https://i.pravatar.cc/800?img=66",
    name: "Belén Tomé",
    quote:
      "“The program made me proactive and creative—ready for new challenges.”",
  },
  {
    img: "https://i.pravatar.cc/800?img=68",
    name: "Manuel Álvarez de la Gala",
    quote:
      "“A foundation in behavioral science shaped my approach to leadership.”",
  },
];

export default function StoriesSection() {
  useEffect(() => {
    // Any custom JS logic (if needed later)
  }, []);

  return (
    <section id="success-stories-section" className="py-5">
      <div className="container">
        {/* Heading */}
        <div className="text-left mb-4 mb-lg-5">
          <span className="text-uppercase">Success Stories</span>
          <p className="text-muted mb-0">
            Success isn’t one size fits all. Discover the unique academic and
            professional journeys behind our community members.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="d-none d-xl-block">
          <div className="row g-3 row-cols-5">
            {stories.map((story, i) => (
              <div className="col" key={i}>
                <a
                  href="#"
                  className={styles.personCard}
                  aria-label={`Read ${story.name}'s story`}
                >
                  <img src={story.img} alt={story.name} />
                  <div className={styles.nameOverlay}>{story.name}</div>
                  <div className={styles.hoverLayer}>
                    <blockquote>{story.quote}</blockquote>
                    <div className={styles.hoverCta}>
                      See the story <span className={styles.arrow}>›</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Swiper */}
        <div className="d-xl-none">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            speed={600}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
            className={`${styles.successSwiper} successSwiper`}
          >
            {stories.map((story, i) => (
              <SwiperSlide key={i}>
                <a
                  href="#"
                  className={styles.storyPanel}
                  aria-label={`Read ${story.name}'s story`}
                >
                  <img
                    className={styles.panelImg}
                    src={story.img}
                    alt={story.name}
                  />
                  <div className={styles.panelTint}></div>
                  <div className={styles.panelContent}>
                    <blockquote>{story.quote}</blockquote>
                    <div>
                      <div className={styles.storyMeta}>{story.name}</div>
                      <div className={`${styles.panelCta} mt-2`}>
                        See the story <span className={styles.arrow}>›</span>
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA Button */}
        <div className="mt-4 text-center">
          <a href="#" className={styles.StoriesButton}>
            DISCOVER MORE STORIES
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
