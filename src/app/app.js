const express = require("express");
const router = express.Router();

const {
  login,
  verifyToken,
  getSaldo,
  transferir
} = require("../controllers/userController");

router.post("/login", login); 

module.exports = router;