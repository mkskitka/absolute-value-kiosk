"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGame } from "../context/GameContext";
import { API_BASE_URL, type Drink } from "../types";

/* Neon palette cycled per drink index for visual flair */
const NEON_COLORS = [
  "#FF3131",
  "#00D1FF",
  "#FF00FF",
  "#FFFF00",
  "#00FFFF",
  "#FF6B00",
  "#39FF14",
  "#BF00FF",
];

function drinkColor(index: number): string {
  return NEON_COLORS[index % NEON_COLORS.length];
}

function ingredientNames(drink: Drink): string[] {
  return drink.parts.map((p) => p.ingredient.name);
}

export default function DrinkMenuPage() {
  const router = useRouter();
  const { playerName, currentFunds, userId, setSelectedDrink, setCurrentFunds } =
    useGame();
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [rankInfo, setRankInfo] = useState<{ rank: number; total: number; isLeaderboard: boolean; maxScore: number; minScore: number; myScore: number } | null>(null);

  useEffect(() => {
    async function fetchDrinks() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/drinks`);
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const data: Drink[] = await res.json();
        setDrinks(data);
      } catch (err) {
        console.error("Failed to fetch drinks:", err);
        setError("Could not load the drink menu. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchDrinks();
  }, []);

  useEffect(() => {
    async function fetchRankInfo() {
      try {
        if (!userId) return;
        const res = await fetch(`${API_BASE_URL}/api/users`);
        if (!res.ok) return;
        const data = await res.json();
        
        let maxScore = 2000;
        let minScore = -200;
        if (data.length > 0) {
          const scores = data.map((u: any) => u.credits);
          maxScore = Math.max(...scores, 100);
          minScore = Math.min(...scores, -100);
        }

        const me = data.find((u: any) => u.id === userId);
        if (!me) return;

        const isLeaderboard = me.credits >= 0;
        let myRank = -1;
        if (isLeaderboard) {
          const leaderboard = data.filter((u: any) => u.credits >= 0).sort((a: any, b: any) => b.credits - a.credits);
          myRank = leaderboard.findIndex((u: any) => u.id === userId) + 1;
        } else {
          const lunderboard = data.filter((u: any) => u.credits < 0).sort((a: any, b: any) => a.credits - b.credits);
          myRank = lunderboard.findIndex((u: any) => u.id === userId) + 1;
        }

        setRankInfo({ 
          rank: myRank, 
          total: data.length, 
          isLeaderboard,
          maxScore,
          minScore,
          myScore: me.credits
        });

      } catch (err) {
        console.error("Failed to fetch rank info:", err);
      }
    }
    fetchRankInfo();
  }, [userId]);


  const selectedDrink = selectedIndex >= 0 ? drinks[selectedIndex] : null;
  const drinkCost = selectedDrink?.price ?? 0;
  const balance = currentFunds - drinkCost;
  const selectedColor = selectedIndex >= 0 ? drinkColor(selectedIndex) : "#FFF";

  let markerTop = "50%";
  if (rankInfo) {
    const range = rankInfo.maxScore - rankInfo.minScore;
    if (range > 0) {
      const ratio = (rankInfo.maxScore - rankInfo.myScore) / range;
      markerTop = `${Math.max(0, Math.min(100, ratio * 100))}%`;
    }
  }

  async function handleOrder() {
    if (!selectedDrink || isOrdering) return;
    setIsOrdering(true);

    try {
      // Queue the drink on the server if we have a userId
      if (userId) {
        const orderRes = await fetch(`${API_BASE_URL}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            drinkId: selectedDrink.id,
          }),
        });

        if (!orderRes.ok) {
          const err = await orderRes.json().catch(() => ({}));
          console.error("[DrinkMenu] Failed to queue drink:", err);
          // If they already have a queued drink (409), continue anyway
          if (orderRes.status !== 409) {
            alert("SYSTEM ERROR: COULD NOT QUEUE DRINK. TRY AGAIN.");
            setIsOrdering(false);
            return;
          }
        }
      }

      // Update local state — deduct cost locally for display
      setSelectedDrink(selectedDrink);
      setCurrentFunds(balance);

      try {
        const usersRes = await fetch(`${API_BASE_URL}/api/users`);
        if (usersRes.ok) {
          const users = await usersRes.json();
          const me = users.find((u: any) => u.id === userId);
          if (me) {
            const isLeaderboard = me.credits >= 0;
            let myRank = -1;
            if (isLeaderboard) {
              const leaderboard = users.filter((u: any) => u.credits >= 0).sort((a: any, b: any) => b.credits - a.credits);
              myRank = leaderboard.findIndex((u: any) => u.id === userId) + 1;
            } else {
              const lunderboard = users.filter((u: any) => u.credits < 0).sort((a: any, b: any) => a.credits - b.credits);
              myRank = lunderboard.findIndex((u: any) => u.id === userId) + 1;
            }
            if (myRank >= 1 && myRank <= 3) {
              router.push("/change-economy");
              return;
            }
          }
        }
      } catch (err) {
        console.error("Failed to check rank for economy routing:", err);
      }
      
      router.push("/thank-you");
    } catch (err) {
      console.error("[DrinkMenu] Order failed:", err);
      alert("SYSTEM ERROR: COULD NOT PLACE ORDER. TRY AGAIN.");
      setIsOrdering(false);
    }
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
                <div className="text-xl mb-2">{rankInfo?.maxScore ?? 2000}</div>
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
                    className="absolute transition-all duration-1000 ease-in-out"
                    style={{ top: markerTop, left: 0 }}
                  >
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-neon-green absolute right-full top-1/2 -translate-y-1/2 mr-2" />
                    <div className="whitespace-nowrap ml-4 text-xl text-neon-green bg-black/50 px-2 rounded">
                      #{rankInfo?.rank ?? "?"}
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
                <div className="text-xl mt-2">{rankInfo?.minScore ?? -200}</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-7xl text-neon-green text-glow-green">
                  #{rankInfo?.rank ?? "?"}
                </div>
                {rankInfo && (
                  <div className={`mt-2 text-xl font-bold tracking-widest ${rankInfo.isLeaderboard ? 'text-neon-green' : 'text-neon-red'}`}>
                    {rankInfo.isLeaderboard ? 'LEADERBOARD' : 'LUNDERBOARD'}
                  </div>
                )}
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

            {loading && (
              <div className="text-2xl text-white/60 text-center py-12 animate-pulse">
                Loading menu...
              </div>
            )}

            {error && (
              <div className="text-2xl text-neon-red text-center py-12">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 max-h-[300px] overflow-y-auto custom-scrollbar border-b-2 border-white pb-[2px]">
                {drinks.map((drink, index) => {
                  const isActive = selectedIndex === index;
                  const color = drinkColor(index);
                  const borderColor = isActive ? color : "#FFFFFF";
                  const textColor = isActive ? color : "#FFFFFF";
                  const glow = isActive
                    ? `0 0 15px ${color}`
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
                        {drink.name}
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
            )}
          </section>

          {/* Selected drink detail */}
          {selectedDrink && (
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="flex flex-row items-start justify-center gap-8 w-full">
                <div
                  className="w-48 h-48 border-4 flex items-center justify-center overflow-hidden transition-all duration-300 shrink-0"
                  style={{
                    backgroundColor: selectedColor,
                    borderColor: selectedColor,
                    boxShadow: `0 0 20px ${selectedColor}88`,
                  }}
                >
                  {selectedDrink.imageURL ? (
                    <img
                      src={selectedDrink.imageURL}
                      alt={selectedDrink.name}
                      className="w-full h-full object-cover pixel-image"
                    />
                  ) : (
                    <Image
                      src="/images/drink.png"
                      alt="Drink Preview"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover pixel-image"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-2 min-w-[150px]">
                  <h3 className="text-2xl border-b border-white/30 pb-1">
                    Ingredients:
                  </h3>
                  <ul className="text-xl space-y-1 text-white/80">
                    {ingredientNames(selectedDrink).map((ing) => (
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
