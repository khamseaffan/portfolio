import React from 'react'
import styles from "./Summary.module.css"
import { getImageURL } from '../../utils'

export default function Summary() {
  return (
   <section className={styles.container}>
    <div className={styles.content}>
    <h1 className={styles.title}>Hello I'm Affan Khamse</h1>
    <p className={styles.summary}>🚀 Master's in CS student at NYU, passionate about crafting impactful tech solutions. Expertise in C++, Java, Python, Django, and AWS. Proven leadership in academic and extracurricular roles, and a knack for developing innovative projects like "VibeCheck" and "Document Authenticator."</p>
   <a className={styles.contactBtn} href='mailto:khamseaffan@gmail.com'>Contact Me</a>
   <a className={styles.resumeBtn} href='/resume.pdf' download>Download Resume/CV</a>
   
   </div>
   <img className={styles.summaryImg} src={getImageURL("summary/summaryImage.png")} alt='Summary Image'/>
   <div className={styles.topBlur}/>
   <div className={styles.bottomBlur}/>

   </section> 
  )
}
