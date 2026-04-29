import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { transferir, getHistorial } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/transferir", verifyToken, transferir);
router.get("/historial", verifyToken, getHistorial);

export default router;
