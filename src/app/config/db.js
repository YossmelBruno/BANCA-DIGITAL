import "dotenv/config";
import mysql from "mysql2";

// Railway proporciona MySQL en formato de URL o variables separadas
// Si existe MYSQL_URL (formato Railway), la parseamos
let dbConfig;

if (process.env.MYSQL_URL) {
  // Formato: mysql://user:password@host:port/database
  const url = new URL(process.env.MYSQL_URL);
  dbConfig = {
    host: url.hostname,
    user: url.username,
    password: url.password,
    port: url.port,
    database: url.pathname.replace("/", "")
  };
} else {
  // Variables separadas (desarrollo local)
  dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "banca-digital"
  };
}

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err.message);
  } else {
    console.log("Conectado a MySQL correctamente.");
  }
});

export default db;
