'use client';

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu(){
    const [isOpen, setIsOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
        setAboutOpen(false);
    };

    return(
        <div className="ml-auto md:hidden">
            {/* Hamburger / close toggle */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="relative z-[60] p-1 text-white"
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                )}
            </button>

            {/* Backdrop */}
            <div
                onClick={closeMenu}
                className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />

            {/* Slide-in panel */}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-[78%] max-w-[320px] transform bg-[var(--deep)] px-7 pt-24 shadow-2xl transition-transform duration-300 ease-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <ul className="flex flex-col gap-1">
                    <li>
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="block py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-[var(--coral)]"
                        >
                            Home
                        </Link>
                    </li>

                    <li className="border-t border-white/10">
                        <button
                            type="button"
                            onClick={() => setAboutOpen(!aboutOpen)}
                            className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wide text-white"
                        >
                            About
                            <svg
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className={`transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-200 ${
                                aboutOpen ? "max-h-40" : "max-h-0"
                            }`}
                        >
                            <div className="flex flex-col gap-1 border-l border-white/10 pb-2 pl-4">
                                <Link
                                    href="/team"
                                    onClick={closeMenu}
                                    className="py-2 text-sm text-white/70 transition-colors hover:text-[var(--coral)]"
                                >
                                    Team
                                </Link>
                                <Link
                                    href="/mission"
                                    onClick={closeMenu}
                                    className="py-2 text-sm text-white/70 transition-colors hover:text-[var(--coral)]"
                                >
                                    Mission
                                </Link>
                                <Link
                                    href="/sponsors"
                                    onClick={closeMenu}
                                    className="py-2 text-sm text-white/70 transition-colors hover:text-[var(--coral)]"
                                >
                                    Partners
                                </Link>
                            </div>
                        </div>
                    </li>

                    <li className="border-t border-white/10">
                        <Link
                            href="/vehicle"
                            onClick={closeMenu}
                            className="block py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-[var(--coral)]"
                        >
                            Vehicle
                        </Link>
                    </li>
                    <li className="border-t border-white/10">
                        <Link
                            href="/updates"
                            onClick={closeMenu}
                            className="block py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-[var(--coral)]"
                        >
                            Updates
                        </Link>
                    </li>
                    <li className="border-t border-white/10">
                        <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="block py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-[var(--coral)]"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}