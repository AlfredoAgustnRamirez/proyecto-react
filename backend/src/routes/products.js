const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

const getProducts = () => {
  try {
    if (fs.existsSync(productsPath)) {
      const data = fs.readFileSync(productsPath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    return [];
  }
};

const saveProducts = (products) => {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
};

router.get('/', (req, res) => {
  const products = getProducts();
  res.json(products);
});

router.get('/:id', (req, res) => {
  const products = getProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  res.json(product);
});

router.post('/', (req, res) => {
  const products = getProducts();
  const newProduct = {
    id: products.length + 1,
    ...req.body,
    precio: parseFloat(req.body.precio),
    stock: parseInt(req.body.stock),
    rating: parseFloat(req.body.rating)
  };
  
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  
  products[index] = { 
    ...products[index], 
    ...req.body,
    precio: parseFloat(req.body.precio),
    stock: parseInt(req.body.stock),
    rating: parseFloat(req.body.rating)
  };
  saveProducts(products);
  res.json(products[index]);
});

router.delete('/:id', (req, res) => {
  let products = getProducts();
  const newProducts = products.filter(p => p.id !== parseInt(req.params.id));
  
  if (products.length === newProducts.length) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  
  saveProducts(newProducts);
  res.json({ message: 'Producto eliminado' });
});

module.exports = router;