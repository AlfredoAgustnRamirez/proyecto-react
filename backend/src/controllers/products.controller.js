const ProductosModel = require('../models/products.model');

const ProductosController = {
  async getAll(req, res) {
    try {
      const productos = await ProductosModel.getAll();
      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const producto = await ProductosModel.getById(id);
      if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener producto' });
    }
  },

  async create(req, res) {
    try {
      const nuevoProducto = await ProductosModel.create(req.body);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear producto' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const actualizado = await ProductosModel.update(id, req.body);
      if (!actualizado) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
      res.json({ id, ...req.body });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar producto' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await ProductosModel.delete(id);
      if (!eliminado) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
      res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar producto' });
    }
  }
};

module.exports = ProductosController;