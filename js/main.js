const gaseosas = 3500;
const snacks = 2500;
const galletas = 2000;
const alcohol = 9000;
const caramelos = 1000;
const yerba = 5000;
const azucar = 4000;

let carrito = [];

function agregarGaseosas(cantidad) {
  agregarProducto("gaseosas", gaseosas, cantidad);
}

function agregarSnacks(cantidad) {
  agregarProducto("snacks", snacks, cantidad);
}

function agregarGalletas(cantidad) {
  agregarProducto("galletas", galletas, cantidad);
}

function agregarAlcohol(cantidad) {
  agregarProducto("alcohol", alcohol, cantidad);
}

function agregarCaramelos(cantidad) {
  agregarProducto("caramelos", caramelos, cantidad);
}

function agregarYerba(cantidad) {
  agregarProducto("yerba", yerba, cantidad);
}

function agregarAzucar(cantidad) {
  agregarProducto("azucar", azucar, cantidad);
}

function agregarProducto(nombre, precio, cantidad) {
  const item = {
    nombre: nombre,
    cantidad: cantidad,
    precio: precio,
    subtotal: precio * cantidad
  };
  carrito[carrito.length] = item;
  console.log("Agregado: " + cantidad + " x " + nombre + " ($" + item.subtotal + ")");
}

function mostrarCarrito() {
  console.log("Contenido del carrito:");
  let i = 0;
  while (i < carrito.length) {
    const item = carrito[i];
    console.log(item.cantidad + " x " + item.nombre + " = $" + item.subtotal);
    i = i + 1;
  }
}

function calcularTotal() {
  let total = 0;
  let i = 0;
  while (i < carrito.length) {
    total = total + carrito[i].subtotal;
    i = i + 1;
  }
  console.log("TOTAL: $" + total);
  return total;
}

function vaciarCarrito() {
  carrito = [];
  console.log("Carrito vaciado.");
}