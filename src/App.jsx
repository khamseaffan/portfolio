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
      <div className={style.sectionWrapper}><Summary /></div>
      <div className={style.sectionWrapper}><Education /></div>
      <div className={style.sectionWrapper}><Experience /></div>
      <div className={style.sectionWrapper}><Projects /></div>
      <div className={style.sectionWrapper}><Certification /></div>
      <div className={style.sectionWrapper}><TechStack /></div>
      <div className={style.sectionWrapper}><Contact /></div>
    </div>
  );
}