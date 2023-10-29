let globalProductos = [];
let productoActual = {};
let carritoDataStorage = [];
let buttonIncrementarCantidad = null;
let buttonDisminuirCantidad = null;
let buttonAgregarCarrito = null;
let inputCantidad = null;

let jsonString = localStorage.getItem("carrito");
if (jsonString !== null) {
  carritoDataStorage = JSON.parse(jsonString);
  // console.log("string: ");
  // console.log(jsonString);
  // console.log("parse: ");
  // console.log(carritoDataStorage);
} else {
  jsonString = JSON.stringify(carritoDataStorage);
  localStorage.setItem("carrito", jsonString);
}

document.addEventListener("DOMContentLoaded", () => {
  // Obtén el código del producto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id"); // Cambia "codigo" a "id" para que coincida con la URL

  globalProductos = JSON.parse(localStorage.getItem("globalProductos"));
  const detalleProductoContainer = document.getElementById("insert-producto"); // Usa querySelector para seleccionar la clase CSS
  const masDetalleProductoContainer =
    document.getElementById("mas-informacion"); // Usa querySelector para seleccionar la clase CSS

  // detalleProductoContainer.innerHTML = detalleproductoHTML;

  // Encuentra el producto correspondiente por su código
  productoActual = globalProductos.find((p) => p.codigo == parseInt(productId));

  if (productoActual) {
    // Construye el HTML para mostrar los detalles del producto

    // console.log(productoActual);
    // console.log('>>>>>no puedo traer la imagen del producto<<<')
    // console.log(producto.imagen)
    // console.log(producto.imagen1)
    // console.log(producto.imagen2)
    const detalleproductoHTML = `<div class="producto__thumbs">
    <img
      src="../${productoActual?.image2}"
      alt=""
      class="producto__thumb-img"
    />
    <img
      src="../${productoActual?.image3}"
      alt=""
      class="producto__thumb-img"
    />
    <img
      src="../${productoActual?.image4}"
      alt=""
      class="producto__thumb-img"
    />
    </div>
    <div class="producto__contenedor-imagen">
    <img
      src="../${productoActual?.image1}"
      alt=""
      class="producto__imagen"
    />
    </div>


    <div class="producto__contenedor-info container">
    <div class="producto__estrellas">
      <div class="producto__estrella">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
      </div>
      <div class="producto__estrella">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
      </div>
      <div class="producto__estrella">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
      </div>
      <div class="producto__estrella">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
      </div>
      <div class="producto__estrella">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
      </div>
    </div>
    <h2 class="producto__nombre">
    ${productoActual?.nombreProducto}
    </h2>
    <div class="producto__contenedor-propiedad">
      <p class="producto__propiedad">Precio</p>
      <p class="producto__precio">$ ${productoActual?.precioUnitario}</p>
    </div>

    <div class="producto__contenedor-propiedad">
    <button class="producto__btn-cantidad" id="disminuir-cantidad">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
        />
      </svg>
    </button>
    <input
      type="text"
      id="cantidad"
      value="1"
      class="producto__cantidad"
    />
    <button class="producto__btn-cantidad" id="incrementar-cantidad">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
        />
      </svg>
    </button>
    </div>
    <button
    type="submit"
    class="producto__btn-carrito"
    id="agregar-al-carrito"
    >
    Agregar al carrito
    </button>
    `;
    //console.log(detalleproductoHTML);

    const masDetalleproductoHTML = `
    <div class="tab tab--active" id="caracteristicas">
    <h3 class="tab__titulo">Descripción</h3>
    <ul class="tab__lista">
      <div class="nosotros">
        <div class="nosotros-info container">
          <div class="nosotros-txt">
            <h4 class="subtitulo-descripcion">
            ${productoActual?.descripTitulo1}
            </h4>
            <p class="parrafo-descripcion">
            ${productoActual?.descripTexto1}
            </p>
          </div>
          <div class="nosotros-txt">
            <h4 class="subtitulo-descripcion">
            ${productoActual?.descripTitulo2}
            </h4>
            <p class="parrafo-descripcion">
            ${productoActual?.descripTexto2}
            </p>
          </div>
          <div class="nosotros-txt">
            <h4 class="subtitulo-descripcion">
            ${productoActual?.descripTitulo3}
            </h4>
            <p class="parrafo-descripcion">
            ${productoActual?.descripTexto3}
            </p>
          </div>
          <div class="nosotros-txt">
            <h4 class="subtitulo-descripcion">
            ${productoActual?.descripTitulo4}
            </h4>
            <p class="parrafo-descripcion">
            ${productoActual?.descripTexto4}
            </p>
          </div>
        </div>
      </div>
    </ul>
    </div>
    `;

    // Agrega el HTML generado al contenedor en detalleproducto.html
    //const detalleProductoContainer = document.getElementById("insert-producto"); // Usa querySelector para seleccionar la clase CSS
    detalleProductoContainer.innerHTML = detalleproductoHTML;
    masDetalleProductoContainer.innerHTML = masDetalleproductoHTML;

    buttonIncrementarCantidad = document.getElementById("incrementar-cantidad");
    buttonIncrementarCantidad.addEventListener("click", fncIncrementarCantidad);

    buttonDisminuirCantidad = document.getElementById("disminuir-cantidad");
    buttonDisminuirCantidad.addEventListener("click", fncDisminuirCantidad);

    buttonAgregarCarrito = document.getElementById("agregar-al-carrito");
    buttonAgregarCarrito.addEventListener("click", fncAgregarCarrito);

    inputCantidad = document.getElementById("cantidad");
    inputCantidad.value = "1";
    //inputCantidad.focus();
  } else {
    // Muestra un mensaje si el producto no se encuentra
    alert("Producto no encontrado");
  }
});

