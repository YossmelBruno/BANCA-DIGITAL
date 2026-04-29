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