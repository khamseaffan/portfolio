import React, { useState } from 'react'
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
           <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
           onClick={() => setMenuOpen(!menuOpen) }>
                <li>
                    <a href='#about'>About</a>
                </li>
                <li>
                    <a href='#experience'>Experience</a>
                </li>
                <li>
                    <a href='#projects'>Projects</a>
                </li>
                <li>
                    <a href='#contact'>Contact</a>
                </li>
                {/* <li>
                    <a href='https://leetcode.com/u/khamseaffan/' target="_blank">LeetCode</a>
                </li> */}
           </ul>
        </div> 
    </nav>
  )
}
          