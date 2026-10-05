'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import MobileMenu from './MobileMenu';
import { searchSite, type SearchResult } from '@/lib/searchIndex';

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

export default function NavBar(){
    const router = useRouter();
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
        const cleanSnippet = result.snippet.replace(/^…/, '').replace(/…$/, '');
        sessionStorage.setItem(
            'pendingScrollText',
            JSON.stringify({ url: result.url, text: cleanSnippet })
        );
        router.push(result.url);
        closePanel();
    };

    return(
        <nav className="flex items-center gap-16">
            <div>
                <Link href="/">
                    <Image src="/logo.png" alt="Exploration Robotics logo" width={200} height={40} />
                </Link>
            </div>

            {/* DESKTOP MENU */}
            <ul className="hidden items-center gap-10 md:ml-auto md:flex">
                <li>
                    <Link href="/" className="inline-block text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]">
                        Home
                    </Link>
                </li>
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
                        <Link
                            href="/sponsors"
                            className="block rounded-sm px-3 py-2 text-sm text-white transition-colors hover:bg-white/5 hover:text-[var(--coral)]"
                        >
                            Partners
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
                    <Link href="/contact" className="inline-block text-sm font-medium uppercase tracking-wide text-white transition-transform duration-200 hover:scale-110 hover:text-[var(--coral)]">
                        Contact
                    </Link>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={openPanel}
                        aria-label="Open search"
                        className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-white/60 transition-colors hover:border-[var(--coral)] hover:text-white"
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