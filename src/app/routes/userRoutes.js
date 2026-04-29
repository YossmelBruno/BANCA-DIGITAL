const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { getSaldo } = require("../controllers/userController");

router.get("/saldo", verifyToken, getSaldo);

module.exports = router;