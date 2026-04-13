const express = require('express');
const router = express.Router();

let carrito = [];

router.get('/', (req, res) => {
  res.json(carrito);
});

router.post('/', (req, res) => {
  const { producto, cantidad } = req.body;
  
  const existe = carrito.find(item => item.id === producto.id);
  
  if (existe) {
    existe.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }
  
  res.json(carrito);
});

router.put('/:id', (req, res) => {
  const { cantidad } = req.body;
  const index = carrito.findIndex(item => item.id === parseInt(req.params.id));
  
  if (index !== -1) {
    if (cantidad <= 0) {
      carrito.splice(index, 1);
    } else {
      carrito[index].cantidad = cantidad;
    }
  }
  
  res.json(carrito);
});

router.delete('/:id', (req, res) => {
  carrito = carrito.filter(item => item.id !== parseInt(req.params.id));
  res.json(carrito);
});

router.delete('/', (req, res) => {
  carrito = [];
  res.json({ message: 'Carrito vaciado' });
});

module.exports = router;