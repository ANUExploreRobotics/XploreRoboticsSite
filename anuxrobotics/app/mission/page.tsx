import ScrollReveal from "@/components/ScrollReveal";
import NavBar from "@/components/ui/NavBar";
import { requirements } from "@/lib/project";
import { CONTACT_EMAIL } from "@/lib/contact";

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

export default function MissionPage() {
  return (
    <>
      <div className="relative z-[2] mx-auto flex h-full w-full max-w-[1600px] flex-col px-6 pt-8 md:px-12">
        <NavBar />
      </div>

      {/* COVER */}
      <section className="mx-auto max-w-[1600px] flex min-h-[70vh] flex-col justify-center px-6 md:px-12 py-24">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
          ANU Exploration Robotics — per aspera ad profunda
        </span>
        <h1 className="font-display mt-4 text-[clamp(3rem,6vw,5.5rem)] font-semibold tracking-tight text-white">
          Mission
        </h1>
        <p className="mt-5 max-w-[50ch] text-lg leading-8 text-white/70">
          Exploring and surveying the world around us with custom-made autonomous robots.
        </p>
        <p className="mt-2 text-sm tracking-[0.14em] text-white/40">2026 / 2027</p>
      </section>

      {/* WHAT THE CLUB DOES */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 py-24">
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
      <section className="mx-auto max-w-[1600px] border-t border-[var(--line)] px-6 md:px-12 py-24">
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

      </section>

      {/* FUTURE DIRECTIONS */}
      <section className="mx-auto max-w-[1600px] border-t border-[var(--line)] px-6 md:px-12 py-24">
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

      {/* SUPPORTING THE CLUB */}
      <section className="mx-auto max-w-[1600px] border-t border-[var(--line)] px-6 md:px-12 py-24">
        <ScrollReveal>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
            Support
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-white">
            Supporting the club
          </h2>
          <p className="mt-5 max-w-[70ch] text-base leading-7 text-white/70">
            The club is funded through member contributions and external
            support. Sponsorship goes toward parts, fabrication and testing for the build.
          </p>
          <p className="mt-4 max-w-[70ch] text-base leading-7 text-white/70">
            Support in kind is as useful to us as cash. Components, machining or fabrication
            time, workshop access and technical mentoring all contribute directly to the
            build. If you would like to support the club, please get in touch.
          </p>
        </ScrollReveal>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-[1600px] border-t border-[var(--line)] px-6 md:px-12 py-24">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-semibold text-white">
            ANU Exploration Robotics
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/50">
            Australian National University,
            <br />
            Canberra, ACT 2600, Australia
          </p>
          <dl className="mt-8 grid max-w-[420px] grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm">
            <dt className="font-semibold text-white/80">General enquiries</dt>
            <dd>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/50 hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </dd>
            <dt className="font-semibold text-white/80">President</dt>
            <dd className="text-white/50">Mert Boyali</dd>
            <dt className="font-semibold text-white/80">Vice President</dt>
            <dd className="text-white/50">Tunc Can</dd>
            <dt className="font-semibold text-white/80">Secretary</dt>
            <dd className="text-white/50">Thomas Palin</dd>
            <dt className="font-semibold text-white/80">Treasurer</dt>
            <dd className="text-white/50">Jackie Zhang</dd>
            <dt className="font-semibold text-white/80">Instagram</dt>
            <dd>
              <a href="https://www.instagram.com/explorationrobotics/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white">
                @explorationrobotics
              </a>
            </dd>
          </dl>
        </ScrollReveal>
      </section>
    </>
  );
}