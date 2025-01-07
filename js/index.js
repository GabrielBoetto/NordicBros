// Variables y objetos
const productos = [
    { nombre: "Bidón Black", precio: 10000 },
    { nombre: "Bidón Purple", precio: 15000 },
    { nombre: "Bidón Neón", precio: 20000 }
];

// Función para calcular el total
function calcularTotal() {
    let total = 0;
    const cantidades = document.querySelectorAll(".cantidad");

    cantidades.forEach((input, index) => {
        total += input.value * productos[index].precio;
    });

    // Aplicar descuento
    if (total > 50000) {
        total *= 0.9;
    }

    document.getElementById("resultado").textContent = `Total: $${total.toFixed(2)}`;
}

// Capturar datos con prompt()
function personalizarMensaje() {
    const nombre = prompt("¿Cuál es tu nombre?");
    const saludo = `¡Hola ${nombre}! Gracias por visitar nuestra tienda.`;
    alert(saludo);
}

// Eventos
document.getElementById("calcular-btn").addEventListener("click", calcularTotal);

// Llamada inicial
personalizarMensaje();
