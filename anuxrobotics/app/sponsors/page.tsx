import Header from "@/components/Header";
import Link from "next/link";
import NavBar from "@/components/ui/NavBar";

const tiers = [
  {
    name: "Gold",
    benefits: ["Logo on vehicle", "Logo on website homepage", "Social media shoutouts", "Competition credits"],
  },
  {
    name: "Silver",
    benefits: ["Logo on website sponsors page", "Social media mention", "Competition credits"],
  },
  {
    name: "Bronze",
    benefits: ["Logo on website sponsors page", "Competition credits"],
  },
];

export default function SponsorsPage() {
  return (
    <>
      <div className="relative z-[2] flex h-full w-full flex-col px-6 pt-8 md:px-12">
        <NavBar />
      </div>

      {/* PAGE HERO */}
      <section className="mx-auto max-w-[1280px] px-6 pb-16 pt-32">
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

      {/* TIERS */}
      <section className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-sm border border-[var(--line)] p-7"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--coral)]">
                {tier.name}
              </span>
              <ul className="mt-5 space-y-2.5">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="text-sm text-white/70">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CURRENT SPONSORS */}
      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="mb-10 border-b border-[var(--line)] pb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
            Thank you
          </span>
          <h2 className="text-3xl font-semibold">Our sponsors</h2>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex h-16 w-[160px] items-center justify-center rounded-sm bg-[#141d27] text-[10px] uppercase tracking-wide text-white/40"
            >
              Sponsor
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1280px] border-t border-[var(--line)] px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[46ch] text-base text-white/70">
            Interested in partnering with us? We&apos;d love to talk.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-sm bg-[var(--coral)] px-7 py-3.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[var(--deep)]"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
