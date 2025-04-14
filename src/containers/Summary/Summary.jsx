import React from 'react';
import styles from "./Summary.module.css";
import Typewriter from "../../utility/Typewriter/Typewriter";
import { getImageURL } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const roles = [" Software Engineer"," Full-Stack Developer", " Cloud Engineer", " DevOps Engineer"]

export default function Summary() {
  return (
    <section className={styles.container} id="summary">
      <img
        className={styles.summaryImg}
        src={getImageURL("summary/summaryImage.jpeg")}
        alt="Summary Image"
      />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Hello, I'm <span>Affan Khamse</span>
        </h1>
        <Typewriter texts={roles} typingSpeed={100} pauseTime={1500} />
        <p className={styles.summary}>
        Transforming data into solutions. Building scalable, real-time systems.
        </p>
        <div className={styles.BtnsContainer}>
          <a className={styles.Btns} href="/resume.pdf" download>
            Resume/CV
          </a>
          <a
            className={`${styles.Btns} ${styles.iconButton}`}
            href="mailto:khamseaffan@gmail.com"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <span>Actively pursuing Software roles</span>
        </div>
      </div>
    </section>
  );
}
