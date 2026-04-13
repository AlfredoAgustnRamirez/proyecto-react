const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/products.controller');

router.get('/', ProductosController.getAll);
router.get('/:id', ProductosController.getById);
router.post('/', ProductosController.create);
router.put('/:id', ProductosController.update);
router.delete('/:id', ProductosController.delete);

module.exports = router;