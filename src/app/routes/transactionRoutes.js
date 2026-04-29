const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { transferir, getHistorial } = require("../controllers/transactionController");

router.post("/transferir", verifyToken, transferir);
router.get("/historial", verifyToken, getHistorial);

module.exports = router;