let carrito = [];
let precios = {};

fetch("../json/productos.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(producto => {
      precios[producto.nombre] = producto.precio;
    });

    const selectProducto = document.getElementById("producto");
    data.forEach(producto => {
      const option = document.createElement("option");
      option.value = producto.nombre;
      option.textContent = `${producto.nombre} - $${producto.precio}`;
      selectProducto.appendChild(option);
    });

    mostrarCarritoPlano();
  })
  .catch(error => {
    Swal.fire({
      icon: "error",
      title: "Error al cargar los productos",
      text: error.message
    });
  });

document.getElementById("form-producto").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("producto").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if (!nombre || isNaN(cantidad) || cantidad <= 0) {
    Swal.fire({
      icon: "warning",
      title: "Datos inválidos",
      text: "Por favor selecciona un producto y una cantidad válida."
    });
    return;
  }

  const precio = precios[nombre];
  const subtotal = precio * cantidad;

  const linea = `${nombre},${cantidad},${precio},${subtotal}`;
  carrito.push(linea);
  guardarCarritoPlano();
  mostrarCarritoPlano();

  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: `${cantidad} x ${nombre} agregado al carrito.`
  });
});

document.getElementById("vaciar").addEventListener("click", function () {
  if (carrito.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Carrito vacío",
      text: "No hay productos que eliminar."
    });
    return;
  }

  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esto eliminará todos los productos del carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar"
  }).then(result => {
    if (result.isConfirmed) {
      carrito = [];
      localStorage.setItem("carrito", "");
      mostrarCarritoPlano();

      Swal.fire({
        icon: "Exito",
        title: "Carrito vaciado",
        text: "Todos los productos han sido eliminados."
      });
    }
  });
});

function guardarCarritoPlano() {
  localStorage.setItem("carrito", carrito.join("\n"));
}

function mostrarCarritoPlano() {
  const contenedor = document.getElementById("carrito-container");
  contenedor.innerHTML = "";

  const datosGuardados = localStorage.getItem("carrito");
  let total = 0;

  if (datosGuardados && datosGuardados.trim() !== "") {
    const lineas = datosGuardados.split("\n");

    for (const linea of lineas) {
      const [nombre, cantidad, , subtotal] = linea.split(",");
      const div = document.createElement("div");
      div.textContent = `${cantidad} x ${nombre} = $${subtotal}`;
      contenedor.appendChild(div);
      total += parseInt(subtotal);
    }
  }

  document.getElementById("total").textContent = `TOTAL: $${total}`;
}