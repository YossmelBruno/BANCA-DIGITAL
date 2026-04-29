import mysql from "mysql2";

const db = mysql.createPool({
  host: "switchback.proxy.rlwy.net",
  user: "root",
  password: "NwSVwkyvekULDShLJkBWVXvoWOKUWxxk",
  database: "banca-digital",
  port: 53129,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// usar promesas (mejor manejo en backend moderno)
export default db.promise();