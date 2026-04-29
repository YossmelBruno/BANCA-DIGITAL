const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'banca-digital'
});

connection.query('SELECT id, usuario, saldo FROM usuarios WHERE id = 1', (err, results) => {
  if (err) {
    console.error('ERR', err);
    process.exit(1);
  }
  console.log(JSON.stringify(results, null, 2));
  connection.end();
});
