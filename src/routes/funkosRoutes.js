import express from "express"
import { getAllFunkos, getById } from "../controllers/funkoControllers.js"

const router = express.Router();

router.get("/", getAllFunkos);
router.get("/:id", getById);


export default router;