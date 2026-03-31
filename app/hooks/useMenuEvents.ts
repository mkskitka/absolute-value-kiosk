"use client";

import { useEffect, useRef } from "react";
import { API_BASE_URL } from "../types";

const MENU_ID = process.env.NEXT_PUBLIC_MENU_ID ?? "";

export type MenuEventHandlers = {
  onTokenRead?: (rfid: string) => void;
  onTokenRemoved?: () => void;
};

/**
 * Subscribes to the server's SSE stream for RFID events on this kiosk's
 * assigned menu station.  Auto-reconnects on error (native EventSource
 * behaviour).  Cleans up on unmount.
 */
export function useMenuEvents(handlers: MenuEventHandlers) {
  // Stable ref so the effect doesn't re-run when handler identities change
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    if (!MENU_ID) {
      console.warn(
        "useMenuEvents: NEXT_PUBLIC_MENU_ID is not set — RFID events disabled"
      );
      return;
    }

    const url = `${API_BASE_URL}/api/menu/${MENU_ID}/events`;
    console.log(`[SSE] Connecting to ${url}`);

    const es = new EventSource(url);

    es.onopen = () => {
      console.log("[SSE] Connected");
    };

    es.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data);
        console.log("[SSE] Event:", event);

        if (event.type === "TOKEN_READ" && event.rfid) {
          handlersRef.current.onTokenRead?.(event.rfid);
        } else if (event.type === "TOKEN_REMOVED") {
          handlersRef.current.onTokenRemoved?.();
        }
      } catch (err) {
        console.error("[SSE] Failed to parse event:", err);
      }
    };

    es.onerror = () => {
      console.warn("[SSE] Connection error — will auto-reconnect");
    };

    return () => {
      console.log("[SSE] Closing connection");
      es.close();
    };
  }, []); // only mount/unmount — MENU_ID is a build-time constant
}
