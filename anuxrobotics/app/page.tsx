import Link from "next/link";
import NavBar from "@/components/ui/NavBar";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] overflow-hidden bg-[var(--paper)]">
        <div className="hero-image absolute inset-0">
          <video
              className="object-cover w-full h-full"
              src="/211375.mp4"
              autoPlay
              muted
              loop
              playsInline
          />
        </div>

        <div className="hero-white-panel absolute inset-0 z-[1]" />
        <div className="hero-fade" />

        <div className="absolute right-6 top-1/2 z-[3] hidden -translate-y-1/2 flex-col items-center gap-2.5 text-white/85 md:flex">
          <div className="scroll-tick relative h-14 w-px overflow-hidden bg-white/40" />
          <span className="text-[10px] tracking-[0.15em] uppercase [writing-mode:vertical-rl]">
            Scroll
          </span>
        </div>

        <div className="relative z-[2] flex h-full w-full flex-col px-6 pb-16 pt-8 md:px-12">

          <NavBar/>

          <div className="flex flex-1 items-center pr-8">
            <div>
              <h1 className="font-display text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.1] tracking-tight text-white">
                Exploration
                <br />
                Robotics
              </h1>
              <p className="mt-6 max-w-[36ch] text-lg text-white/70">
                Lorem Ipsum bla bla bla
              </p>

              <Link
                href="/team"
                className="mt-7 inline-block rounded-sm bg-[var(--coral)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--deep)]"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST SUBS */}
      <section className="mx-auto max-w-[1280px] px-[8vw] py-28">
        <div className="mb-12 flex items-end justify-between border-b border-[var(--line)] pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
              Build Progress
            </span>
            <h2 className="text-3xl font-semibold">Latest subs</h2>
          </div>
          <Link href="/updates" className="border-b border-[var(--ink)] pb-0.5 text-sm font-semibold">
            Learn more →
          </Link>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {[
            { tag: "Status/Date", title: "Coming soon...", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
            { tag: "Status/Date", title: "Coming soon...", desc: "Ut enim ad minim veniam, quis nostrud exercitation." },
            { tag: "Status/Date", title: "Coming soon...", desc: "Excepteur sint occaecat cupidatat non proident." },
          ].map((card, i) => (
            <div
              key={i}
              className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-sm p-5 text-white"
              style={{ background: "linear-gradient(200deg, #0e7a8f, #052437 75%)" }}
            >
              <span className="text-[11px] uppercase tracking-wide text-[var(--cyan)]">{card.tag}</span>
              <h3 className="mt-2 text-xl font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-white/70">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT US */}
      <section className="mx-auto max-w-[1280px] px-[8vw] py-28">
        <div className="grid items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">Who we are</span>
            <h2 className="my-4 text-3xl font-semibold">About us</h2>
            <p className="mb-4 text-base leading-7 text-white/70">
              ANU Exploration Robotics is a student-run team designing and building an autonomous
              underwater vehicle for the RobotX RoboSub competition. We&apos;re currently developing
              Prototype 1.0 — a tethered proof-of-concept vehicle that demonstrates controlled
              underwater movement, laying the foundation for a fully autonomous competition vehicle
              to follow.
            </p>
            <p className="mb-4 text-base leading-7 text-white/70">
              We&apos;re a small, hands-on crew spanning mechanical, electrical, software, and
              business — following a disciplined design process from requirements through to
              in-water testing. Always looking for people who want to build something real.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block rounded-sm bg-[var(--coral)] px-7 py-3.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[var(--deep)]">
              Contact us
            </Link>
          </div>
          <div
            className="aspect-square rounded-sm"
            style={{ background: "linear-gradient(160deg, #0a5c73, #1fc4a8)" }}
          />
        </div>
      </section>

      {/* MEET THE TEAM*/}
      <section className="mx-auto max-w-[1280px] px-[8vw] py-28">
        <div className="mb-12 flex items-end justify-between border-b border-[var(--line)] pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
              Who&apos;s building it
            </span>
            <h2 className="text-3xl font-semibold">Meet the team</h2>
          </div>
          <Link href="/team" className="border-b border-[var(--ink)] pb-0.5 text-sm font-semibold">
            Learn more →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { name: "Executive Team", role: "Leads strategy, planning, and overall project direction" },
            { name: "Mechanical Team", role: "Designs and builds the submarine's structure and hardware" },
            { name: "Electronics Team", role: "Handles wiring, sensors, and onboard hardware" },
            { name: "Software Team", role: "Develops control, navigation, and scanning software" },
            { name: "Business & Marketing Team", role: "Manages sponsorships, outreach, and public communications" },
          ].map((member, i) => (
            <div key={i}>
              <div
                className="mb-3.5 aspect-square rounded-sm"
                style={{ background: "linear-gradient(150deg, #2a323a, #1a2027)" }}
              />
              <h4 className="font-display text-sm font-semibold">{member.name}</h4>
              <span className="text-xs text-white/50">{member.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SPONSORS */}
      <section className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8 border-t border-[var(--line)] px-[8vw] py-16">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex h-10 w-[120px] items-center justify-center rounded-sm bg-[#141d27] text-[10px] uppercase tracking-wide text-white/40"
          >
            Sponsor
          </div>
        ))}
      </section>
    </>
  );
}