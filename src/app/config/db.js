import mysql from "mysql2";

const db = mysql.createConnection({
  host: "switchback.proxy.rlwy.net",
  user: "root",
  password: "NwSVwkyvekULDShLJkBWVXvoWOKUWxxk",
  database: "banca-digital",
  port: 53129
});

db.connect((err) => {
  if (err) {
    console.error("Error MySQL:", err);
  } else {
    console.log("Conectado MySQL Railway");
  }
});

export default db;