const links = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/affan-khamse' },
  { label: 'GitHub', href: 'https://github.com/khamseaffan' },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-[var(--ed-line)]">
      <div className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Contact</h2>
        <a
          href="mailto:khamseaffan@gmail.com"
          className="mt-6 block max-w-full break-words font-display text-[clamp(1.8rem,5vw,3.4rem)] leading-[1.05] tracking-[-0.03em] underline-offset-4 hover:underline"
        >
          khamseaffan@gmail.com
        </a>
        <p className="mt-4 text-sm text-[var(--ed-faint)]">New York City</p>
        <div className="mt-6 flex gap-5 text-sm">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ed-muted)] underline-offset-4 hover:text-[var(--ed-text)] hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="rounded-b-[28px] border-t border-[var(--ed-line)] px-5 py-5 sm:px-8 lg:px-12">
        <p className="text-xs text-[var(--ed-faint)]">© {new Date().getFullYear()} Affan Khamse</p>
      </div>
    </section>
  );
}
