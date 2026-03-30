"use client";

import { useRouter } from "next/navigation";
import { useGame } from "../context/GameContext";
import type { EconomyChoice } from "../types";

export default function ChangeEconomyPage() {
  const router = useRouter();
  const { setEconomyChoice } = useGame();

  function handleChoice(choice: EconomyChoice) {
    setEconomyChoice(choice);
    router.push("/thank-you");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-12 font-retro uppercase tracking-wider">
      <main className="w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-12">
        {/* Header */}
        <section className="w-full max-w-5xl mb-8 md:mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl tracking-widest mb-4 md:mb-6 leading-tight">
            YOU ARE CURRENTLY ON THE LEADERBOARD
          </h1>
          <p className="text-xl md:text-2xl text-white opacity-70 tracking-[0.2em] md:tracking-[0.3em]">
            CHOOSE 1:
          </p>
        </section>

        {/* Two-column choice */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative items-stretch">
          {/* OR divider (desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-black border-2 border-white items-center justify-center text-xl md:text-2xl font-bold">
            OR
          </div>

          {/* Leader — Wages */}
          <div className="bg-black p-6 md:p-10 border-2 border-white relative flex flex-col">
            <div className="absolute -top-4 md:-top-6 left-4 bg-neon-green text-black px-3 py-0.5 md:px-4 md:py-1 text-lg md:text-xl font-bold italic">
              ZONE: LEADER
            </div>
            <h2 className="text-4xl md:text-6xl text-neon-green text-glow-green mb-8 md:mb-16 text-center tracking-tighter">
              WAGES
            </h2>
            <div className="flex flex-col gap-4 md:gap-8 flex-1 justify-center">
              <button
                onClick={() =>
                  handleChoice({ zone: "leader", action: "raise" })
                }
                className="active-interaction flex flex-col items-center justify-center py-6 md:py-10 bg-neon-green text-black text-3xl md:text-4xl font-bold pixel-border-green border-2 border-neon-green"
              >
                <span
                  className="material-symbols-outlined text-5xl md:text-6xl mb-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  keyboard_double_arrow_up
                </span>
                RAISE
              </button>
              <button
                onClick={() =>
                  handleChoice({ zone: "leader", action: "lower" })
                }
                className="active-interaction flex flex-col items-center justify-center py-6 md:py-10 bg-transparent text-neon-green text-3xl md:text-4xl font-bold pixel-border-green border-2 border-neon-green hover:bg-neon-green hover:text-black transition-colors"
              >
                <span className="material-symbols-outlined text-5xl md:text-6xl mb-1">
                  keyboard_double_arrow_down
                </span>
                LOWER
              </button>
            </div>
          </div>

          {/* OR divider (mobile) */}
          <div className="md:hidden flex items-center justify-center py-2">
            <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-lg font-bold">
              OR
            </div>
          </div>

          {/* Lunder — Drink Prices */}
          <div className="bg-black p-6 md:p-10 border-2 border-white relative flex flex-col">
            <div className="absolute -top-4 md:-top-6 left-4 bg-neon-red text-black px-3 py-0.5 md:px-4 md:py-1 text-lg md:text-xl font-bold italic">
              ZONE: LUNDER
            </div>
            <h2 className="text-4xl md:text-6xl text-neon-red text-glow-red mb-8 md:mb-16 text-center tracking-tighter">
              DRINK PRICES
            </h2>
            <div className="flex flex-col gap-4 md:gap-8 flex-1 justify-center">
              <button
                onClick={() =>
                  handleChoice({ zone: "lunder", action: "raise" })
                }
                className="active-interaction flex flex-col items-center justify-center py-6 md:py-10 bg-neon-red text-black text-3xl md:text-4xl font-bold pixel-border-red border-2 border-neon-red"
              >
                <span
                  className="material-symbols-outlined text-5xl md:text-6xl mb-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  keyboard_double_arrow_up
                </span>
                RAISE
              </button>
              <button
                onClick={() =>
                  handleChoice({ zone: "lunder", action: "lower" })
                }
                className="active-interaction flex flex-col items-center justify-center py-6 md:py-10 bg-transparent text-neon-red text-3xl md:text-4xl font-bold pixel-border-red border-2 border-neon-red hover:bg-neon-red hover:text-black transition-colors"
              >
                <span className="material-symbols-outlined text-5xl md:text-6xl mb-1">
                  keyboard_double_arrow_down
                </span>
                LOWER
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
