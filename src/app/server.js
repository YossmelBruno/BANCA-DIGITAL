import express from "express";
import cors from "cors";
import db from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001 ");
});