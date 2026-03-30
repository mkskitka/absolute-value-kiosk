"use client";

import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

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
