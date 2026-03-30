import type { Metadata } from "next";
import { Press_Start_2P, VT323, Space_Grotesk } from "next/font/google";
import { GameProvider } from "./context/GameContext";
import IdleTimeoutWrapper from "./components/IdleTimeoutWrapper";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-retro",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Absolute Value | Kiosk",
  description:
    "Welcome to Absolute Value — an 8-bit retro kiosk experience. Create your player, order drinks, and shape the economy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${pressStart2P.variable} ${vt323.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-on-surface antialiased select-none">
        <GameProvider>
          <IdleTimeoutWrapper>{children}</IdleTimeoutWrapper>
        </GameProvider>
      </body>
    </html>
  );
}
