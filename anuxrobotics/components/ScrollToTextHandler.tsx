"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scrollToTextOnPage } from "@/lib/scrollToText";

export default function ScrollToTextHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const raw = sessionStorage.getItem("pendingScrollText");
    if (!raw) return;

    try {
      const { url, text } = JSON.parse(raw);
      if (url === pathname) {
        sessionStorage.removeItem("pendingScrollText");
        setTimeout(() => scrollToTextOnPage(text), 150);
      }
    } catch {
      sessionStorage.removeItem("pendingScrollText");
    }
  }, [pathname]);

  return null;
}