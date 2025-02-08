import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'; // Import Pagination module
import 'swiper/css'; 
import 'swiper/css/autoplay'; 
import 'swiper/css/pagination'; // Import Pagination CSS
import { getImageURL } from '../../utils';
import skills from "../../data/skills.json";
import styles from "./TechStack.module.css";

export default function TechStack() {
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
      <Swiper
        spaceBetween={30}
        slidesPerView="auto"
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay, Pagination]} // Add Pagination module
        pagination={{ clickable: true }} // Enable pagination
      >
        {Object.keys(categorizedSkills).map((category, index) => (
          <SwiperSlide key={index} className={styles.category}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}