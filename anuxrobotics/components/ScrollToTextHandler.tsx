"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scrollToTextOnPage, type ScrollTarget } from "@/lib/scrollToText";

export default function ScrollToTextHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const raw = sessionStorage.getItem("pendingScrollText");
    if (!raw) return;

    try {
      const { url, before, match, after } = JSON.parse(raw) as ScrollTarget & {
        url: string;
      };
      if (url === pathname) {
        sessionStorage.removeItem("pendingScrollText");
        setTimeout(() => scrollToTextOnPage({ before, match, after }), 250);
      }
    } catch {
      sessionStorage.removeItem("pendingScrollText");
    }
  }, [pathname]);

  return null;
}