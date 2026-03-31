"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "./context/GameContext";
import { useMenuEvents } from "./hooks/useMenuEvents";
import { API_BASE_URL } from "./types";

export default function WelcomePage() {
  const router = useRouter();
  const { setPlayerName, setRfid, setUserId, setCurrentFunds, resetGame } =
    useGame();

  const onTokenRead = useCallback(
    async (rfid: string) => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/rfidInfo/${rfid}`);
        if (res.ok) {
          const user = await res.json();
          // Known user — populate context and go to drink menu
          setRfid(rfid);
          setUserId(user.id);
          setPlayerName(user.username);
          setCurrentFunds(user.credits);
          router.push("/drink-menu");
        } else {
          // Unknown card — go to registration
          setRfid(rfid);
          router.push("/create-player");
        }
      } catch (err) {
        console.error("[RFID] Failed to look up user:", err);
      }
    },
    [setRfid, setUserId, setPlayerName, setCurrentFunds, router]
  );

  const onTokenRemoved = useCallback(() => {
    resetGame();
    router.push("/");
  }, [resetGame, router]);

  useMenuEvents({ onTokenRead, onTokenRemoved });

  return (
    <main
      className="flex flex-col items-center justify-center text-center p-6 w-full min-h-screen cursor-pointer"
      onClick={() => router.push("/create-player")}
    >
      {/* Welcome To */}
      <p className="font-retro text-sm md:text-xl text-white mb-6 tracking-wider uppercase">
        Welcome To
      </p>

      {/* Absolute Value */}
      <h1 className="text-3xl md:text-6xl font-black text-primary tracking-tighter uppercase leading-tight crt-glow mb-16 font-pixel">
        Ab$olute Value
      </h1>

      {/* Instruction */}
      <div className="flex flex-col items-center gap-8">
        <p className="font-pixel text-[10px] md:text-base leading-relaxed tracking-[0.2em] text-white uppercase max-w-lg">
          PLACE DRINK BELOW
          <br className="md:hidden" /> TO ORDER
        </p>

        {/* Animated chevrons */}
        <div className="flex flex-col items-center gap-4 mt-4">
          <span className="material-symbols-outlined text-primary text-5xl md:text-7xl animate-bounce">
            keyboard_double_arrow_down
          </span>
        </div>
      </div>
    </main>
  );
}

