import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { getImageURL } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when Esc is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">
        Affan Khamse
      </a>
      <div className={styles.menu}>
        <FontAwesomeIcon
          icon={menuOpen ? faTimes : faBars}
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)} // Close menu on link click
        >
          <li>
            <a
              className={styles.iconWithLabel}
              href="https://leetcode.com/u/khamseaffan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={getImageURL('contact/leetcodeIcon.png')} alt="LeetCode" />
              <span>LeetCode</span>
            </a>
          </li>
          <li>
            <a
              className={styles.iconWithLabel}
              href="https://www.linkedin.com/in/affan-khamse/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={getImageURL('contact/linkedinIcon.png')} alt="LinkedIn" />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              className={styles.iconWithLabel}
              href="https://github.com/khamseaffan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={getImageURL('contact/githubIcon.png')} alt="GitHub" />
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
