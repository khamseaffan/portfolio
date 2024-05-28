import React from "react";

import styles from "./Contact.module.css";
import { getImageURL } from "../../utils";

export default function Contact() {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img src={getImageURL("contact/emailIcon.png")} alt="Email icon" className={styles.icon} />
          <a href="mailto:khamseaffan@gmail.com">khamseaffan@gmail.com</a>
        </li>
        <li className={styles.link}>
          <img src={getImageURL("contact/linkedinIcon.png")} alt="LinkedIn icon" className={styles.icon} />
          <a href="https://www.linkedin.com/in/affan-khamse/">linkedin.com/in/affan-khamse</a>
        </li>
        <li className={styles.link}>
          <img src={getImageURL("contact/githubIcon.png")} alt="Github icon" className={styles.icon} />
          <a href="https://github.com/khamseaffan">github.com/khamseaffan</a>
        </li>
      </ul>
    </footer>
  );
}
