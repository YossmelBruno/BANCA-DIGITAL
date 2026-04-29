import express from "express";
import { login, verifyToken, getSaldo } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);
router.get("/saldo", getSaldo);

export default router;
