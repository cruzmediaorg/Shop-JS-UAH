$(document).ready(function () {
    let orden = JSON.parse(localStorage.getItem('orden')) || [];
    let htmlOrden = '';

    if (orden.length > 0) {
        htmlOrden = Object.values(orden).map(producto => {
            if (producto && producto.nombre) {
                return `<li class="list-group-item">
                    ${producto.nombre} - Cantidad: ${producto.quantity} - Precio: €${parseFloat(producto.precio).toFixed(2)}
                </li>`;
            }
            return '';
        }).join('');
    } else {
        htmlOrden = '<li class="list-group-item">No hay productos en tu orden.</li>';
    }

    $('#listaProductosOrdenados').html(htmlOrden);

    // Elimina la orden del localStorage
    localStorage.removeItem('orden');
});