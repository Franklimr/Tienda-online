import { obtenerCarrito, guardarCarrito, calcularTotal, actualizarContador, actualizarTotal, mostrarNotificacion } from './funciones-carrito.js';

export function agregarAlCarrito(id, nombre, precio, imagen) {
    const carrito = obtenerCarrito();
    const productoExistente = carrito.find(item => item.id === id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }
    
    guardarCarrito(carrito);
    mostrarNotificacion(`"${nombre}" agregado al carrito`);
    actualizarContador();
    actualizarTotal();
    renderizarCarrito();
    
}

export function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito(carrito);
    mostrarNotificacion(`producto eliminado corectamente`);
    actualizarContador();
    actualizarTotal();
    renderizarCarrito();
}

export function cambiarCantidad(id, nuevaCantidad) {
    const carrito = obtenerCarrito();
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        if (nuevaCantidad <= 0) {
            eliminarDelCarrito(id);
        } else {
            producto.cantidad = parseInt(nuevaCantidad);
            guardarCarrito(carrito);
            actualizarContador();
            actualizarTotal();
            renderizarCarrito();
        }
    }
}

export function vaciarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    if (!listaCarrito) return;
    
    const carrito = obtenerCarrito();
    
    if (carrito.length === 0) {
        mostrarNotificacion(`el carrito esta vacio`);
        return;
    }
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
        localStorage.removeItem('carrito');
        actualizarContador();
        actualizarTotal();
        renderizarCarrito();
    }
}

export function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    if (!listaCarrito) return;
    
    const carrito = obtenerCarrito();
    listaCarrito.innerHTML = '';
    
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li style="text-align: center; padding: 2rem;">El carrito está vacío</li>';
        return;
    }
    
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="item-carrito-info">
                <strong>${item.nombre}</strong><br>
                Precio: $${item.precio} x ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}
            </div>
            <div class="item-carrito-controles">
                <input type="number" value="${item.cantidad}" min="1" data-accion="cambiar" data-id="${item.id}">
                <button class="boton-eliminar" data-accion="eliminar" data-id="${item.id}">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        `;
        listaCarrito.appendChild(li);
    });
}

export function initCarrito() {
    actualizarContador();
    actualizarTotal();
    renderizarCarrito();
    
    const btnVaciar = document.getElementById('vaciar-carrito');
    if (btnVaciar) btnVaciar.addEventListener('click', vaciarCarrito);
}