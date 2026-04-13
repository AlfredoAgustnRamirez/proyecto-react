
export const categorias = [...new Set(productos.map(p => p.categoria))];

export const getProductoById = (id) => {
  return productos.find(p => p.id === parseInt(id));
};

export const getProductosByCategoria = (categoria) => {
  if (categoria === 'todos') return productos;
  return productos.filter(p => p.categoria === categoria);
};