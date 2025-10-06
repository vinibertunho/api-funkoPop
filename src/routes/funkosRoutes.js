import express from "express";
import {
  createFunko,
  deleteFunko,
  getAllFunkos,
  getById,
  updateFunkos,
} from "../controllers/funkoControllers.js";

const router = express.Router();

router.get("/", getAllFunkos);
router.get("/:id", getById);
router.post("/", createFunko);
router.delete("/:id", deleteFunko);
router.put("/:id", updateFunkos);

export default router;
