import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const login = (req, res) => {
  const { usuario, password } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE usuario=?",
    [usuario],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (!result || result.length === 0) {
        return res.status(401).json({ msg: "Usuario no existe" });
      }

      const user = result[0];

      if (password !== user.password) {
        return res.status(401).json({ msg: "Clave incorrecta" });
      }

      const token = jwt.sign(
        { id: user.id, rol: user.rol },
        "secreto123",
        { expiresIn: "1h" }
      );

      res.json({ token, user });
    }
  );
};

export const verifyToken = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) return res.status(403).json({ msg: "No token" });

  const token = auth.split(" ")[1];

  jwt.verify(token, "secreto123", (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Token inválido" });

    req.user = decoded;
    next();
  });
};

export const getSaldo = (req, res) => {
  db.query(
    "SELECT saldo FROM usuarios WHERE id=?",
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};
