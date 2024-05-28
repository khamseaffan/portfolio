import React from "react";
import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export default function Projects() {
  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.carousel}>
        <button className={styles.prev} onClick={() => document.getElementById('carousel').scrollBy({ left: -310, behavior: 'smooth' })}>‹</button>
        <div className={styles.projects} id="carousel">
          {projects.map((project, id) => {
            return <ProjectCard key={id} project={project} />;
          })}
        </div>
        <button className={styles.next} onClick={() => document.getElementById('carousel').scrollBy({ left: 310, behavior: 'smooth' })}>›</button>
      </div>
    </section>
  );
}
