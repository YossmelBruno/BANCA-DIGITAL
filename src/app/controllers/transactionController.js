app.post("/transferir", verifyToken, (req, res) => {
  const { monto } = req.body;

  const id = req.user.id;

  // descontar saldo
  db.query("UPDATE usuarios SET saldo = saldo - ? WHERE id=?",
    [monto, id]);

  // guardar transacción
  db.query(
    "INSERT INTO transacciones (usuario_id, tipo, monto) VALUES (?, 'retiro', ?)",
    [id, monto]
  );

  res.json({ msg: "Transferencia registrada" });
});
