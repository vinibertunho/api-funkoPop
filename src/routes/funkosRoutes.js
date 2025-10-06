import express from "express"
import { getAllFunkos } from "../controllers/funkoControllers.js"

const router = express.Router();

router.get("/", getAllFunkos);

export default router;