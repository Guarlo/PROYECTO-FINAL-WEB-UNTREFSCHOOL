const limpiarCarrito = document.getElementById("volver-home");
limpiarCarrito.addEventListener("click", fncLimpiarCarrito);

function fncLimpiarCarrito() { 
    localStorage.clear("carrito");   
}