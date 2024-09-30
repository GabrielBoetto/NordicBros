function calcularTotal() {
    // Obtener cantidades de productos
    const cantidadProducto1 = parseInt(document.getElementById('producto1').value);
    const cantidadProducto2 = parseInt(document.getElementById('producto2').value);
    const cantidadProducto3 = parseInt(document.getElementById('producto3').value);

    // Precios de los productos
    const precioProducto1 = 10000;
    const precioProducto2 = 15000;
    const precioProducto3 = 20000;

    // Calcular total
    let total = 0;
    total += cantidadProducto1 * precioProducto1;
    total += cantidadProducto2 * precioProducto2;
    total += cantidadProducto3 * precioProducto3;

    // Algoritmo condicional: aplicar descuento si el total supera $50000
    if (total > 50000) {
        total *= 0.9;  // 10% de descuento
    }

    // Algoritmo con ciclo: sumar un tipo de bidón por cada producto seleccionado
    let puntos = 0;
    const cantidades = [cantidadProducto1, cantidadProducto2, cantidadProducto3];
    for (let i = 0; i < cantidades.length; i++) {
        if (cantidades[i] > 0) {
            puntos++;
        }
    }

    // Mostrar el total
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)} (Colores de Bidónes: ${puntos})`;
}
