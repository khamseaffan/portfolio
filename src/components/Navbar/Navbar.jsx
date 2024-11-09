import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css';

import {getImageURL} from '../../utils';



export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);


  return (
    <nav className={styles.navbar}>
        <a className={styles.title} href='/'>Affan Khamse</a>
        <div className={`${styles.menu} `}>
            <img src={menuOpen ? getImageURL("nav/closeIcon.png"):getImageURL("nav/menuIcon.png")} 
            alt="Menu-Button" 
            className={styles.menuBtn} 
            onClick={()=>setMenuOpen(!menuOpen)}
            />
           <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`} onClick={() => setMenuOpen(!menuOpen)}>
            <li>
              <a className={styles.iconWithLabel} href='https://leetcode.com/u/khamseaffan/' target="_blank" rel="noopener noreferrer">
                <img src={getImageURL("contact/leetcodeIcon.png")} alt="LeetCode" />
                <span>LeetCode</span>
              </a>
            </li>
            <li>
              <a className={styles.iconWithLabel} href='https://www.linkedin.com/in/affan-khamse/' target='blank' rel="noopener noreferrer">
                <img src={getImageURL("contact/linkedinIcon.png")} alt="LinkedIn" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a className={styles.iconWithLabel} href='https://github.com/khamseaffan' target='blank' rel="noopener noreferrer">
                <img src={getImageURL("contact/githubIcon.png")} alt="GitHub" />
                <span>GitHub</span>
              </a>
            </li>
          </ul>
        </div> 
    </nav>
  )
}
          