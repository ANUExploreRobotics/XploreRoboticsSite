import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import NavBar from "@/components/ui/NavBar";

const requirements = [
  {
    id: "R-01",
    requirement:
      "Move under control in surge, heave through buoyancy control, and yaw, with passively stable roll and pitch.",
    verification: "Demonstration",
  },
  {
    id: "R-02",
    requirement: "Remain watertight to a depth of 2.1 metres, being 20.6 kPa.",
    verification: "Test",
  },
  {
    id: "R-03",
    requirement: "Sit within 0.5 per cent of neutral buoyancy when shut off.",
    verification: "Test",
  },
  {
    id: "R-04",
    requirement: "Run on battery power, with variable control of acceleration and velocity.",
    verification: "Demonstration",
  },
  {
    id: "R-05",
    requirement: "Carry a clear and accessible propulsion kill switch at the stern.",
    verification: "Test",
  },
  {
    id: "R-06",
    requirement: "Allow major components to be accessed or replaced without redesign.",
    verification: "Inspection",
  },
  {
    id: "R-07",
    requirement: "Leave provision for later autonomy, sensing and task mechanisms.",
    verification: "Inspection",
  },
];

const timeline = [
  { when: "Aug 2026", what: "Requirements review" },
  { when: "Sep 2026", what: "Preliminary design review" },
  { when: "Oct 2026", what: "Critical design review" },
  { when: "Nov/Dec 2026", what: "Implementation and assembly" },
  { when: "Jan/Feb 2027", what: "Test readiness review" },
  { when: "Mar 2027", what: "Pool trials and verification" },
  { when: "Apr 2027", what: "Validation and closeout" },
  { when: "Aug 2027", what: "RoboSub target cycle" },
];

const futureDirections = [
  {
    title: "Marine reef and wildlife conservation",
    desc: "We hope to explore the use of robotics to observe and map ocean wildlife. Robotics of this kind can have a tremendous impact on the conservation of coral reef systems and wildlife populations through monitoring and scanning them.",
  },
  {
    title: "The UAV Challenge: Outback Rescue",
    desc: "An Australian competition in which an autonomous aircraft must locate a stranded person, represented by a mannequin known as Outback Joe, and complete a retrieval or delivery task. Entering would take the club beyond underwater vehicles into aerial systems, drawing on the same work in autonomy, perception and vehicle design.",
  },
  {
    title: "Depth project",
    desc: "An attempt at a depth record for a vehicle designed and built entirely by undergraduates. The engineering sits in pressure housing design, seal and penetrator selection, and structural analysis at depths far beyond anything a pool can be used to test, which makes analysis and proof testing the whole of the problem.",
  },
];

const sponsorBenefits = [
  {
    n: "01",
    title: "Logo on the sub",
    desc: "Placement on the hull of the vehicle, subject to available surface area and, where the vehicle is entered in a competition, to the rules of that competition.",
  },
  {
    n: "02",
    title: "Logo on our website",
    desc: "Placement on the supporters section of the club website for the duration of the sponsorship.",
  },
  {
    n: "03",
    title: "Invitations to our meetings and events",
    desc: "Sponsors are welcome at club meetings, design reviews and pool trials, and are invited to the events we run through the year.",
  },
  {
    n: "04",
    title: "Features on our social media and videos",
    desc: "Promotion across our social media posts and video content, including build logs and footage from testing and competition.",
  },
];