//----------------------------------------------------------------------------

//console.log(`producto ${productoActual}`);

function fncIncrementarCantidad() {
  let cantidad = 0;
  let valDOM = inputCantidad.value;
  cantidad = parseInt(valDOM);
  if (cantidad < 6) {
    cantidad += 1;
    //Actualiza el DOM
    valDOM = cantidad.toString();
    inputCantidad.value = valDOM;
    //Actualiza el productoActual del carrito.
    // productoActual.carritoCantidad = cantidad;
    // productoActual.carritoTotalParcial =
    //   cantidad * productoActual.precioUnitario;
  } else {
    alert("El máximo son 6 unidades");
  }

  //console.log("inc");
}
function fncDisminuirCantidad() {
  let cantidad = 0;
  let valDOM = inputCantidad.value;
  cantidad = parseInt(valDOM);
  if (cantidad > 1) {
    cantidad -= 1;
    //Actualiza el DOM
    valDOM = cantidad.toString();
    inputCantidad.value = valDOM;
    //Actualiza el productoActual del carrito.
    // productoActual.carritoCantidad = cantidad;
    // productoActual.carritoTotalParcial =
    //   cantidad * productoActual.precioUnitario;
  } else {
    alert("El mínimo es 1 unidad");
    console.log("El mínimo es 1 unidad");
  }
  //console.log("Dis");
}

function fncAgregarCarrito() {
  const productoCarrito = {
    plu: productoActual,
    idItemCarrito: 0,
    carritoCantidad: 0,
    carritoTotalParcial: 0,
  };

  //Actualiza el productoActual del carrito.
  let cantidad = 0;
  let valDOM = inputCantidad.value;
  cantidad = parseInt(valDOM);


  const wRnd = generateRandom();
  const idItemCarrito = wRnd;
  productoCarrito.idItemCarrito = idItemCarrito;
  productoCarrito.carritoCantidad = cantidad;
  productoCarrito.carritoTotalParcial =
    cantidad * productoCarrito.plu.precioUnitario;

  carritoDataStorage.push(productoCarrito);
  console.log(carritoDataStorage);

  storageCarrito();

  alert(`Se agregó el producto al carrito!`);
  // Este método reemplazará la página actual con la página de destino,
  //sin dejar un historial de navegación.
  window.location.replace("carrito.html");

  // Usando window.location.href:
  // Puedes cambiar la ubicación actual de la página web estableciendo la propiedad window.location.href en la URL de destino. Por ejemplo:
  //   // Redirigir a una URL específica
  // window.location.href = "https://www.ejemplo.com";
  // Usando window.location.replace():
  // Este método reemplazará la página actual con la página de destino, sin dejar un historial de navegación. Es útil cuando quieres una redirección que no pueda ser retrocedida con el botón de retroceso del navegador.

  //   // Reemplazar la página actual con la URL de destino
  // window.location.replace("https://www.ejemplo.com");
  // Usando window.location.assign():
  // Este método carga una nueva página en el historial del navegador, lo que permite volver atrás a la página anterior utilizando el botón de retroceso.

  // // Cargar la URL de destino en el historial del navegador
  // window.location.assign("https://www.ejemplo.com");

  //window.history.back();
}

function storageCarrito() {
  const jsonString = JSON.stringify(carritoDataStorage);
  localStorage.setItem("carrito", jsonString);
}

/********************************************************************/
// Generar número aleatorio
function generateRandom() {
  let randomNumber = parseInt(Math.round(Math.random() * 100000000));
  //let randomNumber = Math.random() * 100000000;
  return randomNumber;
}
