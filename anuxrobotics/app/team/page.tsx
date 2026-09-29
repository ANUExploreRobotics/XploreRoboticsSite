import Header from "@/components/Header";
import Link from "next/link";
import NavBar from "@/components/ui/NavBar";

const teamGroups = [
  {
    group: "Executive Team",
    blurb: "Leads strategy, planning, and overall project direction.",
    members: [
      { name: "Mert Boyali", role: "President" },
      { name: "Tunc Can", role: "Vice President" },
      { name: "Jackie Zhang", role: "Treasurer" },
      { name: "Thomas Palin", role: "Secretary" },
    ],
  },
  {
    group: "Mechanical Team",
    blurb: "Designs and builds the submarine's structure and hardware.",
    members: [
      { name: "Bryn Whitaker", role: "Mechanical Lead" },
      { name: "Finn Wilson", role: "Member" },
      { name: "Liam Fouracre", role: "Member" },
      { name: "Alex Jurgs", role: "Member" },
      { name: "Levi Pau", role: "Member" },
    ],
  },
  {
    group: "Electronics Team",
    blurb: "Handles wiring, sensors, and onboard hardware.",
    members: [
      { name: "Dasun Weliwita", role: "Electronics Lead" },
      { name: "Rani Mamootil", role: "Member" },
      { name: "Ryan Marshall", role: "Member" },
      { name: "Jackson McDougall", role: "Member" },
      { name: "Chithi Gunatilake", role: "Member" },
    ],
  },
  {
    group: "Software Team",
    blurb: "Develops control, navigation, and scanning software.",
    members: [
      { name: "Joel Crispe", role: "Software Lead" },
      { name: "Matthew Lloyd", role: "Member" },
      { name: "Jeremy Firth", role: "Member" },
      { name: "Tahlia Chambers", role: "Member" },
    ],
  },
  {
    group: "Business & Marketing Team",
    blurb: "Manages sponsorships, outreach, and public communications.",
    members: [
      { name: "Eric Firth", role: "Business Lead" },
      { name: "TODO Name", role: "Member" },
    ],
  },
];

// Turns "Mert Boyali" into "mert-boyali" so photo filenames are predictable
function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function TeamPage() {
  return (
    <>
      <div className="relative z-[2] flex h-full w-full flex-col px-6 pt-8 md:px-12">
        <NavBar />
      </div>

      {/* PAGE HERO */}
      <section className="mx-auto max-w-[1280px] px-6 pb-16 pt-32">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
          Who we are
        </span>
        <h1 className="font-display mt-3 text-[clamp(2.5rem,4.5vw,3.75rem)] font-semibold tracking-tight">
          Team
        </h1>
        <p className="mt-5 max-w-[60ch] text-base leading-7 text-white/70">
          ANU Exploration Robotics is a student-run team spanning mechanical, electrical,
          software, and business - working together to design and build an autonomous
          underwater vehicle for the RobotX RoboSub competition.
        </p>
        <p className="mt-3 text-sm text-white/50">
          Get in touch:{" "}
          <a
            href="mailto:anuexplorationrobotics@gmail.com"
            className="text-[var(--coral)]"
          >
            anuexplorationrobotics@gmail.com
          </a>
        </p>
      </section>

      {/* MEMBER LIST */}
      {teamGroups.map((group) => (
        <section key={group.group} className="mx-auto max-w-[1280px] px-6 py-10">
          <div className="mb-8 flex items-end justify-between border-b border-[var(--line)] pb-4">
            <div>
              <h2 className="text-2xl font-semibold">{group.group}</h2>
              <p className="mt-1 text-sm text-white/50">{group.blurb}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {group.members.map((member, i) => (
              <div key={i}>
                {/*
                  TODO: drop a photo into /public/team/ named exactly
                  "<slugified-name>.jpg" (e.g. mert-boyali.jpg) and it'll
                  appear here automatically. Until then, the gradient shows.
                */}
                <div
                  className="mb-3.5 aspect-square rounded-sm bg-cover bg-center"
                  style={{
                    backgroundImage: `url(/team/${slugify(member.name)}.jpg), linear-gradient(150deg, #2a323a, #1a2027)`,
                  }}
                />
                <h4 className="font-display text-sm font-semibold">{member.name}</h4>
                <span className="text-xs text-white/50">{member.role}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* SPONSOR MENTION STRIP */}
      <section className="mx-auto max-w-[1280px] border-t border-[var(--line)] px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[46ch] text-sm text-white/60">
            This team is proudly supported by our sponsors - their backing makes our build
            possible.
          </p>
          <Link
            href="/sponsors"
            className="inline-block text-sm font-semibold transition-transform hover:scale-105"
          >
            See our sponsors →
          </Link>
        </div>
      </section>
    </>
  );
}