"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IDLE_TIMEOUT_MS } from "../types";

/**
 * Hook that resets the kiosk to the welcome screen after `timeoutMs`
 * of user inactivity. Listens for pointer / keyboard / touch events
 * and resets the countdown on every interaction.
 *
 * Disabled on the welcome screen itself (pathname === "/").
 */
export function useIdleTimeout(
  onTimeout?: () => void,
  timeoutMs: number = IDLE_TIMEOUT_MS
) {
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onTimeout?.();
      router.push("/");
    }, timeoutMs);
  }, [onTimeout, router, timeoutMs]);

  useEffect(() => {
    // Don't run on the welcome screen
    if (pathname === "/") return;

    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "pointermove",
      "keydown",
      "touchstart",
      "scroll",
    ];

    const handler = () => reset();

    events.forEach((evt) => window.addEventListener(evt, handler, { passive: true }));
    reset(); // start initial countdown

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((evt) => window.removeEventListener(evt, handler));
    };
  }, [pathname, reset]);
}
