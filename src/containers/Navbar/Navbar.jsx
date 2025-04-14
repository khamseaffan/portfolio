import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { getImageURL } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/" onClick={handleLinkClick}>
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
          className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ''}`}
        >
          <li><a href="#summary" onClick={handleLinkClick}>About</a></li>
          <li><a href="#education" onClick={handleLinkClick}>Education</a></li>
          <li><a href="#experience" onClick={handleLinkClick}>Experience</a></li>
          <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
          <li><a href="#certification" onClick={handleLinkClick}>Certifications</a></li>
          <li><a href="#tech-stack" onClick={handleLinkClick}>Skills</a></li>
          <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
          <li className={styles.externalLinksSeparator}></li>
          <li>
            <a
              className={styles.iconLink}
              href="https://www.linkedin.com/in/affan-khamse/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <img src={getImageURL('contact/linkedinIcon.png')} alt="LinkedIn" />
            </a>
          </li>
          <li>
            <a
              className={styles.iconLink}
              href="https://github.com/khamseaffan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <img src={getImageURL('contact/githubIcon.png')} alt="GitHub" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}