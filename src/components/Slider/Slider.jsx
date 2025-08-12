import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink } from 'lucide-react';
import styles from './Slider.module.css';

const slidesData = [
  {
    id: 0,
    backgroundImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80',
    title: 'IEX RESEARCH XCELERATOR',
    description: 'Advancing research for global impact, in collaboration with IE School of Science & Technology.',
    buttonText: 'FIND OUT MORE'
  },
  {
    id: 1,
    backgroundImage: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80',
    title: 'INNOVATION HUB',
    description: 'In this Episode of The Kipling Balance, Philipp Hildebrand, Vice Chairman of BlackRock, joins Pablo Isla, Chairman of IE International Advisory Board, for a genuine conversation on leadership, resilience, and strategy especially in times of change. They reflect on rebuilding after setbacks and the importance of culture in companies.',
    buttonText: 'DISCOVER'
  },
  {
    id: 2,
    backgroundImage: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1500&q=80',
    title: 'GLOBAL IMPACT',
    description: 'Connecting ideas and people for a better tomorrow.',
    buttonText: 'EXPLORE'
  },
  {
    id: 3,
    backgroundImage: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1500&q=80',
    title: 'EDUCATION FOR ALL',
    description: 'Making quality education accessible worldwide.',
    buttonText: 'JOIN US'
  },
  {
    id: 4,
    backgroundImage: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1500&q=80',
    title: 'TECHNOLOGY LEADERS',
    description: 'Shaping the future with cutting-edge technology.',
    buttonText: 'SIGN UP'
  },
  {
    id: 5,
    backgroundImage: '',
    title: 'RESEARCH PARTNERS',
    description: 'We are excited to announce that our Global Online MBA has been ranked #1 by the Financial Times for 2024! This achievement underscores our dedication to providing transformative education. Discover the #NextBestYou at IE Business School.',
    buttonText: 'CONTACT'
  },
  {
    id: 6,
    backgroundImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80',
    title: 'START YOUR JOURNEY',
    description: 'Begin your path to success with us.',
    buttonText: 'GET STARTED'
  }
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayIntervalRef = useRef(null);
  const AUTO_PLAY_DELAY = 4000;

  // SVG for play and pause
  const playSVG = (
    <svg viewBox="0 0 24 24">
      <polygon points="8,5 19,12 8,19" fill="#222"/>
    </svg>
  );
  
  const pauseSVG = (
    <svg viewBox="0 0 24 24">
      <rect x="6" y="5" width="4" height="14" fill="#222"/>
      <rect x="14" y="5" width="4" height="14" fill="#222"/>
    </svg>
  );

  const showSlide = useCallback((index) => {
    if (index < 0) index = slidesData.length - 1;
    if (index >= slidesData.length) index = 0;
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    showSlide(currentSlide + 1);
  }, [currentSlide, showSlide]);

  const prevSlide = useCallback(() => {
    showSlide(currentSlide - 1);
  }, [currentSlide, showSlide]);

  const playAutoPlay = useCallback((startFrom = currentSlide) => {
    setAutoPlay(true);
    setCurrentSlide(startFrom);
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slidesData.length);
    }, AUTO_PLAY_DELAY);
  }, [currentSlide]);

  const pauseAutoPlay = useCallback(() => {
    setAutoPlay(false);
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }
  }, []);

  const handleDotClick = (index) => {
    showSlide(index);
    pauseAutoPlay();
  };

  const handlePlayPauseClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (autoPlay) {
      pauseAutoPlay();
    } else {
      playAutoPlay(currentSlide);
    }
  };

  const handleArrowClick = (direction) => {
    if (direction === 'left') {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        pauseAutoPlay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        pauseAutoPlay();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, pauseAutoPlay]);

  // Initialize autoplay
  useEffect(() => {
    playAutoPlay(0);
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, []);

  // Update autoplay when currentSlide changes via interval
  useEffect(() => {
    if (autoPlay && autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slidesData.length);
      }, AUTO_PLAY_DELAY);
    }
  }, [currentSlide, autoPlay]);

  return (
    <div className={styles.heroSlider}>
      {/* Slides Wrapper */}
      <div 
        className={styles.slidesWrapper}
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {slidesData.map((slide) => (
          <div
            key={slide.id}
            className={styles.slide}
            style={{ backgroundImage: slide.backgroundImage ? `url('${slide.backgroundImage}')` : 'none' }}
          >
            <div className={styles.slideContent}>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <button>
                {slide.buttonText} <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SVG Arrows */}
      <button 
        className={`${styles.arrow} ${styles.left}`} 
        aria-label="Previous slide"
        onClick={() => handleArrowClick('left')}
      >
        <svg viewBox="0 0 24 24">
          <polyline points="15 6 9 12 15 18"/>
        </svg>
      </button>
      <button 
        className={`${styles.arrow} ${styles.right}`} 
        aria-label="Next slide"
        onClick={() => handleArrowClick('right')}
      >
        <svg viewBox="0 0 24 24">
          <polyline points="9 6 15 12 9 18"/>
        </svg>
      </button>

      {/* Dots */}
      <div className={styles.sliderDots}>
        {slidesData.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            data-slide={index}
            onClick={() => handleDotClick(index)}
          >
            <span 
              className={styles.dotIcon}
              onClick={handlePlayPauseClick}
            >
              {index === currentSlide ? (autoPlay ? pauseSVG : playSVG) : null}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll Down */}
      <div className={styles.scrollDown}>
        <span>Scroll down</span>
        <svg viewBox="0 0 24 24">
          <polyline points="6 10 12 16 18 10"/>
        </svg>
      </div>
    </div>
  );
};

export default Slider;