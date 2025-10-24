import db from "../config/db.js";

// Create new product
export const createProduct = (req, res) => {
  const { user_id, product_name, product_amount } = req.body;
  const sql =
    "INSERT INTO Products (user_id, product_name, product_amount) VALUES (?, ?, ?)";

  db.query(sql, [user_id, product_name, product_amount], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: "Product added successfully",
      productId: result.insertId,
    });
  });
};

export const getProductsWithUser = (req, res) => {
  const { search = "", page = 1, limit = 5, order = "asc" } = req.query;

  const offset = (page - 1) * limit;

  const sortOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";

  const sql = `
    SELECT 
      p.product_id,
      p.product_name,
      p.product_amount,
      u.id AS user_id,
      u.name AS user_name,
      u.email AS user_email
    FROM Products p
    JOIN users u ON p.user_id = u.id
    WHERE 
      p.product_name LIKE ? OR
      u.name LIKE ? OR
      u.email LIKE ?
    ORDER BY p.product_name ${sortOrder}
    LIMIT ? OFFSET ?
  `;

  const searchValue = `%${search}%`;

  db.query(
    sql,
    [searchValue, searchValue, searchValue, parseInt(limit), offset],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      const countSql = `
      SELECT COUNT(*) AS total 
      FROM Products p
      JOIN users u ON p.user_id = u.id
      WHERE 
        p.product_name LIKE ? OR
        u.name LIKE ? OR
        u.email LIKE ?
    `;

      db.query(
        countSql,
        [searchValue, searchValue, searchValue],
        (countErr, countResult) => {
          if (countErr)
            return res.status(500).json({ error: countErr.message });

          const total = countResult[0].total;
          const totalPages = Math.ceil(total / limit);

          res.status(200).json({
            total,
            totalPages,
            currentPage: parseInt(page),
            results,
          });
        }
      );
    }
  );
};

// Get products for a specific user
export const getProductsByUser = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT 
      p.product_id,
      p.product_name,
      p.product_amount,
      u.id AS user_id,
      u.name AS user_name,
      u.email AS user_email
    FROM Products p
    JOIN users u ON p.user_id = u.id
    WHERE u.id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

/*
export const updateProduct = (req, res) => {
  const { productId } = req.params;
  const { product_name, product_amount } = req.body; // fields that can be updated

  // Build SQL dynamically based on provided fields
  let fields = [];
  let values = [];

  if (product_name !== undefined) {
    fields.push("product_name = ?");
    values.push(product_name);
  }

  if (amount !== undefined) {
    fields.push("product_amount = ?");
    values.push(product_amount);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields provided for update" });
  }

  const sql = `UPDATE products SET ${fields.join(", ")} WHERE product_id = ?`;
  values.push(productId);

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product updated successfully" });
  });
};
*/

export const deleteProduct = (req, res) => {
  const { productId } = req.params;

  const sql = "DELETE FROM Products WHERE product_id = ?";

  db.query(sql, [productId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  });
};
