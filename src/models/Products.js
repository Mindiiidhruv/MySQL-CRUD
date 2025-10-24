import db from "../config/db.js";

export const createProductTable = () => {
  db.query(`USE ${process.env.DB_NAME}`, (err) => {
    if (err) return console.log("Database selection failed:", err.message);

    const sql = `
    CREATE TABLE IF NOT EXISTS Products (
      product_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      product_name VARCHAR(100) NOT NULL,
      product_amount DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `;
    db.query(sql, (err) => {
      if (err) console.log("Product table creation failed:", err.message);
      else console.log("Products table ready");
    });
  });
};
