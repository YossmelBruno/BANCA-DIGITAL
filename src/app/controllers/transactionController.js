import db from "../config/db.js";

export const transferir = (req, res) => {
  const { monto } = req.body;
  // Usar un id fijo para pruebas (usuario 1)
  const id = 1;

  db.query(
    "UPDATE usuarios SET saldo = saldo - ? WHERE id=?",
    [monto, id],
    (err) => {
      if (err) return res.status(500).json(err);

      db.query(
        "INSERT INTO transacciones (usuario_id, tipo, monto, fecha) VALUES (?, 'retiro', ?, NOW())",
        [id, monto],
        (err2) => {
          if (err2) return res.status(500).json(err2);
          res.json({ msg: "Transferencia registrada" });
        }
      );
    }
  );
};

export const getHistorial = (req, res) => {
  // Usar un id fijo para pruebas (usuario 1)
  const id = 1;

  db.query(
    "SELECT * FROM transacciones WHERE usuario_id = ? ORDER BY fecha DESC",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};
