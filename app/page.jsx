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

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const raw = await getPortfolioData();
  // Serialize to strip Prisma Date objects for client component props
  const data = JSON.parse(JSON.stringify(raw));

  return (
    <div className="min-h-screen font-body bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      <Navbar />
      <main className="pt-2">
        <Summary profile={data.profile} />
        <Experience items={data.experiences} />
        <Education items={data.education} />
        <Projects items={data.projects} />
        <Leadership items={data.leadership} />
        <Certification items={data.certifications} />
        <TechStack items={data.skills} />
        <Contact />
      </main>
    </div>
  );
}
