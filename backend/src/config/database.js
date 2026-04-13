const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

console.log('🔍 Conectando a MySQL con:');
console.log('   Host:', process.env.DB_HOST);
console.log('   User:', process.env.DB_USER);
console.log('   Database:', process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tienda_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

(async () => {
  try {
    const [result] = await promisePool.query('SELECT 1');
    console.log('✅ Conexión a MySQL exitosa');
  } catch (error) {
    console.error('❌ Error de conexión a MySQL:', error.message);
  }
})();

module.exports = promisePool;