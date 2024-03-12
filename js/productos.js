$(document).ready(function () {
    /*
        Cargar productos y categorías desde el localStorage
    */
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    let categorias = JSON.parse(localStorage.getItem('categorias')) || [];

    /*
        Función para cargar las categorías en el select
    */
    function cargarCategorias() {
        let opcionesCategorias = '<option value="">Selecciona una categoría</option>';
        categorias.forEach(categoria => {
            opcionesCategorias += `<option value="${categoria}">${categoria}</option>`;
        });
        $('#categoriaProducto').html(opcionesCategorias);
    }

    /*
        Función para cargar los productos en la tabla
    */
    function cargarProductos() {
        let htmlProductos = productos.map((producto) => `
    <tr>
    <td><img src="${producto.imagen}" alt="${producto.descripcion}" style="width: 50px;"></td>
    <td>${producto.nombre}</td>
    <td>${producto.codigo}</td>
    <td class="text-muted small overflow-hidden" style="width: 100px;">${producto.descripcion}</td>
    <td>${producto.precio}</td>
    <td>${producto.stock}</td>
    <td>
        <button class="btn btn-info editarProducto" data-id="${producto.id}">Editar</button>
        <button class="btn btn-danger eliminarProducto" data-id="${producto.id}">Eliminar</button>
    </td>
    </tr>
    `).join('');

        $('#tablaProductos tbody').html(htmlProductos);
    }

    cargarProductos();
    cargarCategorias();


    /* 
        Modals 
    */

    // Abrir modal en modo de añadir
    $('#btnAgregarProducto').click(function () {
        $('#productoModalLabel').text('Añadir Nuevo Producto');
        $('#formProducto').trigger('reset');
        $('#productoId').val('');
        $('#productoModal').modal('show');
    });

    // Abrir modal en modo de editar
    $(document).on('click', '.editarProducto', function () {
        const productoId = $(this).data('id');
        const producto = productos.find(p => p.id === productoId);

        $('#productoModalLabel').text('Editar Producto');
        $('#productoId').val(producto.id);
        $('#nombreProducto').val(producto.nombre);
        $('#imagenProducto').val(producto.imagen);
        $('#codigoProducto').val(producto.codigo);
        $('#descripcionProducto').val(producto.descripcion);
        $('#categoriaProducto').val(producto.categoria);
        $('#precioProducto').val(producto.precio);
        $('#stockProducto').val(producto.stock);
        $('#productoModal').modal('show');
    });


    $('#guardarProducto').click(function () {
        const id = $('#productoId').val();
        const nombre = $('#nombreProducto').val();
        const imagen = $('#imagenProducto').val();
        const codigo = $('#codigoProducto').val();
        const descripcion = $('#descripcionProducto').val();
        const categoria = $('#categoriaProducto').val();
        const precio = $('#precioProducto').val();
        const stock = $('#stockProducto').val();

        if (id) {
            // Editar producto existente
            const productoIndex = productos.findIndex(p => p.id === parseInt(id));
            productos[productoIndex] = {
                id: parseInt(id),
                nombre,
                imagen,
                codigo,
                descripcion,
                categoria,
                precio: parseFloat(precio),
                stock: parseInt(stock)
            };
        } else {
            // Añadir nuevo producto 
            const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 :
                1;
            productos.push({
                id: nuevoId,
                nombre,
                imagen,
                codigo,
                descripcion,
                categoria,
                precio: parseFloat(precio),
                stock: parseInt(stock)
            });
        }

        localStorage.setItem('productos', JSON.stringify(productos));
        cargarProductos();
        $('#productoModal').modal('hide');
    });

    $(document).on('click', '.eliminarProducto', function () {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            let idProducto = $(this).data('id');
            let productos = JSON.parse(localStorage.getItem('productos'));
            productos = productos.filter((producto) => producto.id !== idProducto);
            localStorage.setItem('productos', JSON.stringify(productos));
            cargarProductos(); // Recargar la lista de productos
        }
    });

});