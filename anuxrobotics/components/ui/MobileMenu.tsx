'use client';

import {useState} from "react";
import Link from "next/link";

export default function MobileMenu(){
    const [isOpen, setIsOpen] = useState(false);

    return(
        // Hamburger Menu Button
        <button className="ml-auto md:hidden" onClick={() => {setIsOpen(!isOpen)}}>
            {isOpen ? (
                <div>
                    <div>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" xmlns="http://w3.org">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                    <div>
                        <ul className="absolute block right-0 pr-2 pt-4">
                            <li>
                                <Link href="/team" className="inline-block mb-2 text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link href="/mission" className="inline-block mb-2 text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]">
                                    Mission
                                </Link>
                            </li>
                            <li>
                                <Link href="/vehicle" className="inline-block mb-2 text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]">
                                    Vehicle
                                </Link>
                            </li>
                            <li>
                                <Link href="/updates" className="inline-block mb-2 text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]">
                                    Updates
                                </Link>
                            </li>
                            <li>
                                <Link href="/sponsors" className="inline-block mb-2 text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]">
                                    Partners
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="inline-block mb-2 text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            )}


        </button>
    );

}