import { Router } from "express";
import FruitController from "../controllers/fruitController";

const router = Router();

router.get("/", FruitController.getAllFruits);
router.get("/summary", FruitController.getMarketSummary);
router.get("/:id", FruitController.getFruitById);
router.post("/", FruitController.createFruit);
router.put("/:id", FruitController.updateFruit);
router.delete("/:id", FruitController.deleteFruit);

export default router;
