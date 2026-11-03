import { Request, Response } from "express";
import { BloxFruit, FruitRarity } from "../types/fruit";

let dataFruits: BloxFruit[] = [
  {
    id: 1,
    name: "Kitsune",
    rarity: "Mythical",
    beliPrice: 8000000,
    tradingValue: 660000000,
    demandRating: 10,
    status: "High Demand",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "West Dragon",
    rarity: "Mythical",
    beliPrice: 15000000,
    tradingValue: 5660000000,
    demandRating: 10,
    status: "High Demand",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Leopard",
    rarity: "Mythical",
    beliPrice: 5000000,
    tradingValue: 430000000,
    demandRating: 9,
    status: "Stable",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Dough",
    rarity: "Mythical",
    beliPrice: 2800000,
    tradingValue: 380000000,
    demandRating: 9,
    status: "Stable",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Buddha",
    rarity: "Legendary",
    beliPrice: 1200000,
    tradingValue: 7000000,
    demandRating: 8,
    status: "Stable",
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Gas",
    rarity: "Legendary",
    beliPrice: 3200000,
    tradingValue: 60000000,
    demandRating: 8,
    status: "Stable",
    createdAt: new Date().toISOString(),
  }
];

export class FruitController {
  getAllFruits = async (req: Request, res: Response) => {
    return res.status(200).json({
      status: true,
      message: "Get All Fruits Success",
      data: { totalItems: dataFruits.length, fruits: dataFruits },
    });
  };

  getFruitById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const fruit = dataFruits.find((f) => f.id === id);
    
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ status: false, message: "ID buah tidak valid" });
    } else if (!fruit) {
      return res.status(404).json({ status: false, message: `Buah dengan ID ${id} tidak ditemukan` });
    } else {
      return res.status(200).json({ status: true, message: "Get Fruit Success", data: { fruit } });
    }
  };

  createFruit = async (req: Request, res: Response) => {
    const { name, rarity, beliPrice, tradingValue, demandRating, status } = req.body;
    
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ status: false, message: "Nama buah wajib diisi" });
    }
    
    const validRarities: FruitRarity[] = ["Common", "Uncommon", "Rare", "Legendary", "Mythical"];
    if (!validRarities.includes(rarity)) {
      return res.status(400).json({ status: false, message: "Rarity tidak valid" });
    }
    
    if (typeof beliPrice !== "number" || beliPrice < 0 || typeof tradingValue !== "number" || tradingValue < 0) {
      return res.status(400).json({ status: false, message: "Harga beli dan nilai trading harus berupa angka positif" });
    }
    
    if (typeof demandRating !== "number" || demandRating < 1 || demandRating > 10) {
      return res.status(400).json({ status: false, message: "Demand rating harus berupa angka dari 1 sampai 10" });
    }
    
    if (!["High Demand", "Stable", "Fading"].includes(status)) {
      return res.status(400).json({ status: false, message: "Status tren tidak valid" });
    }

    const newId = dataFruits.length > 0 ? Math.max(...dataFruits.map((f) => f.id)) + 1 : 1;
    const newFruit: BloxFruit = { 
      id: newId, 
      name: name.trim(), 
      rarity, 
      beliPrice, 
      tradingValue, 
      demandRating, 
      status, 
      createdAt: new Date().toISOString() 
    };
    
    dataFruits.push(newFruit);
    return res.status(201).json({ status: true, message: "Create Fruit Card Success", data: { fruit: newFruit } });
  };

  updateFruit = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const fruit = dataFruits.find((f) => f.id === id);

    if (!Number.isInteger(id) || id <= 0 || !fruit) {
      return res.status(404).json({ status: false, message: "Data buah tidak ditemukan" });
    } else {
      const { name, rarity, beliPrice, tradingValue, demandRating, status } = req.body;
      
      if (name !== undefined) fruit.name = name.trim();
      if (rarity !== undefined) fruit.rarity = rarity;
      if (beliPrice !== undefined) fruit.beliPrice = beliPrice;
      if (tradingValue !== undefined) fruit.tradingValue = tradingValue;
      if (demandRating !== undefined) fruit.demandRating = demandRating;
      if (status !== undefined) fruit.status = status;

      return res.status(200).json({ status: true, message: "Update Fruit Card Success", data: { fruit } });
    }
  };

  deleteFruit = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = dataFruits.findIndex((f) => f.id === id);

    if (index === -1) {
      return res.status(404).json({ status: false, message: "Data buah tidak ditemukan" });
    } else {
      const deletedFruit = dataFruits.splice(index, 1)[0];
      return res.status(200).json({ status: true, message: "Delete Fruit Card Success", data: { fruit: deletedFruit } });
    }
  };

  getMarketSummary = async (req: Request, res: Response) => {
    const totalMarketTradingValue = dataFruits.reduce((total, f) => total + f.tradingValue, 0);
    const highDemandCount = dataFruits.filter((f) => f.status === "High Demand").length;
    const mythicalCount = dataFruits.filter((f) => f.rarity === "Mythical").length;

    return res.status(200).json({
      status: true,
      message: "Get Market Summary Success",
      data: { totalFruitsConfigured: dataFruits.length, totalMarketTradingValue, highDemandCount, mythicalCount },
    });
  };
}

export default new FruitController();