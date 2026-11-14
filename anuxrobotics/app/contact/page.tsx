"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import NavBar from "@/components/ui/NavBar";
import { CONTACT_EMAIL, inboxes } from "@/lib/contact";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copying the email address failed:", error);
    }
  }

  return (
    <>
      <div className="relative z-[2] mx-auto flex h-full w-full max-w-[1600px] flex-col px-6 pt-8 md:px-12">
        <NavBar />
      </div>

      {/* PAGE HERO */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 pb-24 pt-32">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
          Contact
        </span>
        <h1 className="font-display mt-3 max-w-[16ch] text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[1.05] tracking-tight">
          Let&apos;s talk robots.
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-8 text-white/70">
          Want to join, sponsor the build, or just ask a question? Send us an email and someone
          from the team will get back to you.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-display break-all text-[clamp(1.5rem,3vw,2.25rem)] font-semibold underline decoration-white/30 decoration-2 underline-offset-8 transition-colors hover:decoration-white"
          >
            {CONTACT_EMAIL}
          </a>
          <button
            type="button"
            onClick={copyAddress}
            aria-label="Copy email address"
            className="btn-outline px-5 py-2.5 text-[11px]"
          >
            <span className="flex items-center gap-2">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </span>
          </button>
        </div>
      </section>

      {/* INBOXES */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 pb-24">
        <div className="mb-2 border-b border-[var(--line)] pb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
            Direct lines
          </span>
          <h2 className="text-3xl font-semibold">Reach the right people</h2>
        </div>
        <ul>
          {inboxes.map((inbox, i) => (
            <li key={inbox.email} className="border-b border-[var(--line)]">
              <a
                href={`mailto:${inbox.email}`}
                className="group grid items-center gap-x-8 gap-y-1 py-7 md:grid-cols-[3rem_1fr_1.2fr_auto]"
              >
                <span className="hidden text-sm font-semibold text-white/30 md:block">0{i + 1}</span>
                <span className="text-xl font-semibold transition-colors group-hover:text-[var(--coral)]">
                  {inbox.title}
                </span>
                <span className="text-sm text-white/60">{inbox.desc}</span>
                <span className="mt-2 flex items-center gap-2 font-mono text-sm text-white/70 transition-colors group-hover:text-white md:mt-0">
                  {inbox.email}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* DETAILS */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 pb-28">
        <div className="grid gap-px overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
          <div className="bg-[var(--paper)] p-8">
            <span className="text-[11px] uppercase tracking-wide text-white/40">Based at</span>
            <p className="mt-2 text-lg font-medium">Australian National University, Canberra</p>
          </div>
          <div className="bg-[var(--paper)] p-8">
            <span className="text-[11px] uppercase tracking-wide text-white/40">Follow the build</span>
            <a
              href="https://www.instagram.com/explorationrobotics/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-1 text-lg font-medium transition-colors hover:text-[var(--coral)]"
            >
              @explorationrobotics
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="bg-[var(--paper)] p-8">
            <span className="text-[11px] uppercase tracking-wide text-white/40">Sponsorship</span>
            <Link
              href="/sponsors"
              className="mt-2 flex items-center gap-1 text-lg font-medium transition-colors hover:text-[var(--coral)]"
            >
              Sponsor the team
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
