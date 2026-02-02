import React from 'react'
import Navbar from './containers/Navbar'
import Summary from './containers/Summary'
import Education from './containers/Education'
import Experience from './containers/Experience'
import Projects from './containers/Projects'
import Leadership from './containers/Leadership'
import Certification from './containers/Certification'
import TechStack from './containers/TechStack'
import Contact from './containers/Contact'

const sections = [
  { id: 'summary', Component: Summary },
  { id: 'education', Component: Education },
  { id: 'experience', Component: Experience },
  { id: 'projects', Component: Projects },
  { id: 'leadership', Component: Leadership },
  { id: 'certification', Component: Certification },
  { id: 'tech-stack', Component: TechStack }, // Fixed: was 'techstack', should be 'tech-stack'
  { id: 'contact', Component: Contact },
]

export default function App() {
  return (
    <div className="min-h-screen font-body bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      <Navbar />

      {/* FIXED: Removed extra wrapper sections and padding */}
      <main className="pt-2">
        {sections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
    </div>
  )
}