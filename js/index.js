// Importar Lodash
import _ from 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/+esm';

// Cargar los productos dinámicamente desde un archivo JSON
document.addEventListener("DOMContentLoaded", () => {
    fetch('./productos.json')
        .then(response => response.json())
        .then(data => {
            const productos = data;
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
        })
        .catch(error => console.error('Error al cargar los productos:', error));
});

// Evento para calcular el total
document.getElementById("calcular").addEventListener("click", () => {
    let total = 0;
    let descuento = false;
    const carrito = [];

    // Usando Lodash para simplificar el manejo de productos
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

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
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.forEach(producto => {
        document.getElementById(producto.id).value = 0;
        localStorage.removeItem(producto.id);
    });
    document.getElementById("total").textContent = "";
    mostrarMensaje("El carrito se ha limpiado correctamente.");
});
