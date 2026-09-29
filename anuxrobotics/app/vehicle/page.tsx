import Header from "@/components/Header";
import NavBar from "@/components/ui/NavBar";

const specs = [
  { label: "Vehicle name", value: "Prototype 1.0" },
  { label: "Type", value: "Tethered proof-of-concept" },
  { label: "Target depth", value: "TODO m" },
  { label: "Propulsion", value: "TODO thrusters" },
  { label: "Power", value: "TODO" },
  { label: "Dimensions", value: "TODO cm" },
];

const systems = [
  {
    tag: "Mechanical",
    title: "Structure & hardware",
    desc: "TODO - hull design, frame material, watertight housing, and buoyancy approach.",
  },
  {
    tag: "Electronics",
    title: "Wiring & sensors",
    desc: "TODO - power distribution, sensor suite, and onboard hardware layout.",
  },
  {
    tag: "Software",
    title: "Control & navigation",
    desc: "TODO - control loop, navigation stack, and seabed-scanning pipeline.",
  },
];

export default function VehiclePage() {
  return (
    <>
      <div className="relative z-[2] flex h-full w-full flex-col px-6 pt-8 md:px-12">
        <NavBar />
      </div>

      {/* PAGE HERO */}
      <section className="mx-auto max-w-[1280px] px-6 pb-16 pt-32">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
          What we&apos;re building
        </span>
        <h1 className="font-display mt-3 text-[clamp(2.5rem,4.5vw,3.75rem)] font-semibold tracking-tight">
          Vehicle
        </h1>
        <p className="mt-5 max-w-[60ch] text-base leading-7 text-white/70">
          We&apos;re currently developing Prototype 1.0 - a tethered proof-of-concept vehicle
          that demonstrates controlled underwater movement, laying the foundation for a fully
          autonomous competition vehicle to follow.
        </p>
      </section>

      {/* SPEC GRID */}
      <section className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[var(--line)] md:grid-cols-3">
          {specs.map((spec) => (
            <div key={spec.label} className="bg-[var(--paper)] p-6">
              <span className="text-[11px] uppercase tracking-wide text-white/40">
                {spec.label}
              </span>
              <p className="font-display mt-1 text-lg font-semibold">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SYSTEMS BREAKDOWN */}
      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="mb-12 border-b border-[var(--line)] pb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
            How it works
          </span>
          <h2 className="text-3xl font-semibold">Systems breakdown</h2>
        </div>
        <div className="grid gap-16">
          {systems.map((system, i) => (
            <div
              key={system.tag}
              className={`grid items-center gap-12 md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div
                className="aspect-video rounded-sm"
                style={{ background: "linear-gradient(160deg, #0a5c73, #1fc4a8)" }}
              />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--cyan)]">
                  {system.tag}
                </span>
                <h3 className="font-display mt-2 text-2xl font-semibold">{system.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/70">{system.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-[1280px] border-t border-[var(--line)] px-6 py-20">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
            In the workshop
          </span>
          <h2 className="text-3xl font-semibold">Gallery</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{ background: "linear-gradient(150deg, #2a323a, #1a2027)" }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