export default function ProspectusPage() {
  return (
    <>
      <div className="relative z-[2] flex h-full w-full flex-col px-6 pt-8 md:px-12">
        <NavBar />
      </div>

      {/* COVER */}
      <section className="mx-auto flex min-h-[70vh] max-w-[1280px] flex-col justify-center px-[8vw] py-24">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
          ANU Exploration Robotics — per aspera ad profunda
        </span>
        <h1 className="font-display mt-4 text-[clamp(3rem,6vw,5.5rem)] font-semibold tracking-tight text-white">
          Prospectus
        </h1>
        <p className="mt-5 max-w-[50ch] text-lg leading-8 text-white/70">
          Exploring and surveying the world around us with custom-made autonomous robots.
        </p>
        <p className="mt-2 text-sm tracking-[0.14em] text-white/40">2026 / 2027</p>
      </section>

      {/* WHAT THE CLUB DOES */}
      <section className="mx-auto max-w-[1280px] px-[8vw] py-24">
        <ScrollReveal>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
            Who we are
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-white">
            What the club does
          </h2>
          <p className="mt-5 max-w-[70ch] text-base leading-7 text-white/70">
            ANU Exploration Robotics is a student-run club operating in Canberra. Our focus
            is on the exploration and surveying of the world around us through the use of
            custom-made, autonomous robots. To accommodate this goal, we enter competitions
            on the world stage, allowing us and our robots to gain experience that can be
            used on sustainable initiatives.
          </p>
          <p className="mt-4 max-w-[70ch] text-base leading-7 text-white/70">
            Membership is open to students of any year level and any discipline, and no
            prior robotics experience is required.
          </p>
        </ScrollReveal>
      </section>

      {/* MISSION OBJECTIVES */}
      <section className="mx-auto max-w-[1280px] border-t border-[var(--line)] px-[8vw] py-24">
        <ScrollReveal>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
            Mission objectives
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-white">Initial goals</h2>
          <p className="mt-5 max-w-[70ch] text-base leading-7 text-white/70">
            To make a submarine for the RobotX RoboSub competition, and complete as many
            tasks in the competition as possible.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100} className="mt-12">
          <h3 className="font-display text-xl font-semibold text-white">RoboSub</h3>
          <p className="mt-3 max-w-[70ch] text-base leading-7 text-white/70">
            RoboSub is an international student competition run by RoboNation and held
            annually in the United States. Teams build autonomous underwater vehicles that
            complete a course of tasks with no operator input and no tether once the vehicle
            is released. Tasks include navigating gates, identifying and localising objects
            by computer vision, homing on acoustic pingers, and releasing markers. Teams are
            also assessed on a technical design report and a design presentation.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150} className="mt-12">
          <h3 className="font-display text-xl font-semibold text-white">Prototype 1.0</h3>
          <p className="mt-3 max-w-[70ch] text-base leading-7 text-white/70">
            Prototype 1.0 is a tethered underwater vehicle controlled by an operator from an
            offboard computer. It is the foundation for a competition vehicle rather than an
            entry in itself, and is required to meet the following.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200} className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-white/40">
                <th className="py-3 pr-4 font-medium uppercase tracking-wide">ID</th>
                <th className="py-3 pr-4 font-medium uppercase tracking-wide">Requirement</th>
                <th className="py-3 font-medium uppercase tracking-wide">Verification</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((r) => (
                <tr key={r.id} className="border-b border-[var(--line)]">
                  <td className="py-4 pr-4 align-top font-semibold text-[var(--coral)]">
                    {r.id}
                  </td>
                  <td className="py-4 pr-4 align-top text-white/70">{r.requirement}</td>
                  <td className="py-4 align-top text-white/50">{r.verification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollReveal>

        <ScrollReveal delay={100} className="mt-16">
          <h3 className="font-display text-xl font-semibold text-white">Timeline</h3>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {timeline.map((t) => (
              <div key={t.when} className="border-l border-[var(--line)] pl-4">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--cyan)]">
                  {t.when}
                </span>
                <p className="mt-1 text-sm text-white/70">{t.what}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* FUTURE DIRECTIONS */}
      <section className="mx-auto max-w-[1280px] border-t border-[var(--line)] px-[8vw] py-24">
        <ScrollReveal>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
            Looking ahead
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-white">
            Future directions
          </h2>
          <p className="mt-5 max-w-[70ch] text-base leading-7 text-white/70">
            Although our current goals align with submarine development for the RobotX
            RoboSub competition, in the future we are looking forward to expanding our
            design principles into other design projects and different vehicles. These
            future projects would include:
          </p>
        </ScrollReveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {futureDirections.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 100}>
              <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{f.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SPONSORSHIP BENEFITS */}
      <section className="mx-auto max-w-[1280px] border-t border-[var(--line)] px-[8vw] py-24">
        <ScrollReveal>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
            Support
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-white">
            Sponsorship benefits
          </h2>
          <p className="mt-5 max-w-[70ch] text-base leading-7 text-white/70">
            The club is funded through the university, member contributions and external
            support. Sponsorship goes toward thrusters and motor controllers, seals and hull
            penetrators, enclosure machining and 3D printing, batteries and power
            management, cameras and sensing, embedded compute, tether and connectors, and
            pool hire for testing.
          </p>
          <p className="mt-4 max-w-[70ch] text-base leading-7 text-white/70">
            Support in kind is as useful to us as cash. Components, machining or fabrication
            time, workshop access and technical mentoring all contribute directly to the
            build. Sponsors receive the following.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {sponsorBenefits.map((b, i) => (
            <ScrollReveal key={b.n} delay={i * 80}>
              <span className="text-2xl font-semibold text-white/20">{b.n}</span>
              <h3 className="font-display mt-2 text-lg font-semibold text-white">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{b.desc}</p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200} className="mt-12">
          <p className="max-w-[70ch] text-sm leading-6 text-white/50">
            The scale of placement and any further arrangements are agreed directly, and we
            are glad to discuss what would suit a particular organisation.
          </p>
          <p className="mt-3 max-w-[70ch] text-sm leading-6 text-white/50">
            All sponsorships are accepted on the condition that they align with the club&apos;s
            values, academic integrity and commitment to safe practice, and with university
            policy. The club operates independently of any commercial entity and under the
            governance of university policies and student club regulations.
          </p>
        </ScrollReveal>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-[1280px] border-t border-[var(--line)] px-[8vw] py-24">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-semibold text-white">
            ANU Exploration Robotics
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/50">
            [Room / building], Australian National University,
            <br />
            Canberra, ACT 2600, Australia
          </p>
          <dl className="mt-8 grid max-w-[420px] grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm">
            <dt className="font-semibold text-white/80">General enquiries</dt>
            <dd className="text-white/50">[club email]</dd>
            <dt className="font-semibold text-white/80">President</dt>
            <dd className="text-white/50">[president email]</dd>
            <dt className="font-semibold text-white/80">Secretary</dt>
            <dd className="text-white/50">[secretary email]</dd>
            <dt className="font-semibold text-white/80">Treasurer</dt>
            <dd className="text-white/50">[treasurer email]</dd>
            <dt className="font-semibold text-white/80">Website</dt>
            <dd className="text-white/50">[website]</dd>
          </dl>
        </ScrollReveal>
      </section>
    </>
  );
}