3. AUTENTICACIÓN JWT (SEGURIDAD REAL)
Login seguro
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  db.query("SELECT * FROM usuarios WHERE usuario=?", [usuario],
    (err, result) => {

      if (result.length === 0) {
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
    });
});

4. MIDDLEWARE DE SEGURIDAD
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ msg: "No token" });

  jwt.verify(token, "secreto123", (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Token inválido" });

    req.user = decoded;
    next();
  });
}

5. SALDO (PROTEGIDO)
app.get("/saldo", verifyToken, (req, res) => {
  db.query("SELECT saldo FROM usuarios WHERE id=?",
    [req.user.id],
    (err, result) => {
      res.json(result[0]);
    });
});

6. TRANSFERENCIA REAL + HISTORIAL
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
