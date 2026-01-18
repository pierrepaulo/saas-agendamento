"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function getTargetId(href: string, pathname: string) {
  if (href.startsWith("#")) {
    return href.slice(1) || null;
  }

  if (href.startsWith("/#")) {
    return href.slice(2) || null;
  }

  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    return null;
  }

  const path = href.slice(0, hashIndex);
  const hash = href.slice(hashIndex + 1);

  if (path && path !== pathname) {
    return null;
  }

  return hash || null;
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");
      if (!anchor || anchor.getAttribute("target") === "_blank") {
        return;
      }

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      const targetId = getTargetId(href, pathname);
      if (!targetId) {
        return;
      }

      const section = document.getElementById(targetId);
      if (!section) {
        return;
      }

      event.preventDefault();

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      section.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });

      window.history.pushState(null, "", `#${targetId}`);
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname]);

  return null;
}
