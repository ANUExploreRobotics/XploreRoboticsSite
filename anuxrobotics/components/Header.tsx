"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  {
    label: "About",
    children: [
      { href: "/team", label: "Team" },
      { href: "/mission", label: "Mission" },
    ],
  },
  { href: "/updates", label: "Updates" },
  { href: "/sponsors", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-[1600px] flex items-center justify-between px-6 md:px-12 py-6">
        <Link
          href="/"
          aria-label="Exploration Robotics home"
          className="text-2xl font-bold uppercase tracking-widest text-white transition-colors hover:text-[var(--coral)]"
        >
          EXR
        </Link>
        <nav className="hidden gap-10 md:flex">
          {NAV_LINKS.map((link) => {
            if (link.children) {
              const isActive = link.children.some((c) => c.href === pathname);
              return (
                <div key={link.label} className="group relative">
                  <button
                    type="button"
                    className={`text-sm font-medium uppercase tracking-wide transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)] ${
                      isActive ? "text-[var(--coral)]" : "text-white"
                    }`}
                  >
                    {link.label}
                  </button>

                  {/* invisible bridge so the dropdown doesn't close when moving the mouse down to it */}
                  <div className="absolute left-0 top-full h-3 w-full" />

                  <div className="invisible absolute left-0 top-full min-w-[160px] translate-y-1 rounded-sm border border-[var(--line)] bg-[var(--paper)] p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {link.children.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block rounded-sm px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-[var(--coral)] ${
                            childActive ? "text-[var(--coral)]" : "text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wide transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)] ${
                  isActive ? "text-[var(--coral)]" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}