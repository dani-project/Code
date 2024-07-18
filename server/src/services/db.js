require("dotenv").config(); 
const { Pool } = require('pg');

// Retrieve connection details from environment variables (recommended)
const neonUrl = process.env.DATABASE_URL; 

// Parse the Neon connection string
const connectionString = new URL(neonUrl);
const {user, host, password, port} = connectionString;
const database = connectionString.pathname.split('/')[1];

// Optional configuration for connection pool
const poolConfig = {
  user,
  host,
  database,
  password,
  port,
  connectionLimit: 10, 
  multipleStatements: true, 
};

const pool = new Pool(poolConfig);

module.exports = pool;
