// Funciones para el carrito
export function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

export function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

export function calcularTotal(carrito) {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

export function actualizarContador() {
    const carrito = obtenerCarrito();
    const totalProductos = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    document.getElementById('contador-carrito').textContent = totalProductos;
}

export function actualizarTotal() {
    const carrito = obtenerCarrito();
    const total = calcularTotal(carrito);
    document.getElementById('total-precio').textContent = total.toFixed(2);
}

export function mostrarNotificacion(mensaje, tipo = 'exito') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo === 'error' ? 'error' : ''}`;
    notificacion.innerHTML = `<i class="fas fa-${tipo === 'exito' ? 'check' : 'exclamation'}-circle"></i> ${mensaje}`;
    document.body.appendChild(notificacion);
    
    setTimeout(() => notificacion.classList.add('mostrar'), 10);
    setTimeout(() => notificacion.remove(), 2000);
}