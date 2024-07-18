const pool = require("../services/db");

const POSTGRESQLStatements = `
DROP TABLE IF EXISTS um_user;

CREATE TABLE um_user (
  user_id INT SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);
    `;

pool.query(POSTGRESQLStatements, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Tables created successfully");
  }
});
