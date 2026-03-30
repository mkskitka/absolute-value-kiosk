"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGame } from "../context/GameContext";
import { drinks } from "../data/drinks";

export default function DrinkMenuPage() {
  const router = useRouter();
  const { playerName, currentFunds, setSelectedDrink } = useGame();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const selectedDrink = selectedIndex >= 0 ? drinks[selectedIndex] : null;
  const drinkCost = selectedDrink?.price ?? 0;
  const balance = currentFunds - drinkCost;

  function handleOrder() {
    if (!selectedDrink) return;
    setSelectedDrink(selectedDrink);
    router.push("/change-economy");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 font-retro uppercase tracking-wider">
      <h1 className="text-5xl md:text-7xl text-center mb-12">ORDER DRINK</h1>

      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column — Player Info + Rank */}
        <div className="flex flex-col gap-12">
          {/* Player info */}
          <section className="flex flex-col gap-4 border-l-4 border-white pl-6">
            <div className="flex flex-col">
              <span className="text-xl opacity-70">Player :</span>
              <span className="text-5xl">
                {playerName || "UNKNOWN"}
              </span>
            </div>
            <div className="space-y-2 mt-4 text-3xl">
              <div className="flex justify-between">
                <span>Funds :</span>
                <span className="text-neon-green text-glow-green">
                  {currentFunds}$
                </span>
              </div>
              <div
                className={`flex justify-between ${
                  selectedDrink ? "" : "invisible"
                }`}
              >
                <span>Drink Cost :</span>
                <span className="text-neon-red text-glow-red">
                  -${drinkCost}
                </span>
              </div>
              <div className="w-full h-px bg-white my-2" />
              <div className="flex justify-between">
                <span>Balance :</span>
                <span className="text-neon-green text-glow-green">
                  {balance}$
                </span>
              </div>
            </div>
          </section>

          {/* Player rank */}
          <section className="flex flex-col gap-6">
            <h2 className="text-3xl tracking-widest border-b border-white pb-2 w-fit">
              Player Rank
            </h2>
            <div className="flex items-start gap-8 py-4">
              <div className="flex flex-col items-center">
                <div className="text-xl mb-2">2000</div>
                <div className="relative h-64" style={{ width: 2, background: "#fff" }}>
                  {/* Top tick */}
                  <div
                    className="absolute"
                    style={{
                      top: 0,
                      left: -10,
                      width: 20,
                      height: 2,
                      background: "#fff",
                    }}
                  />
                  {/* Rank marker */}
                  <div
                    className="absolute"
                    style={{ top: "15%", left: 0 }}
                  >
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-neon-green absolute right-full top-1/2 -translate-y-1/2 mr-2" />
                    <div className="whitespace-nowrap ml-4 text-xl text-neon-green">
                      #20
                    </div>
                  </div>
                  {/* Bottom tick */}
                  <div
                    className="absolute"
                    style={{
                      bottom: 0,
                      left: -10,
                      width: 20,
                      height: 2,
                      background: "#fff",
                    }}
                  />
                </div>
                <div className="text-xl mt-2">-200</div>
              </div>
              <div className="text-7xl text-neon-green text-glow-green self-center">
                #20
              </div>
            </div>
          </section>
        </div>

        {/* Right Column — Menu + Selection */}
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-5xl mb-6 border-b-2 border-white pb-2 text-center md:text-left">
              Drink Menu
            </h2>
            <div className="grid grid-cols-1 max-h-[300px] overflow-y-auto custom-scrollbar border-b-2 border-white pb-[2px]">
              {drinks.map((drink, index) => {
                const isActive = selectedIndex === index;
                const borderColor = isActive ? drink.color : "#FFFFFF";
                const textColor = isActive ? drink.color : "#FFFFFF";
                const glow = isActive
                  ? `0 0 15px ${drink.color}`
                  : undefined;

                return (
                  <div
                    key={drink.id}
                    onClick={() => setSelectedIndex(index)}
                    className={`drink-item flex justify-between items-center p-4 cursor-pointer hover:bg-zinc-900 ${
                      isActive ? "active" : ""
                    }`}
                    style={{
                      borderColor,
                      boxShadow: glow,
                    }}
                  >
                    <span
                      className="text-2xl transition-colors"
                      style={{ color: textColor }}
                    >
                      {drink.name} | {drink.base}
                    </span>
                    <span
                      className="text-2xl transition-colors"
                      style={{ color: textColor }}
                    >
                      ${drink.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Selected drink detail */}
          {selectedDrink && (
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="flex flex-row items-start justify-center gap-8 w-full">
                <div
                  className="w-48 h-48 border-4 flex items-center justify-center overflow-hidden transition-all duration-300 shrink-0"
                  style={{
                    backgroundColor: selectedDrink.color,
                    borderColor: selectedDrink.color,
                    boxShadow: `0 0 20px ${selectedDrink.color}88`,
                  }}
                >
                  <Image
                    src="/images/drink.png"
                    alt="Drink Preview"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover pixel-image"
                  />
                </div>

                <div className="flex flex-col gap-2 min-w-[150px]">
                  <h3 className="text-2xl border-b border-white/30 pb-1">
                    Ingredients:
                  </h3>
                  <ul className="text-xl space-y-1 text-white/80">
                    {selectedDrink.ingredients.map((ing) => (
                      <li key={ing}>- {ing}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={handleOrder}
                className="w-full py-6 border-4 border-white bg-transparent hover:bg-white hover:text-black transition-all text-4xl active:scale-95"
              >
                ORDER {selectedDrink.name} FOR ${selectedDrink.price}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
