import React, { useEffect, useRef } from 'react';
import { getImageURL } from '../../utils';
import skills from "../../data/skills.json";
import styles from "./TechStack.module.css";

export default function TechStack() {
  const movingCardsRef = useRef(null);
  const autoScrollInterval = useRef(null);

  // Function to auto-scroll
  const startAutoScroll = () => {
    autoScrollInterval.current = setInterval(() => {
      if (movingCardsRef.current) {
        const maxScrollLeft = movingCardsRef.current.scrollWidth - movingCardsRef.current.clientWidth;
        if (movingCardsRef.current.scrollLeft >= maxScrollLeft) {
          movingCardsRef.current.scrollLeft = 0; // Reset to start
        } else {
          movingCardsRef.current.scrollLeft += 5; // Scroll by 5px
        }
      }
    }, 50); // Adjust scrolling speed here
  };

  // Function to stop auto-scroll
  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval.current);
  };

  useEffect(() => {
    startAutoScroll();

    // Cleanup on component unmount
    return () => stopAutoScroll();
  }, []);

  const categorizedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section className={styles.container} id="tech-stack">
      <h2 className={styles.title}>My Tech Stack</h2>
      <div
        className={styles.carousel}
        ref={movingCardsRef}
        onMouseEnter={stopAutoScroll} // Stop auto-slide on mouse hover
        onMouseLeave={startAutoScroll} // Resume auto-slide when mouse leaves
      >
        {Object.keys(categorizedSkills).map((category, index) => (
          <div key={index} className={styles.category}>
            <h3 className={styles.categoryTitle}>{category}</h3>
            <ul className={styles.aboutItems}>
              {categorizedSkills[category].map((skill, skillIndex) => (
                <li key={skillIndex} className={styles.aboutItem}>
                  <div className={styles.card}>
                    <img
                      src={getImageURL(skill.imageSrc)}
                      alt={skill.title}
                      className={styles.aboutIcon}
                    />
                    <div className={styles.cardContent}>
                      <h3>
                        <strong>{skill.title}</strong>
                      </h3>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
