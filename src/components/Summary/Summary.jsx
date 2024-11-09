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
      <div className={styles.content}>
        <h1 className={styles.title}>Hello, I'm <span>Affan Khamse</span></h1>
        <Typewriter texts={roles} typingSpeed={100} pauseTime={1500} />
        <p className={styles.summary}>
        I'm an MS Computer Science student at NYU, leading projects that push engagement and scalability. I built Inquis-AI, boosting student engagement by 21%, and VibeCheck, a social music app using AWS/Redis to improve user matching by 37%. I craft reliable, impactful solutions.
        </p>
        <div className={styles.BtnsContainer}>
          <a className={styles.Btns} href='/resume.pdf' download>Resume/CV</a>
          <a className={`${styles.Btns} ${styles.iconButton}`} href='mailto:khamseaffan@gmail.com'> <FontAwesomeIcon icon={faEnvelope} /></a>
        </div>
      </div>
      <img className={styles.summaryImg} src={getImageURL("summary/summaryImage.png")} alt='Summary Image' />
      
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
}
