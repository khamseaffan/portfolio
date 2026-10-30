import Navbar from '@/components/containers/Navbar';
import Summary from '@/components/containers/Summary';
import Experience from '@/components/containers/Experience';
import Education from '@/components/containers/Education';
import Projects from '@/components/containers/Projects';
import Leadership from '@/components/containers/Leadership';
import Certification from '@/components/containers/Certification';
import TechStack from '@/components/containers/TechStack';
import Contact from '@/components/containers/Contact';
import { getPortfolioData } from '@/lib/portfolio';

export default function HomePage() {
  const data = getPortfolioData();

  return (
    <div className="relative min-h-screen bg-[var(--ed-canvas)] font-body text-[var(--ed-text)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-20 hidden h-[460px] w-[460px] rounded-full border border-[var(--ed-line)] lg:block"
      />
      <div className="relative mx-auto max-w-[1120px] px-3 py-4 sm:px-5 sm:py-8 lg:py-10">
        <div className="rounded-[28px] border border-[var(--ed-line)] bg-[var(--ed-panel)]">
          <Navbar resumeUrl={data.profile?.resumeUrl || '/resume.pdf'} />
          <main>
            <Summary profile={data.profile} />
            <Experience items={data.experiences} />
            <Projects items={data.projects} />
            <TechStack items={data.skills} />
            <Education items={data.education} />
            <Leadership items={data.leadership} />
            <Certification items={data.certifications} />
            <Contact />
          </main>
        </div>
      </div>
    </div>
  );
}
