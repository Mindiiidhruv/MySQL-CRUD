import db from "../config/db.js";

export const createUserTable = () => {
  // Select database first
  db.query(`USE ${process.env.DB_NAME}`, (err) => {
    if (err) return console.log("❌ Database selection failed:", err.message);

    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        age INT
      )
    `;
    db.query(sql, (err) => {
      if (err) console.log("❌ Table creation failed:", err.message);
      else console.log("✅ Users table ready");
    });
  });
};
