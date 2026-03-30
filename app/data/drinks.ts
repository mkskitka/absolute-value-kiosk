import { Drink } from "../types";

export const drinks: Drink[] = [
  {
    id: 0,
    name: "Vibez",
    base: "Gin",
    price: 50,
    color: "#FF3131",
    ingredients: ["London Dry Gin", "Tonic Water", "Lime Zest", "Neon Syrup"],
  },
  {
    id: 1,
    name: "Sunrise",
    base: "Tequila",
    price: 65,
    color: "#00D1FF",
    ingredients: [
      "Blanco Tequila",
      "Orange Juice",
      "Grenadine",
      "Maraschino Cherry",
    ],
  },
  {
    id: 2,
    name: "Fizz",
    base: "Gin",
    price: 45,
    color: "#FF00FF",
    ingredients: ["Gin", "Egg White", "Lemon Juice", "Soda Water"],
  },
  {
    id: 3,
    name: "Juicy",
    base: "NA",
    price: 20,
    color: "#FFFF00",
    ingredients: ["Pineapple Juice", "Mango Puree", "Coconut Milk"],
  },
  {
    id: 4,
    name: "Glo",
    base: "Vodka",
    price: 55,
    color: "#00FFFF",
    ingredients: [
      "Premium Vodka",
      "Blue Curacao",
      "Lemonade",
      "Edible Glitter",
    ],
  },
];
