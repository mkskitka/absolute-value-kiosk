"use client";

import { useGame } from "../context/GameContext";
import { useIdleTimeout } from "../hooks/useIdleTimeout";
import type { ReactNode } from "react";

/**
 * Wrapper that provides idle-timeout + game-reset behavior
 * to all kiosk pages. Placed inside the GameProvider in layout.
 */
export default function IdleTimeoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { resetGame } = useGame();
  useIdleTimeout(resetGame);
  return <>{children}</>;
}
