const db = require("../config/db");

const UserModel = {

  findByUsuario: (usuario, callback) => {
    db.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario],
      callback
    );
  },

  findById: (id, callback) => {
    db.query(
      "SELECT id, usuario, saldo, rol FROM usuarios WHERE id = ?",
      [id],
      callback
    );
  },

  getSaldo: (id, callback) => {
    db.query(
      "SELECT saldo FROM usuarios WHERE id = ?",
      [id],
      callback
    );
  },

  updateSaldo: (id, monto, callback) => {
    db.query(
      "UPDATE usuarios SET saldo = saldo - ? WHERE id = ?",
      [monto, id],
      callback
    );
  }

};

module.exports = UserModel;