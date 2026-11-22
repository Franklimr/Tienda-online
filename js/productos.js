export async function cargarProductos() {
    const contenedor = document.getElementById('productos-container');
    if (!contenedor) return;
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const productos = await response.json();
        renderizarProductos(productos); //Renderizamos el .json con los datos obtenidos desde la api
    } catch (error) {
        console.error('Error al cargar productos:', error);
        contenedor.innerHTML = '<p style="text-align: center; color: red; grid-column: 1/-1;">Error al cargar los productos. Por favor, recargá la página.</p>';
    }
}

// Funcion para el renderizado de productos
function renderizarProductos(productos) {
    const contenedor = document.getElementById('productos-container');
    contenedor.innerHTML = '';
    
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        
        card.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p class="precio">$${producto.price.toFixed(2)}</p>
            <button class="boton-agregar" 
                    data-accion="agregar" 
                    data-id="${producto.id}" 
                    data-nombre="${producto.title}" 
                    data-precio="${producto.price}" 
                    data-imagen="${producto.image}">
                <i class="fas fa-cart-plus"></i> Agregar al carrito
            </button>
        `;
        contenedor.appendChild(card);
    });
}

export function initProductos() {
    cargarProductos();
}
