import React from 'react';
import style from './App.module.css';

import Navbar from "./containers/Navbar/Navbar";
import Summary from "./containers/Summary/Summary";
import TechStack from './containers/TechStack/TechStack';
import Experience from './containers/Experience/Experience';
import Projects from './containers/Projects/Projects';
import Contact from './containers/Contact/Contact';
import Certification from './containers/Certification/Certification';
import Education from './containers/Education/Education';

export default function App() {
  return (
    <div className={style.App}>
      <Navbar />
      <Summary />
      <Education />
      <Experience />
      <Projects />
      <Certification />
      <TechStack />
      <Contact />
    </div>
  );
}
