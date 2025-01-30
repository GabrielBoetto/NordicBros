// Constantes de productos
const productos = [
    { id: "producto1", nombre: "Bidón Black", precio: 10000, imagen: "./media/1C.png" },
    { id: "producto2", nombre: "Bidón Purple", precio: 15000, imagen: "./media/2C.png" },
    { id: "producto3", nombre: "Bidón Neón", precio: 20000, imagen: "./media/3C.png" }
];

// Cargar los productos dinámicamente en el HTML
document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.querySelector(".grid");
    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <input type="number" id="${producto.id}" value="0" min="0">
        `;
        productosContainer.appendChild(productoDiv);

        // Cargar datos del carrito si existen en localStorage
        const cantidadGuardada = JSON.parse(localStorage.getItem(producto.id));
        if (cantidadGuardada) {
            document.getElementById(producto.id).value = cantidadGuardada;
        }
    });
});

// Evento para calcular el total
document.getElementById("calcular").addEventListener("click", () => {
    let total = 0;
    let descuento = false;
    const carrito = [];

    productos.forEach(producto => {
        const cantidad = parseInt(document.getElementById(producto.id).value) || 0;
        if (cantidad > 0) {
            carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad });
        }
        total += cantidad * producto.precio;
        localStorage.setItem(producto.id, JSON.stringify(cantidad));
    });

    if (total > 50000) {
        total *= 0.9;
        descuento = true;
    }

    document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;

    // Mostrar mensaje dinámico en lugar de alert
    const mensaje = descuento ? 
        "¡Felicidades! Has recibido un 10% de descuento por compras superiores a $50,000." : 
        "El cálculo del total se realizó correctamente.";
    
    mostrarMensaje(mensaje);
});

// Mostrar mensaje dinámico
function mostrarMensaje(mensaje) {
    const mensajeContainer = document.createElement("p");
    mensajeContainer.textContent = mensaje;
    mensajeContainer.style.fontSize = "1.2rem";
    mensajeContainer.style.color = "#4CAF50";
    document.body.appendChild(mensajeContainer);
}

// Evento para limpiar el carrito
document.getElementById("limpiar").addEventListener("click", () => {
    productos.forEach(producto => {
        document.getElementById(producto.id).value = 0;
        localStorage.removeItem(producto.id);
    });
    document.getElementById("total").textContent = "";
    mostrarMensaje("El carrito se ha limpiado correctamente.");
});
