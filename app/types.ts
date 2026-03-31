export interface DrinkPart {
  id: string;
  amount: number;
  ingredient: {
    id: string;
    name: string;
  };
}

export interface Drink {
  id: string;
  name: string;
  price: number;
  imageURL: string | null;
  parts: DrinkPart[];
}

export type FundChoice = "leader" | "lunder" | null;

export interface EconomyChoice {
  zone: "leader" | "lunder";
  action: "raise" | "lower";
}

export interface GameState {
  playerName: string;
  rfid: string | null;
  userId: string | null;
  fundChoice: FundChoice;
  currentFunds: number;
  selectedDrink: Drink | null;
  economyChoice: EconomyChoice | null;
}

export const IDLE_TIMEOUT_MS = 200_000;
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.1.38:3000";
