import React from 'react'
import styles from "./Summary.module.css"
import { getImageURL } from '../../utils'

export default function Summary() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hello I'm <br/>Affan Khamse</h1>
        <p className={styles.summary}>MS in Computer Science from New York University, New York, USA <br/><br/>
        Full-Stack Development and Cloud Computing! Actively seeking Full Time SDE/SWE opportunities<br/><br/>
        JavaScript, Java, Python, C++, React, Node.js, Spring Boot, AWS, Docker, CI/CD</p>
        <div className={styles.BtnsContainer}>
          <a className={styles.Btns} href='/resume.pdf' download>Resume/CV</a>
          <a className={styles.icon} href='https://www.linkedin.com/in/affan-khamse/' target='blank'><img src={getImageURL("contact/linkedinIcon.png")} alt="LinkedIn" /></a>
          <a className={styles.icon} href='https://github.com/khamseaffan' target='blank'><img src={getImageURL("contact/githubIcon.png")} alt="GitHub" /></a>
          <a className={styles.icon} href='mailto:khamseaffan@gmail.com'><img src={getImageURL("contact/emailIcon.png")} alt="Email" /></a>
        </div>
      </div>
      <img className={styles.summaryImg} src={getImageURL("summary/summaryImage.png")} alt='Summary Image'/>
      <div className={styles.topBlur}/>
      <div className={styles.bottomBlur}/>
    </section>
  )
}
