// app.js
import express from "express";
import cors from "cors";

// rutas //ENZO elimina si hay de mas 
import usuariosRoutes from "./src/routes/usuarios.routes.js";

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json()); 
// 🔹 Ruta base
app.get("/", (req, res) => {
  res.send("API Banca Digital funcionando 🚀");
});


app.use("/api/usuarios", usuariosRoutes);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Error interno del servidor"
  });
});

export default app;