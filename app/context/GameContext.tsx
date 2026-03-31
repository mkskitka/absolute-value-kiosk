"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Drink, FundChoice, EconomyChoice, GameState } from "../types";

interface GameContextValue extends GameState {
  setPlayerName: (name: string) => void;
  setRfid: (rfid: string | null) => void;
  setUserId: (id: string | null) => void;
  setFundChoice: (choice: FundChoice) => void;
  setCurrentFunds: (funds: number) => void;
  setSelectedDrink: (drink: Drink | null) => void;
  setEconomyChoice: (choice: EconomyChoice | null) => void;
  resetGame: () => void;
}

const initialState: GameState = {
  playerName: "",
  rfid: null,
  userId: null,
  fundChoice: null,
  currentFunds: 0,
  selectedDrink: null,
  economyChoice: null,
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialState);

  const setPlayerName = useCallback(
    (name: string) => setState((prev) => ({ ...prev, playerName: name })),
    []
  );

  const setRfid = useCallback(
    (rfid: string | null) => setState((prev) => ({ ...prev, rfid })),
    []
  );

  const setUserId = useCallback(
    (id: string | null) => setState((prev) => ({ ...prev, userId: id })),
    []
  );

  const setFundChoice = useCallback(
    (choice: FundChoice) =>
      setState((prev) => ({
        ...prev,
        fundChoice: choice,
        currentFunds: choice === "leader" ? 500 : choice === "lunder" ? -500 : 0,
      })),
    []
  );

  const setCurrentFunds = useCallback(
    (funds: number) => setState((prev) => ({ ...prev, currentFunds: funds })),
    []
  );

  const setSelectedDrink = useCallback(
    (drink: Drink | null) =>
      setState((prev) => ({ ...prev, selectedDrink: drink })),
    []
  );

  const setEconomyChoice = useCallback(
    (choice: EconomyChoice | null) =>
      setState((prev) => ({ ...prev, economyChoice: choice })),
    []
  );

  const resetGame = useCallback(() => setState(initialState), []);

  return (
    <GameContext.Provider
      value={{
        ...state,
        setPlayerName,
        setRfid,
        setUserId,
        setFundChoice,
        setCurrentFunds,
        setSelectedDrink,
        setEconomyChoice,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return ctx;
}
