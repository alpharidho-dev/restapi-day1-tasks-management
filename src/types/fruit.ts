export type FruitRarity = "Common" | "Uncommon" | "Rare" | "Legendary" | "Mythical";

export interface BloxFruit {
  id: number;
  name: string;
  rarity: FruitRarity;
  beliPrice: number;
  tradingValue: number;
  demandRating: number;
  status: "High Demand" | "Stable" | "Fading";
  createdAt: string;
}
