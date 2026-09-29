'use client';

import Link from 'next/link';
import Image from 'next/image';

import MobileMenu from './MobileMenu';

export default function NavBar(){
    return(
        <nav className="flex items-center gap-16">
            <div>
                <Link href="/">
                    <Image src="/logo.png" alt="Exploration Robotics logo" width={200} height={40} />
                </Link>

            </div>

            {/* DESKTOP MENU */}
            <ul className="hidden gap-10 md:ml-auto md:flex">
                <li className="group relative">
                    <button
                        type="button"
                        className="text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]"
                    >
                        About
                    </button>

                    <div className="absolute left-0 top-full h-3 w-full" />

                    <div className="invisible absolute left-0 top-full min-w-[160px] translate-y-1 rounded-sm border border-[var(--line)] bg-[var(--paper)] p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <Link
                            href="/team"
                            className="block rounded-sm px-3 py-2 text-sm text-white transition-colors hover:bg-white/5 hover:text-[var(--coral)]"
                        >
                            Team
                        </Link>
                        <Link
                            href="/mission"
                            className="block rounded-sm px-3 py-2 text-sm text-white transition-colors hover:bg-white/5 hover:text-[var(--coral)]"
                        >
                            Mission
                        </Link>
                    </div>
                </li>
                <li>
                    <Link href="/vehicle" className="inline-block text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]">
                        Vehicle
                    </Link>
                </li>
                <li>
                    <Link href="/updates" className="inline-block text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]">
                        Updates
                    </Link>
                </li>
                <li>
                    <Link href="/sponsors" className="inline-block text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]">
                        Partners
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className="inline-block text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]">
                        Contact
                    </Link>
                </li>
            </ul>

            <MobileMenu/>
        </nav>
    );
}