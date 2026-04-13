const express = require('express');
const router = express.Router();

const productosRoutes = require('./products.routes');
const usuariosRoutes = require('./usuarios.routes');

router.use('/products', productosRoutes);
router.use('/usuarios', usuariosRoutes);


router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando correctamente' });
});

module.exports = router;