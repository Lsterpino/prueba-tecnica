import dotenv from "dotenv";
dotenv.config({ override: true });
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.PRUEBA_DB_HOST,
  user: process.env.PRUEBA_DB_USER,
  password: process.env.PRUEBA_DB_PASSWORD,
  database: process.env.PRUEBA_DB_NAME,
  port: process.env.PRUEBA_DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
