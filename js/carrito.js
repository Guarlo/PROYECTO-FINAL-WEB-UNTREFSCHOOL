const tableBody = document.getElementById("detalle-carrito");
const importeTotalCarrito = document.querySelector("#importeTotalCarrito");

const crearFilaHTML = (prod) => {
  const importeUnitario = prod.plu.precioUnitario.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const importeTotalParcial = prod.carritoTotalParcial.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return `<tr class="row" id="row-ite-${prod.idItemCarrito}">
          <td class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <div class="carrito-nombre-producto">${prod.plu.nombreProducto}</div>
          </td>
          <td class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
              <div class="td-col-precio">${prod.carritoCantidad}</div>
          </td>
          <td class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <div class="td-col-precio">${importeUnitario}</div>
          </td>
          <td class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <div class="td-col-precio">${importeTotalParcial}</div>
          </td>
          <td class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
          <div class="td-col-btn-menu">
            <a href="detalle_producto.html?id=${prod.plu.codigo}">
            <button id="view-button" class="boton_carrito_mas"></button>
            </a>
            <a>
            <button id="btn-ite-del-${prod.idItemCarrito}" class="boton_carrito_eliminar"></button>
            </a>
          </div>
          </td>
          </tr>`;
};

const cargarProductos = (prods) => {
  let importeTotal = 0;
  if (prods.length > 0) {
    tableBody.innerHTML = "";
    prods.forEach((inst) => {
      tableBody.innerHTML += crearFilaHTML(inst);
      importeTotal += inst.carritoTotalParcial;
    });
    const importeFormateado = importeTotal.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
    importeTotalCarrito.innerHTML = `${importeFormateado}`;
  } else {
    alert("⛔️ No hay productos en el carrito!");
  }
};
const carrito = JSON.parse(localStorage.getItem("carrito"));
cargarProductos(carrito);

tableBody.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const idTag = event.target.id;
    const idRowIte = "row-ite-" + idTag.substring(12); //Lee desde la pos 13 (Inicia en 0, va 12) para descartar "row-ite-"
    const idIteArrayCarrito = idTag.substring(12);
    const listItemToRemove = document.getElementById(idRowIte);

    if (listItemToRemove) {
      // Utiliza el método remove() para eliminar el elemento.
      console.log(listItemToRemove.id);
      listItemToRemove.remove();

      // Quitar de la tabla array
      carrito.forEach(function (elemento, indice) {
        if (elemento.idItemCarrito == idIteArrayCarrito) {
          carrito.splice(indice, 1);
          storageCarrito();
          actualizatTotalCarrito();
        }
      });
    }
  }
});

function storageCarrito() {
  const jsonString = JSON.stringify(carrito); //carritoDataStorage
  localStorage.setItem("carrito", jsonString);
}

function actualizatTotalCarrito() {
  let importeTotal = 0;
  carrito.forEach((inst) => {
    importeTotal += inst.carritoTotalParcial;
  });
  const importeFormateado = importeTotal.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  importeTotalCarrito.innerHTML = `${importeFormateado}`;
}
