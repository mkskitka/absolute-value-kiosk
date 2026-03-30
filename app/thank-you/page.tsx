"use client";

import { useRouter } from "next/navigation";
import { useGame } from "../context/GameContext";
import CrtOverlay from "../components/CrtOverlay";

export default function ThankYouPage() {
  const router = useRouter();
  const { resetGame } = useGame();

  function handleReturn() {
    resetGame();
    router.push("/");
  }

  return (
    <>
      <CrtOverlay />

      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative font-body">
        <main className="w-full max-w-2xl flex flex-col items-center justify-center text-center space-y-16">
          {/* Title */}
          <header>
            <h1 className="text-3xl md:text-6xl font-black text-primary tracking-tighter uppercase leading-tight crt-glow mb-4 font-pixel">
              THANK YOU
            </h1>
            <div className="h-1 w-full bg-primary mt-4 opacity-20" />
          </header>

          {/* Steps */}
          <section className="space-y-6 w-full max-w-md">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-6 py-4 border-b border-outline-variant/30">
                <span className="text-primary font-black text-3xl">01</span>
                <span className="text-on-background font-pixel font-bold tracking-widest uppercase">
                  TAKE YOUR GLASS
                </span>
              </div>
              <div className="flex items-center space-x-6 py-4 border-b border-outline-variant/30">
                <span className="text-primary font-black text-3xl">02</span>
                <span className="text-on-background font-pixel font-bold tracking-widest uppercase">
                  ADD ICE
                </span>
              </div>
              <div className="flex items-center space-x-6 py-4 border-b border-outline-variant/30">
                <span className="text-primary font-black text-3xl">03</span>
                <span className="text-on-background font-pixel font-bold tracking-widest uppercase">
                  PUT IT ON THE BARBOT
                </span>
              </div>
            </div>
          </section>

          {/* Return Button */}
          <footer className="pt-8 w-full">
            <button
              onClick={handleReturn}
              className="w-full py-6 bg-primary text-black font-black font-pixel tracking-[0.2em] uppercase hover:bg-primary-container active:scale-95 transition-all duration-75 border-none cursor-pointer"
            >
              RETURN TO START
            </button>
          </footer>
        </main>

        {/* Background glow */}
        <div className="fixed -bottom-64 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      </div>
    </>
  );
}
