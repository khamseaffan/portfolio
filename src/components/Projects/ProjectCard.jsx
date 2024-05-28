import React from "react";
import styles from "./ProjectCard.module.css";
import { getImageURL } from "../../utils";
import skillMap from "../../data/project_skill_map.json";

const defaultIcon = "skills/default.png"; // Path to your default icon

const skillIconMap = skillMap.reduce((map, skill) => {
  map[skill.skill] = skill.imageSrc;
  return map;
}, {});

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source },
}) => {
  return (
    <div className={styles.container}>
      <img
        src={getImageURL(imageSrc)}
        alt={`Image of ${title}`}
        className={styles.image}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => (
          <li key={id} className={styles.skill}>
            <img src={getImageURL(skillIconMap[skill] || defaultIcon)} alt={skill} className={styles.skillIcon} />
            {skill}
          </li>
        ))}
      </ul>
      <div className={styles.links}>
        {demo && (
          <a href={demo} className={styles.link} target="_blank" rel="noopener noreferrer">
            Demo
          </a>
        )}
        {source && (
          <a href={source} className={styles.link} target="_blank" rel="noopener noreferrer">
            Source
          </a>
        )}
      </div>
    </div>
  );
};
