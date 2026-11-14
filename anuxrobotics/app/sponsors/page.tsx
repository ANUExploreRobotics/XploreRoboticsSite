import Link from "next/link";
import NavBar from "@/components/ui/NavBar";

export default function SponsorsPage() {
  return (
    <>
      <div className="relative z-[2] mx-auto flex h-full w-full max-w-[1600px] flex-col px-6 pt-8 md:px-12">
        <NavBar />
      </div>

      {/* PAGE HERO */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 pb-16 pt-32">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
          Support us
        </span>
        <h1 className="font-display mt-3 text-[clamp(2.5rem,4.5vw,3.75rem)] font-semibold tracking-tight">
          Sponsors
        </h1>
        <p className="mt-5 max-w-[60ch] text-base leading-7 text-white/70">
          ANU Exploration Robotics is entirely student-run and relies on sponsorship to build
          and compete. Partnering with us puts your brand in front of a competition audience
          while supporting hands-on engineering education.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1600px] border-t border-[var(--line)] px-6 md:px-12 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[46ch] text-base text-white/70">
            We&apos;re looking for our founding sponsors. Support in kind, such as parts,
            machining time, or mentoring, is just as valuable as cash.
          </p>
          <Link
            href="/contact"
            className="btn-primary px-7 py-3.5 text-xs"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
