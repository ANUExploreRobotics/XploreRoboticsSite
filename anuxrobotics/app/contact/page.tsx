"use client";

import { useState, type FormEvent } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import NavBar from "@/components/ui/NavBar";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  }

  return (
    <>
      <div className="relative z-[2] flex h-full w-full flex-col px-6 pt-8 md:px-12">
        <NavBar />
      </div>

      {/* PAGE HERO */}
      <section className="mx-auto max-w-[1280px] px-6 pb-16 pt-32">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coral)]">
          Get in touch
        </span>
        <h1 className="font-display mt-3 text-[clamp(2.5rem,4.5vw,3.75rem)] font-semibold tracking-tight">
          Contact
        </h1>
        <p className="mt-5 max-w-[60ch] text-base leading-7 text-white/70">
          Questions, sponsorship enquiries, or want to join the team? Reach out - we&apos;d
          love to hear from you.
        </p>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-24">
        <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr]">
          {/* CONTACT DETAILS */}
          <div>
            <div className="border-b border-[var(--line)] pb-4">
              <span className="text-[11px] uppercase tracking-wide text-white/40">Email</span>
              <p className="mt-1">
                <a
                  href="mailto:anuexplorationrobotics@gmail.com"
                  className="text-lg font-medium text-[var(--coral)] hover:text-white"
                >
                  anuexplorationrobotics@gmail.com
                </a>
              </p>
            </div>
            <div className="mt-6 border-b border-[var(--line)] pb-4">
              <span className="text-[11px] uppercase tracking-wide text-white/40">Based at</span>
              <p className="mt-1 text-lg font-medium">Australian National University, Canberra</p>
            </div>
            <div className="mt-6 border-b border-[var(--line)] pb-4">
              <span className="text-[11px] uppercase tracking-wide text-white/40">Socials</span>
              <div className="mt-2 flex gap-4">
                <a href="#" className="text-sm text-white/70 hover:text-[var(--coral)]">
                  Instagram
                </a>
                <a href="#" className="text-sm text-white/70 hover:text-[var(--coral)]">
                  LinkedIn
                </a>
              </div>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Interested in sponsoring us instead?{" "}
              <Link href="/sponsors" className="text-[var(--coral)] hover:text-white">
                See our sponsors page →
              </Link>
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[11px] uppercase tracking-wide text-white/40">Name</label>
              <input
                type="text"
                name="name"
                required
                className="mt-1.5 w-full rounded-sm border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--coral)]"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wide text-white/40">Email</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1.5 w-full rounded-sm border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--coral)]"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wide text-white/40">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-1.5 w-full rounded-sm border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--coral)]"
              />
            </div>
            
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-block rounded-sm bg-[var(--coral)] px-7 py-3.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[var(--deep)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </button>

            {/* Success and Error Messages */}
            {status === "success" && (
              <p className="text-sm text-green-400 mt-2">Thanks! Your message has been sent.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400 mt-2">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}