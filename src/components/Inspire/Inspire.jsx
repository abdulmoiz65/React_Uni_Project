import React, { useState, useEffect, useRef } from 'react';
import styles from './Inspire.module.css';

const Inspire = () => {
  const [activeDetail, setActiveDetail] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  
  const purposeRowRef = useRef(null);
  const otherRowRef = useRef(null);

  // Asset base path
  const assetBase = '/assets/';

  // Details data
  const details = {
    purpose: {
      img: assetBase + 'purpose-3d_1.webp',
      title: 'OUR PURPOSE',
      desc: 'As a transformative educational institution, we empower students to make their mark on the world. We provide them with the skills, knowledge and environment needed to make a difference, and they join a supportive and international community that lasts a lifetime.',
      link: '#'
    },
    diversity: {
      img: assetBase + 'diversity-3d.webp',
      title: 'DIVERSITY',
      desc: 'A diverse community embraces the many faces of its people. Thanks to our commitment to diversity, including gender, ethnicity, culture, age, physical appearance, experiences and mindsets, we are able to see the world from a more multifaceted perspective, sparking creativity and compassion.',
      link: '#'
    },
    innovation: {
      img: assetBase + 'innovation-3d.webp',
      title: 'INNOVATION',
      desc: 'Curiosity is key to stimulating new and sustainable patterns of thinking. At IE University, we innovate education through sector-leading professors, personalized learning and cutting-edge technology.',
      link: '#'
    },
    humanities: {
      img: assetBase + 'humanities-3d.webp',
      title: 'HUMANITIES',
      desc: 'We place humanities at the heart of education, helping students develop empathy, ethical judgment and a sense of purpose.',
      link: '#'
    },
    entrepreneurship: {
      img: assetBase + 'entrepreneurship-3d.webp',
      title: 'ENTREPRENEURSHIP',
      desc: 'We cultivate entrepreneurial spirit, providing the tools, knowledge and mindset for students to turn ideas into impactful realities.',
      link: '#'
    }
  };

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle card click
  const handleCardClick = (key) => {
    if (!details[key]) return;

    const data = details[key];

    if (isMobile) {
      setModalData(data);
      setShowModal(true);
    } else {
      setActiveDetail(key);
      
      // Scroll to appropriate section
      requestAnimationFrame(() => {
        if (key === 'purpose' && purposeRowRef.current) {
          purposeRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (key !== 'purpose' && otherRowRef.current) {
          otherRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  };

  // Handle keyboard events
  const handleKeyDown = (e, key) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(key);
    }
  };

  // Close detail
  const closeDetail = () => {
    setActiveDetail(null);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  // Render expanded content
  const renderExpandedContent = (key, data) => (
    <div className={`${styles.expandedContent} ${activeDetail === key ? styles.active : ''}`}>
      <button className={styles.closeDetail} onClick={closeDetail} aria-label="Close details">
        &times;
      </button>
      <div className="row g-0 ">
        <div className="col-md-6">
          <img 
            className={`${styles.expandedImg} ${styles.inlineImg}`}
            src={data.img} 
            alt={`${data.title} image`}
          />
        </div>
        <div className={`col-md-6 ${styles.contentRight}`}>
          <h3>{data.title}</h3>
          <p>{data.desc}</p>
          <a href={data.link} className={styles.eventButton} rel="noopener noreferrer">
            FIND OUT MORE
            <i className="fas fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-lg-5 mb-lg-5">
      <span className={styles.majuHeading}>WE ARE MAJU</span>

      {/* Featured Card */}
      <div className="row mt-3">
        <div className="col-12">
          <div 
            className={`${styles.majuCard} ${styles.featured}`}
            style={{ backgroundImage: `url('${details.purpose.img}')` }}
            role="button"
            tabIndex="0"
            aria-pressed="false"
            aria-label="Open purpose detail"
            onClick={() => handleCardClick('purpose')}
            onKeyDown={(e) => handleKeyDown(e, 'purpose')}
          >
            <h3>OUR PURPOSE</h3>
            <a href="#" aria-hidden="true">READ MORE &gt;</a>
          </div>
        </div>
      </div>

      {/* Purpose Inline Expanded */}
      <div className="row mb-4" ref={purposeRowRef} aria-live="polite">
        <div className="col-12">
          {renderExpandedContent('purpose', details.purpose)}
        </div>
      </div>

      {/* Four cards */}
      <div className="row g-3">
        {['diversity', 'innovation', 'humanities', 'entrepreneurship'].map((key) => (
          <div key={key} className="col-lg-3 col-md-6 col-sm-12">
            <div 
              className={styles.majuCard}
              style={{ backgroundImage: `url('${details[key].img}')` }}
              role="button"
              tabIndex="0"
              aria-label={`Open ${key} details`}
              onClick={() => handleCardClick(key)}
              onKeyDown={(e) => handleKeyDown(e, key)}
            >
              <h3>{details[key].title}</h3>
              <a href="#" aria-hidden="true">READ MORE &gt;</a>
            </div>
          </div>
        ))}
      </div>

      {/* Other Inline Detail */}
      <div className="row mb-4" ref={otherRowRef}>
        <div className="col-12">
          {activeDetail && activeDetail !== 'purpose' && 
            renderExpandedContent(activeDetail, details[activeDetail])
          }
        </div>
      </div>

      {/* Mobile Modal */}
      {showModal && modalData && (
        <div className={`modal fade show ${styles.modalShow}`} tabIndex="-1" aria-hidden="false">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="d-flex justify-content-end">
                <button 
                  type="button" 
                  className="btn-close m-2" 
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="row g-0">
                <div className="col-md-6">
                  <img 
                    src={modalData.img} 
                    alt={`${modalData.title} image`} 
                    className="img-fluid w-100 h-100" 
                    style={{ objectFit: 'cover', minHeight: '200px' }}
                  />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center p-4">
                  <h3 className={`fw-bold mb-2 ${styles.modalTitle}`}>{modalData.title}</h3>
                  <p className={`mb-3 ${styles.modalDesc}`}>{modalData.desc}</p>
                  <a 
                    href={modalData.link} 
                    className={styles.eventButton} 
                    rel="noopener noreferrer"
                  >
                    FIND OUT MORE
                    <i className="fas fa-arrow-up-right-from-square"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showModal && <div className={`modal-backdrop fade show`} onClick={closeModal}></div>}
    </div>
  );
};

export default Inspire;