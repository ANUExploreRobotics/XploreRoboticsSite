import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, ShieldCheck, Users, Waves } from "lucide-react";
import NavBar from "@/components/ui/NavBar";
import HeroField from "@/components/HeroField";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollProgress />

      {/* HERO */}
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-8 md:px-12">
        <NavBar />
      </div>

      <section className="mx-auto max-w-[1600px] px-6 pt-8 md:px-12">
        <div className="relative flex min-h-[78vh] flex-col justify-end overflow-hidden rounded-[2.5rem] [clip-path:inset(0_round_2.5rem)]">
          <HeroField />

          <div className="relative p-8 md:p-14 lg:p-20">
            <h1 className="font-display max-w-[16ch] text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[1.05] text-white">
              Robots built to explore the unknown.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-8 text-white/90 [text-shadow:0_1px_12px_rgba(1,8,16,0.9)]">
              ANU Exploration Robotics is a student team designing robots that explore and
              survey places people can&apos;t easily reach. Our current project is an
              autonomous underwater vehicle.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/mission" className="btn">
                Our mission <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-ghost">
                Join the team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="mx-auto max-w-[1600px] px-6 pt-28 md:px-12 md:pt-40">
        <div className="mx-auto max-w-[44ch] text-center">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">How we work</h2>
          <p className="mt-5 text-lg leading-8 text-white/60">
            A student team that designs, builds and tests its own robots, from first
            requirements to trials in the water.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          <Feature icon={<Waves size={20} />} title="Underwater first">
            Water, pressure and distance shape every design decision. We start underwater,
            where there is no room for a leak.
          </Feature>
          <Feature icon={<Users size={20} />} title="Run by students">
            Engineers, programmers and designers from across ANU, of every year and discipline.{" "}
            <Link
              href="/team"
              className="inline-flex items-center gap-1 font-medium text-white hover:underline"
            >
              Meet the team <ArrowUpRight size={14} />
            </Link>
          </Feature>
          <Feature icon={<ShieldCheck size={20} />} title="Safety designed in">
            A kill switch, electrical isolation, water ingress detection and battery monitoring
            are part of the design from the start.
          </Feature>
        </div>

        <ScrollReveal className="mt-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:aspect-[21/9]">
            <Image
              src="/team/team-photo.jpg"
              alt="The Exploration Robotics team"
              fill
              sizes="(min-width: 1600px) 1504px, 100vw"
              className="object-cover grayscale"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* IN THE LAB */}
      <section className="mx-auto max-w-[1600px] px-6 pt-28 md:px-12 md:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <ScrollReveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
              <Image
                src="/team/workshop.jpg"
                alt="Team members working together at their computers in the lab"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover grayscale"
              />
            </div>
          </ScrollReveal>
          <div>
            <Eyebrow>In the lab</Eyebrow>
            <h2 className="font-display mt-2 text-4xl font-semibold md:text-5xl">
              Built side by side
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-8 text-white/60">
              Design, code and testing happen in the same room. Members work across
              mechanical, electrical and software, and learn from each other as the vehicle
              comes together.
            </p>
            <Link href="/updates" className="btn-ghost mt-8">
              Follow our progress <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* GET INVOLVED */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div>
          <Eyebrow>Get involved</Eyebrow>
          <h2 className="font-display mt-2 text-4xl font-semibold md:text-5xl">
            Want to build something real?
          </h2>
          <div className="mt-5">
            <p className="max-w-[46ch] text-lg leading-8 text-white/60">
              Open to students of any year and discipline. No robotics experience needed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn">
                Join the team <ArrowRight size={16} />
              </Link>
              <Link href="/sponsors" className="btn-ghost">
                Sponsor us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Feature({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div>
      <span className="text-white/70">{icon}</span>
      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-base leading-7 text-white/55">{children}</p>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-white/50">{children}</p>;
}
