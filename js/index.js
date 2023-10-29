let globalProductos;

const displayCarritoCantidad = document.getElementById("display-carrito-cantidad");
const domTarjetas = document.querySelector("article");

const crearFilaHTML = (prod) => {
  const importeFormateado = prod.precioUnitario.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  });    
  return `<div id="trj${prod.codigo}" class="info-1">
          <a href="./pages/detalle_producto.html?id=${prod.codigo}">
             <button type="submit" class="mas-info">+</button>
          </a>
          <a href="./pages/detalle_producto.html?id=${prod.codigo}"><img src="${prod.image1
          }" alt="producto"></a>
          <a href="./pages/detalle_producto.html?id=${prod.codigo}"><h4>${prod.nombreProducto}</h4></a>
          <h3 class="precio">${importeFormateado}</h3>
          </div>`;
};

const cargarProductos = (prods) => {
  if (prods.length > 0) {
    domTarjetas.innerHTML = "";
    prods.forEach((inst) => {
      domTarjetas.innerHTML += crearFilaHTML(inst);
    });
  } else {
    alert("⛔️ No se han podido cargar los productos");
  }
};

async function getDataAPI() {
  try {
    const options = {
      method: "GET",
    };
    const response = await fetch("https://www.guarlo.com.ar/pi2/api/tecnomax/", options);

    if (!response.ok) {
      throw new Error("La solicitud no pudo completarse.");
    }
    const data = await response.json();
    globalProductos = data.results;

    const jsonResultado = JSON.stringify(globalProductos);
    localStorage.setItem("globalProductos", jsonResultado);
  
    cargarProductos(data.results);
    
  } catch (error) {
    domTarjetas.innerHTML = `<p class="alert alert-danger">${error.message}</p>`;;
  }
}

function fncDisplayCarritoCantidad() { 
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  displayCarritoCantidad.innerText =  carrito.length;  
}

getDataAPI();