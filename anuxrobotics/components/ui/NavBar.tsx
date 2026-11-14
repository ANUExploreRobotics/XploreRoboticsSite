'use client';

import { useRouter, usePathname } from 'next/navigation';

import MobileMenu from './MobileMenu';
import { searchSite, type SearchResult } from '@/lib/searchIndex';
import { scrollToTextOnPage } from '@/lib/scrollToText';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

function HighlightedSnippet({ result }: { result: SearchResult }) {
    const before = result.snippet.slice(0, result.matchStart);
    const match = result.snippet.slice(
        result.matchStart,
        result.matchStart + result.matchLength
    );
    const after = result.snippet.slice(result.matchStart + result.matchLength);

    return (
        <p className="mt-1 text-sm leading-6 text-white/60">
            {before}
            <mark className="rounded-sm bg-[var(--coral)]/30 px-0.5 text-white">
                {match}
            </mark>
            {after}
        </p>
    );
}

const DESKTOP_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/updates', label: 'Updates' },
    { href: '/contact', label: 'Contact' },
];

const ABOUT_LINKS = [
    { href: '/team', label: 'Team', desc: 'The people behind the build' },
    { href: '/mission', label: 'Mission', desc: 'What we are building and why' },
    { href: '/sponsors', label: 'Partners', desc: 'Organisations supporting us' },
];

// pill highlight on hover, and a quieter one marking the current page
const navLinkClass = (active: boolean) =>
    `inline-block rounded-full px-3.5 py-1.5 text-sm font-medium uppercase tracking-wide transition-colors hover:bg-white/10 hover:text-white ${
        active ? 'bg-white/[0.06] text-white' : 'text-white/75'
    }`;

export default function NavBar(){
    const router = useRouter();
    const pathname = usePathname();
    const [query, setQuery] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!panelOpen) return;
        searchSite(query).then(setResults);
    }, [query, panelOpen]);

    useEffect(() => {
        if (panelOpen) {
            // slight delay so focus happens after the slide-in transition starts
            const t = setTimeout(() => inputRef.current?.focus(), 50);
            return () => clearTimeout(t);
        }
    }, [panelOpen]);

    const openPanel = () => setPanelOpen(true);
    const closePanel = () => {
        setPanelOpen(false);
        setQuery('');
        setResults([]);
    };

    const goToResult = (result: SearchResult) => {
        const before = result.snippet.slice(0, result.matchStart).replace(/^…/, '');
        const match = result.snippet.slice(
            result.matchStart,
            result.matchStart + result.matchLength
        );
        const after = result.snippet
            .slice(result.matchStart + result.matchLength)
            .replace(/…$/, '');

        closePanel();

        // Already on that page: no navigation happens, so scroll directly
        if (pathname === result.url) {
            setTimeout(() => scrollToTextOnPage({ before, match, after }), 350);
            return;
        }

        sessionStorage.setItem(
            'pendingScrollText',
            JSON.stringify({ url: result.url, before, match, after })
        );
        router.push(result.url);
    };

    return(
        <nav className="relative z-50 flex items-center gap-16">
            <div>
                <Link
                    href="/"
                    aria-label="ANU Exploration Robotics home"
                    className="group flex items-stretch gap-3 text-white"
                >
                    {/* text-box trim crops each line to cap height so the divider and stacked text align with EXR's letters */}
                    <span className="text-4xl font-extrabold uppercase leading-none tracking-wider transition-colors [text-box:trim-both_cap_alphabetic] group-hover:text-[var(--coral)]">
                        EXR
                    </span>
                    <span aria-hidden="true" className="w-0.5 bg-[var(--coral)]" />
                    <span className="flex flex-col justify-between">
                        <span className="text-xs font-bold uppercase leading-none tracking-widest [text-box:trim-both_cap_alphabetic]">
                            Exploration Robotics
                        </span>
                        <span className="text-[10px] font-semibold uppercase leading-none tracking-widest text-white/70 [text-box:trim-both_cap_alphabetic]">
                            ANU Student Club
                        </span>
                    </span>
                </Link>
            </div>

            {/* DESKTOP MENU */}
            <ul className="hidden items-center gap-1 md:ml-auto md:flex">
                {DESKTOP_LINKS.slice(0, 1).map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className={navLinkClass(pathname === link.href)}>
                            {link.label}
                        </Link>
                    </li>
                ))}
                <li className="group relative">
                    <button
                        type="button"
                        className={`${navLinkClass(ABOUT_LINKS.some((l) => l.href === pathname)).replace('inline-block', 'inline-flex')} items-center gap-1.5`}
                    >
                        About
                        <svg viewBox="0 0 24 24" className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>

                    {/* invisible bridge so the dropdown doesn't close when moving the mouse down to it */}
                    <div className="absolute left-0 top-full h-3 w-full" />

                    <div className="invisible absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 translate-y-1 rounded-2xl bg-neutral-900 p-1.5 opacity-0 shadow-2xl shadow-black/60 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        {ABOUT_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-white/10 ${
                                    pathname === link.href ? "bg-white/10" : ""
                                }`}
                            >
                                <span className="block text-sm font-medium text-white">{link.label}</span>
                                <span className="mt-0.5 block text-xs text-white/50">{link.desc}</span>
                            </Link>
                        ))}
                    </div>
                </li>
                {DESKTOP_LINKS.slice(1).map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className={navLinkClass(pathname === link.href)}>
                            {link.label}
                        </Link>
                    </li>
                ))}
                <li className="ml-3">
                    <button
                        type="button"
                        onClick={openPanel}
                        aria-label="Open search"
                        className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                    >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="7" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <span className="text-sm">Search</span>
                    </button>
                </li>
            </ul>

            <MobileMenu/>

            {/* SEARCH PANEL */}
            <div
                onClick={closePanel}
                className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
                    panelOpen ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />
            <div
                className={`fixed right-0 top-0 z-50 h-full w-full max-w-[420px] transform bg-[var(--deep)] shadow-2xl transition-transform duration-300 ease-out ${
                    panelOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex items-center gap-3 border-b border-[var(--line)] px-6 py-5">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0 text-white/50" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search the site..."
                        aria-label="Search the site"
                        className="flex-1 bg-transparent text-base text-white placeholder-white/40 outline-none"
                    />
                    <button
                        type="button"
                        onClick={closePanel}
                        aria-label="Close search"
                        className="text-white/50 transition-colors hover:text-white"
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col gap-1 overflow-y-auto px-4 py-4" style={{ maxHeight: "calc(100% - 76px)" }}>
                    {query && results.length === 0 && (
                        <p className="px-2 py-4 text-sm text-white/50">No results found.</p>
                    )}
                    {results.map((result, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => goToResult(result)}
                            className="block w-full rounded-sm px-3 py-3 text-left transition-colors hover:bg-white/5"
                        >
                            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--coral)]">
                                {result.page}
                            </span>
                            <HighlightedSnippet result={result} />
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}