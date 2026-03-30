export interface Drink {
  id: number;
  name: string;
  base: string;
  price: number;
  color: string;
  ingredients: string[];
}

export type FundChoice = "leader" | "lunder" | null;

export interface EconomyChoice {
  zone: "leader" | "lunder";
  action: "raise" | "lower";
}

export interface GameState {
  playerName: string;
  fundChoice: FundChoice;
  currentFunds: number;
  selectedDrink: Drink | null;
  economyChoice: EconomyChoice | null;
}

export const IDLE_TIMEOUT_MS = 20_000;
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.1.38:3000";
