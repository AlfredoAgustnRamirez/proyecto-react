const express = require('express');
const router = express.Router();

// ============================================
// CONTROLADORES (después los vas a crear)
// ============================================
const UsuariosController = {
  getAll: async (req, res) => {
    try {
      res.json({ mensaje: 'Lista de usuarios - Pendiente implementar' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      res.json({ mensaje: `Usuario ${id} - Pendiente implementar` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, email, password } = req.body;
      res.status(201).json({ mensaje: 'Usuario creado - Pendiente implementar', usuario: req.body });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar usuario
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, email } = req.body;
      res.json({ mensaje: `Usuario ${id} actualizado - Pendiente implementar` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Eliminar usuario
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      res.json({ mensaje: `Usuario ${id} eliminado - Pendiente implementar` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// ============================================
// DEFINICIÓN DE RUTAS
// ============================================

// GET /api/usuarios - Obtener todos
router.get('/', UsuariosController.getAll);

// GET /api/usuarios/:id - Obtener por ID
router.get('/:id', UsuariosController.getById);

// POST /api/usuarios - Crear usuario
router.post('/', UsuariosController.create);

// PUT /api/usuarios/:id - Actualizar usuario
router.put('/:id', UsuariosController.update);

// DELETE /api/usuarios/:id - Eliminar usuario
router.delete('/:id', UsuariosController.delete);

module.exports = router;