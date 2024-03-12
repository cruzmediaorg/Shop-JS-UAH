$(document).ready(function () {
    /* Categorías y productos */
    let categorias, productos;

    if (localStorage.getItem('productos') && localStorage.getItem('categorias')) {
        // Cargar desde localStorage
        categorias = JSON.parse(localStorage.getItem('categorias'));
        productos = JSON.parse(localStorage.getItem('productos'));
    } else {
        // Datos predeterminados si no hay nada en localStorage
        categorias = ["Smartphones", "Televisiones", "Ordenadores", "Electrodomésticos"];

        productos = [{
                id: 1,
                nombre: 'iPhone 15 Plus',
                imagen: 'images/iphone15.jpeg',
                codigo: 'SKU-440075',
                descripcion: 'iPhone 15 Plus con 5G, 128GB',
                categoria: 'Smartphones',
                precio: 1099,
                stock: 10
            },
            {
                id: 2,
                nombre: 'Samsung Galaxy S22',
                imagen: 'images/samsungs22.jpg',
                codigo: 'SKU-44DDS075',
                descripcion: 'Samsung Galaxy S22 con 5G, 128GB',
                categoria: 'Smartphones',
                precio: 899,
                stock: 20
            },
            {
                id: 3,
                nombre: 'LG 55" 4K UHD Smart TV',
                imagen: 'images/lg.avif',
                codigo: 'SKU-33DAS90',
                descripcion: 'LG 55" 4K UHD Smart TV con HDR y Alexa integrada',
                categoria: 'Televisiones',
                precio: 1039,
                stock: 2
            },
            {
                id: 4,
                nombre: 'Samsung 65" 4K UHD Smart TV',
                imagen: 'images/samsung65.avif',
                codigo: 'SKU-0019922',
                descripcion: 'Samsung 65" 4K UHD Smart TV con HDR y Alexa',
                categoria: 'Televisiones',
                precio: 1399,
                stock: 10
            },
            {
                id: 5,
                nombre: 'MacBook Pro 2022',
                imagen: 'images/laptop3.jpeg',
                codigo: 'SKU-338474',
                descripcion: 'MacBook Pro 2022 con M2, 16GB RAM, 512GB SSD',
                categoria: 'Ordenadores',
                precio: 1453,
                stock: 15
            },
            {
                id: 6,
                nombre: 'Dell XPS 15',
                imagen: 'images/laptop2.jpeg',
                codigo: 'SKU-338474',
                descripcion: 'Dell XPS 15 con i7, 16GB RAM, 512GB SSD',
                categoria: 'Ordenadores',
                precio: 899,
                stock: 3
            },
            {
                id: 7,
                nombre: 'HP Pavilion',
                imagen: 'images/laptop1.webp',
                codigo: 'SKU-338433',
                descripcion: 'HP Pavilion con Ryzen 7, 16GB RAM, 512GB SSD',
                categoria: 'Ordenadores',
                precio: 799,
                stock: 5
            },
            {
                id: 8,
                nombre: 'PlayStation 5',
                imagen: 'images/ps5.webp',
                codigo: 'SKU-134433',
                descripcion: 'PlayStation 5 con 1TB de almacenamiento',
                categoria: 'Electrodomésticos',
                precio: 499,
                stock: 12
            },
            {
                id: 9,
                nombre: 'Freidora de aire LG',
                imagen: 'images/freidora.webp',
                codigo: 'SKU-338111',
                descripcion: 'Freidora de aire LG con 5 litros de capacidad',
                categoria: 'Electrodomésticos',
                precio: 99,
                stock: 5
            },
            {
                id: 10,
                nombre: 'Robot aspirador iRobot',
                imagen: 'images/aspirador.webp',
                codigo: 'SKU-338433',
                descripcion: 'Robot aspirador iRobot con mapeo y app',
                categoria: 'Electrodomésticos',
                precio: 299,
                stock: 5
            }
        ];

        // Guardar datos predeterminados en localStorage
        localStorage.setItem('categorias', JSON.stringify(categorias));
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    /* Filtros */

    function poblarSelectorCategorias() {
        let categorias = [...new Set(productos.map(producto => producto.categoria))];
        categorias.forEach(categoria => {
            $('#filtroCategoria').append(`<option value="${categoria}">${categoria}</option>`);
        });
    }

    $('#filtroCategoria').change(function () {
        let categoriaSeleccionada = $(this).val();
        mostrarProductos(categoriaSeleccionada);
    });


    $(document).on('click', '.categoria-titulo', function () {
        let target = $(this).data('target');
        $(target).slideToggle(); // Esto creará la transición suave de mostrar/ocultar
    });

    /* Renderizar productos */
    function mostrarProductos(categoriaSeleccionada = 'Todos') {
        $('#productos').empty(); // Limpiar el área de productos

        let productosFiltrados = categoriaSeleccionada === 'Todos' ? productos : productos.filter(
            producto => producto.categoria === categoriaSeleccionada);

        let productosPorCategoria = productosFiltrados.reduce((acc, producto) => {
            if (!acc[producto.categoria]) {
                acc[producto.categoria] = [];
            }
            acc[producto.categoria].push(producto);
            return acc;
        }, {});

        Object.keys(productosPorCategoria).forEach((categoria, index) => {
            let categoriaId = `categoria-${index}`; // ID único para cada categoría

            // Crear el título de la categoría
            let tituloCategoria = $(`
    <div class="mb-3 categoria-titulo" data-target="#${categoriaId}">
        <h3>${categoria} (${productosPorCategoria[categoria].length})</h3>
    </div>
`);

            // Crear el contenedor para los productos de esta categoría
            let contenedorProductos = $(
                `<div id="${categoriaId}" class="row categoria-contenido"></div>`);

            // Añadir productos al contenedor
            productosPorCategoria[categoria].forEach((producto) => {
                let productoHTML = $(`
        <div class="col-md-4 mb-4">
            <div class="card" style="width: 18rem;">
<img src="${producto.imagen}" class="card-img-top"  alt="${producto.nombre}">
<div class="card-body">
<h5 class="card-title">${producto.nombre}</h5>
<p class="card-text">${producto.codigo}</p>
<p class="card-text">${producto.descripcion}</p>
<p class="card-text h2">Precio: <strong>€${parseFloat(producto.precio).toFixed(2)}</strong></p>
<p class="card-text">Cantidad en existencia: ${producto.stock}</p>
<a href="#" class="btn btn-primary agregarCesta" data-id="${producto.id}">Agregar a la cesta</a>
</div>
</div>

        </div>
    `);
                contenedorProductos.append(productoHTML);
            });

            // Añadir título y contenedor de productos al DOM
            $('#productos').append(tituloCategoria, contenedorProductos);
        });
    }

    // Guardar productos en el LocalStorage
    localStorage.setItem('productos', JSON.stringify(productos));
    poblarSelectorCategorias();
    mostrarProductos();

    /* Cesta */

    let cesta = [];

    $('#productos').on('click', '.agregarCesta', function (e) {
        e.preventDefault();
        let id = $(this).data('id');
        let productoIndex = productos.findIndex(p => p.id === id);
        if (productos[productoIndex].stock > 0) {
            if (cesta[id]) {
                cesta[id].quantity++;
            } else {
                cesta[id] = {
                    ...productos[productoIndex],
                    quantity: 1
                };
            }
            productos[productoIndex].stock--; // Rebajar el stock
            mostrarProductos();
            mostrarCesta();
        } else {
            alert('No hay stock');
        }
    });

    function mostrarCesta() {
        $('#listaCesta').empty();
        let total = 0;
        let cantidadProductos = Object.values(cesta).reduce((acc, producto) => acc + producto.quantity,
            0);

        if (cantidadProductos > 0) {
            Object.values(cesta).forEach(producto => {
                let li = $(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <img src="${producto.imagen}" alt="${producto.descripcion}" style="width: 50px; height: auto; margin-right: 10px;">
            <span>${producto.codigo} - ${producto.nombre} - €${parseFloat(producto.precio).toFixed(2)} x ${producto.quantity}</span>
            <button class="btn btn-danger btn-sm eliminar-producto" data-id="${producto.id}">Eliminar de la cesta</button>
        </li>
    `);
                $('#listaCesta').append(li);
                total += producto.precio * producto.quantity;
            });
            $('#totalCompra').text(parseFloat(total).toFixed(2));
            $('#realizarPedido').show(); // Mostrar el botón si hay productos en la cesta
        } else {
            $('#listaCesta').html(
                '<li class="list-group-item">Aún no hay productos</li>'
            ); // Mostrar mensaje cuando la cesta esté vacía
            $('#totalCompra').text('0');
            $('#realizarPedido').hide(); // Ocultar el botón "Realizar Pedido" si la cesta está vacía
        }
    }

    $('#realizarPedido').click(function () {
        if (Object.keys(cesta).length > 0) {
            localStorage.setItem('orden', JSON.stringify(cesta));
            cesta = []; // Limpia la cesta
            window.location.href = 'confirmacion.html'; // Redirige a la página de pedido realizado para mostrar el resumen
        } else {
            alert('La cesta está vacía.');
        }
    });

    $(document).on('click', '.eliminar-producto', function () {
        let id = $(this).data('id');
        if (cesta[id].quantity > 1) {
            cesta[id].quantity--;
        } else {
            delete cesta[id];
        }
        mostrarCesta();
    });


    $('#realizarPedido').hide(); // Ocultar el botón al cargar la página

});