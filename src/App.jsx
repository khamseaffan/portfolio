import React from 'react'
import Navbar from './containers/Navbar'
import Summary from './containers/Summary'
import Education from './containers/Education'
import Experience from './containers/Experience'
import Projects from './containers/Projects'
import Certification from './containers/Certification'
import TechStack from './containers/TechStack'
import Contact from './containers/Contact'

// Updated sections array with corrected IDs
const sections = [
  { id: 'summary', Component: Summary },
  { id: 'education', Component: Education },
  { id: 'experience', Component: Experience },
  { id: 'projects', Component: Projects },
  { id: 'certification', Component: Certification },
  { id: 'tech-stack', Component: TechStack }, // Fixed: was 'techstack', should be 'tech-stack'
  { id: 'contact', Component: Contact },
]

export default function App() {
  return (
    <div className="bg-bg min-h-screen text-text font-body">
      <Navbar />
      
      {/* FIXED: Removed extra wrapper sections and padding */}
      <main className="pt-12">
        {sections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
    </div>
  )
}