import express from "express"
import { createFunko, getAllFunkos, getById } from "../controllers/funkoControllers.js"

const router = express.Router();

router.get("/", getAllFunkos);
router.get("/:id", getById);
router.post("/", createFunko)

export default router;