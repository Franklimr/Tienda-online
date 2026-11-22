//Importamos todos los modulos .js
import { initCarrito, agregarAlCarrito, eliminarDelCarrito, cambiarCantidad } from './carrito.js';
import { initProductos } from './productos.js';
import { mostrarNotificacion } from './funciones-carrito.js';

// acciones para unificar botones
document.body.addEventListener('click', (e) => {
    const boton = e.target.closest('[data-accion]');
    if (!boton) return;
    
    const accion = boton.dataset.accion;
    const id = parseInt(boton.dataset.id);
    
    if (accion === 'agregar') {
        const nombre = boton.dataset.nombre;
        const precio = parseFloat(boton.dataset.precio);
        const imagen = boton.dataset.imagen;
        agregarAlCarrito(id, nombre, precio, imagen);
    } 
    else if (accion === 'eliminar') {
        eliminarDelCarrito(id);
    }
});

// Listener para las entradas de cantidad
document.body.addEventListener('change', (e) => {
    if (e.target.dataset.accion === 'cambiar') {
        const id = parseInt(e.target.dataset.id);
        cambiarCantidad(id, e.target.value);
    }
});

// Inicio de formulario
document.addEventListener('DOMContentLoaded', function() {

    const formulario = document.getElementById('form-contacto');
    if (!formulario) return;
    
    const mensajeDiv = document.getElementById('mensaje-formulario');
    
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value.trim();
        
        if (!nombre || !email || !asunto || !mensaje) {
            mostrarNotificacion('Por favor, completá todos los campos', 'error');
            return;
        }
        if (!validarEmail(email)) {
            mostrarNotificacion('Por favor, ingresá un email válido', 'error');
            return;
        }
        
        mostrarNotificacion('¡Mensaje enviado correctamente! (simulación)', 'exito');
        formulario.reset();
    });
    
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});

// Iniciamos los modulos
document.addEventListener('DOMContentLoaded', function() {
    initProductos();
    initCarrito();
});
