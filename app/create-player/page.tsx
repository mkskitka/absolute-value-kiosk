"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGame } from "../context/GameContext";
import type { FundChoice } from "../types";

export default function CreatePlayerPage() {
  const router = useRouter();
  const { setPlayerName, setFundChoice } = useGame();
  const [name, setName] = useState("");
  const [choice, setChoice] = useState<FundChoice>(null);

  function handleConfirm() {
    if (name.trim() === "") {
      alert("ACCESS DENIED: ENTER PLAYER NAME");
      return;
    }
    if (!choice) {
      alert("ACCESS DENIED: SELECT STARTING FUNDS");
      return;
    }
    setPlayerName(name.trim().toUpperCase());
    setFundChoice(choice);
    router.push("/drink-menu");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-retro uppercase">
      <main className="max-w-3xl w-full flex flex-col items-center space-y-12 py-8">
        <h1 className="text-5xl md:text-7xl text-center tracking-tighter">
          CREATE NEW PLAYER
        </h1>

        {/* Character + Name Row */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-48 h-48 pixel-border flex items-center justify-center shrink-0 bg-zinc-900 overflow-hidden">
            <Image
              src="/images/character.png"
              alt="Character"
              width={192}
              height={192}
              className="w-full h-full object-contain pixel-image"
              priority
            />
          </div>

          <div className="w-full space-y-4">
            <label className="text-3xl block border-b-4 border-white pb-1">
              ENTER NAME
            </label>
            <input
              id="player-name"
              type="text"
              placeholder="NAME..."
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              className="w-full bg-transparent border-4 border-white text-5xl p-4 focus:ring-4 focus:ring-primary focus:outline-none uppercase text-white"
            />
          </div>
        </div>

        {/* Starting Funds */}
        <div className="w-full space-y-8">
          <h2 className="text-4xl text-center border-b-4 border-white pb-2 inline-block mx-auto w-full">
            CHOOSE STARTING FUNDS
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {/* -500 (Lunder) */}
            <button
              id="btn-red"
              onClick={() => setChoice("lunder")}
              className={`option-button flex flex-col items-center p-6 border-4 border-secondary bg-transparent hover:bg-secondary/10 w-full md:w-72 space-y-4 ${
                choice === "lunder" ? "selected-red" : ""
              }`}
            >
              <span className="text-secondary text-5xl font-bold">-500$</span>
              <div className="w-28 h-28 border-2 border-secondary/40 flex items-center justify-center">
                <svg
                  className="w-20 h-20 stock-icon stroke-secondary"
                  viewBox="0 0 24 24"
                >
                  <path d="M2 6 L8 12 L14 8 L22 18 M16 18 H22 V12" />
                </svg>
              </div>
              <span className="text-secondary text-2xl leading-none">
                SPAWN IN
                <br />
                LUNDERWORLD
              </span>
            </button>

            {/* OR divider */}
            <div className="text-3xl border-4 border-white rounded-full w-14 h-14 flex items-center justify-center shrink-0 bg-black z-10">
              OR
            </div>

            {/* +500 (Leader) */}
            <button
              id="btn-green"
              onClick={() => setChoice("leader")}
              className={`option-button flex flex-col items-center p-6 border-4 border-primary bg-transparent hover:bg-primary/10 w-full md:w-72 space-y-4 ${
                choice === "leader" ? "selected-green" : ""
              }`}
            >
              <span className="text-primary text-5xl font-bold">+500$</span>
              <div className="w-28 h-28 border-2 border-primary/40 flex items-center justify-center">
                <svg
                  className="w-20 h-20 stock-icon stroke-primary"
                  viewBox="0 0 24 24"
                >
                  <path d="M2 18 L8 12 L14 16 L22 6 M16 6 H22 V12" />
                </svg>
              </div>
              <span className="text-primary text-2xl leading-none">
                SPAWN IN
                <br />
                LEADERWORLD
              </span>
            </button>
          </div>
        </div>

        {/* Confirm */}
        <div className="w-full pt-4 flex justify-center">
          <button
            onClick={handleConfirm}
            className="px-16 py-6 border-4 border-white bg-transparent hover:bg-white hover:text-black transition-all text-5xl active:translate-y-1"
          >
            CONFIRM
          </button>
        </div>
      </main>
    </div>
  );
}
