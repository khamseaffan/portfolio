import React from 'react';
import style from './App.module.css';

import  Navbar  from "./components/Navbar/Navbar";
import  Summary  from "./components/Summary/Summary";
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';



export default function App() {
  return (
    <div className={style.App}>
      <Navbar/>
      <Summary/>
      <About/>
      <Experience/>
      <Projects/>
      <Contact/>
    </div>
  )
}
