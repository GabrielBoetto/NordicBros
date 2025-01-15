// Constantes de productos
const productos = [
    { id: "producto1", nombre: "Bidón Black", precio: 10000 },
    { id: "producto2", nombre: "Bidón Purple", precio: 15000 },
    { id: "producto3", nombre: "Bidón Neón", precio: 20000 }
];

// Cargar datos del carrito al iniciar
document.addEventListener("DOMContentLoaded", () => {
    productos.forEach(producto => {
        const input = document.getElementById(producto.id);
        const cantidadGuardada = JSON.parse(localStorage.getItem(producto.id));
        if (cantidadGuardada) {
            input.value = cantidadGuardada;
        }
    });
});

// Evento para calcular el total
document.getElementById("calcular").addEventListener("click", () => {
    let total = 0;
    productos.forEach(producto => {
        const cantidad = parseInt(document.getElementById(producto.id).value) || 0;
        total += cantidad * producto.precio;
        localStorage.setItem(producto.id, JSON.stringify(cantidad));
    });

    if (total > 50000) {
        total *= 0.9;
    }

    document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
});

// Evento para limpiar el carrito
document.getElementById("limpiar").addEventListener("click", () => {
    productos.forEach(producto => {
        document.getElementById(producto.id).value = 0;
        localStorage.removeItem(producto.id);
    });
    document.getElementById("total").textContent = "";
});
