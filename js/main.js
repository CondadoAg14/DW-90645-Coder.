let carrito = [];

const precios = {
  gaseosas: 3500,
  snacks: 2500,
  galletas: 2000,
  alcohol: 9000,
  caramelos: 1000,
  yerba: 5000,
  azucar: 4000
};

document.getElementById("form-producto").addEventListener("submit", function (e) {
  e.preventDefault();

  let nombre = document.getElementById("producto").value;
  let cantidad = parseInt(document.getElementById("cantidad").value);

  if (cantidad > 0) {
    let precio = precios[nombre];
    let subtotal = precio * cantidad;

    // Guardamos como string: "producto,cantidad,precio,subtotal"
    let linea = nombre + "," + cantidad + "," + precio + "," + subtotal;
    carrito.push(linea);
    guardarCarritoPlano();
    mostrarCarritoPlano();
  }
});

document.getElementById("vaciar").addEventListener("click", function () {
  carrito = [];
  localStorage.setItem("carrito", "");
  mostrarCarritoPlano();
});

function guardarCarritoPlano() {
  localStorage.setItem("carrito", carrito.join("\n"));
}

function mostrarCarritoPlano() {
  let contenedor = document.getElementById("carrito-container");
  contenedor.innerHTML = "";

  let datosGuardados = localStorage.getItem("carrito");
  let total = 0;

  if (datosGuardados && datosGuardados.trim() !== "") {
    let lineas = datosGuardados.split("\n");

    for (let i = 0; i < lineas.length; i++) {
      let partes = lineas[i].split(",");
      let nombre = partes[0];
      let cantidad = partes[1];
      let subtotal = partes[3];

      let div = document.createElement("div");
      div.textContent = cantidad + " x " + nombre + " = $" + subtotal;
      contenedor.appendChild(div);

      total += parseInt(subtotal);
    }
  }

  document.getElementById("total").textContent = "TOTAL: $" + total;
}

mostrarCarritoPlano();