// Módulo de datos - Aquí estarían nuestros productos
// En el futuro, esto vendría de una API

export const productos = [
  {
    id: 1,
    nombre: "Auriculares Bluetooth Sony WH-1000XM5",
    precio: 299.99,
    categoria: "audio",
    imagen: "https://picsum.photos/id/1/300/200",
    descripcion: "Auriculares con cancelación de ruido líder en la industria, 30 horas de batería.",
    stock: 15,
    rating: 4.8
  },
  {
    id: 2,
    nombre: "Smartphone iPhone 15 Pro",
    precio: 1099.99,
    categoria: "telefonos",
    imagen: "https://picsum.photos/id/0/300/200",
    descripcion: "Chip A17 Pro, cámara de 48MP, titanio de grado aeroespacial.",
    stock: 8,
    rating: 4.9
  },
  {
    id: 3,
    nombre: "Laptop MacBook Pro M3",
    precio: 1999.99,
    categoria: "computadoras",
    imagen: "https://picsum.photos/id/20/300/200",
    descripcion: "Chip M3 Pro, 16GB RAM, SSD 512GB, batería para todo el día.",
    stock: 5,
    rating: 4.9
  },
  {
    id: 4,
    nombre: "Teclado Mecánico Logitech MX",
    precio: 129.99,
    categoria: "accesorios",
    imagen: "https://picsum.photos/id/96/300/200",
    descripcion: "Teclado mecánico inalámbrico, retroiluminación inteligente.",
    stock: 25,
    rating: 4.6
  },
  {
    id: 5,
    nombre: "Monitor LG UltraWide 34\"",
    precio: 449.99,
    categoria: "monitores",
    imagen: "https://picsum.photos/id/15/300/200",
    descripcion: "Pantalla curva 3440x1440, USB-C, 100Hz.",
    stock: 12,
    rating: 4.7
  },
  {
    id: 6,
    nombre: "Mouse Logitech MX Master 3S",
    precio: 89.99,
    categoria: "accesorios",
    imagen: "https://picsum.photos/id/21/300/200",
    descripcion: "Mouse inalámbrico, 8000 DPI, botones programables.",
    stock: 30,
    rating: 4.8
  },
  {
    id: 7,
    nombre: "Smartwatch Apple Watch Series 9",
    precio: 399.99,
    categoria: "wearables",
    imagen: "https://picsum.photos/id/22/300/200",
    descripcion: "Pantalla siempre activa, chip S9, doble toque.",
    stock: 18,
    rating: 4.7
  },
  {
    id: 8,
    nombre: "Tablet iPad Air",
    precio: 599.99,
    categoria: "tablets",
    imagen: "https://picsum.photos/id/24/300/200",
    descripcion: "Chip M1, compatible con Apple Pencil, 10.9 pulgadas.",
    stock: 10,
    rating: 4.8
  }
];

// Utilidades para trabajar con productos
export const categorias = [...new Set(productos.map(p => p.categoria))];

export const getProductoById = (id) => {
  return productos.find(p => p.id === parseInt(id));
};

export const getProductosByCategoria = (categoria) => {
  if (categoria === 'todos') return productos;
  return productos.filter(p => p.categoria === categoria);
};