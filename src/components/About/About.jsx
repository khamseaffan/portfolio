import React from 'react'
import { getImageURL } from '../../utils'

import styles from "./About.module.css"

export default function About() {
  return (
    <section className={styles.container} id='about'>
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <img 
          src={getImageURL("about/aboutImage.png")} 
          alt='About'
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
          <img src={getImageURL("about/cursorIcon.png")} alt="Cursor"/>
          <div className={styles.aboutItemtext}>    
              <h3><strong>Front-End Dev</strong></h3><br/>
              <p>Developed interactive web applications using React.js and TypeScript. Led the development of "VibeCheck," a music-based social networking application with real-time features.</p>
          </div>
          </li>
          <li className={styles.aboutItem}>
              <img src={getImageURL("about/serverIcon.png")} alt="Server"/>
              <div className={styles.aboutItemtext}>    
                  <h3><strong>Back-End Dev</strong></h3><br/>
                  <p>Implemented robust backend solutions using Django and Spring Boot. Developed RESTful APIs and integrated complex database systems for efficient data management.</p>
              </div>
          </li>    
      </ul>
      </div>
      
        
    </section>
  )
}
