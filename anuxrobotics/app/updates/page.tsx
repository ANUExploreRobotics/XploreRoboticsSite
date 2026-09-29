import Header from "@/components/Header";
import NavBar from "@/components/ui/NavBar";

const updates = [
  {
    date: "TODO Month 2026",
    tag: "Milestone",
    title: "TODO update title",
    desc: "TODO - short summary of what happened, what was tested, or what shipped.",
  },
  {
    date: "TODO Month 2026",
    tag: "Build log",
    title: "TODO update title",
    desc: "TODO - short summary of what happened, what was tested, or what shipped.",
  },
  {
    date: "TODO Month 2026",
    tag: "Testing",
    title: "TODO update title",
    desc: "TODO - short summary of what happened, what was tested, or what shipped.",
  },
];

export default function UpdatesPage() {
  return (
    <>
      <div className="relative z-[2] flex h-full w-full flex-col px-6 pt-8 md:px-12">
        <NavBar />
      </div>

      {/* PAGE HERO */}
      <section className="mx-auto max-w-[1280px] px-6 pb-16 pt-32">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
          Build progress
        </span>
        <h1 className="font-display mt-3 text-[clamp(2.5rem,4.5vw,3.75rem)] font-semibold tracking-tight">
          Updates
        </h1>
        <p className="mt-5 max-w-[60ch] text-base leading-7 text-white/70">
          Milestones, build logs, and testing notes as Prototype 1.0 comes together.
        </p>
      </section>

      {/* FEED */}
      <section className="mx-auto max-w-[1280px] px-6 pb-24">
        <div className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
          {updates.map((update, i) => (
            <article key={i} className="grid gap-3 py-10 md:grid-cols-[160px_1fr] md:gap-10">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--cyan)]">
                  {update.tag}
                </span>
                <p className="mt-1 text-sm text-white/50">{update.date}</p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">{update.title}</h3>
                <p className="mt-2 max-w-[65ch] text-base leading-7 text-white/70">
                  {update.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
