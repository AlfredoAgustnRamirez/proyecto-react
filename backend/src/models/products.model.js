const db = require('../config/database');

const ProductosModel = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  async create(data) {
    const { nombre, precio, categoria, imagen, descripcion, stock, rating } = data;
    const [result] = await db.query(
      'INSERT INTO products (nombre, precio, categoria, imagen, descripcion, stock, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, precio, categoria, imagen, descripcion, stock, rating]
    );
    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    const { nombre, precio, categoria, imagen, descripcion, stock, rating } = data;
    const [result] = await db.query(
      'UPDATE products SET nombre = ?, precio = ?, categoria = ?, imagen = ?, descripcion = ?, stock = ?, rating = ? WHERE id = ?',
      [nombre, precio, categoria, imagen, descripcion, stock, rating, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = ProductosModel;