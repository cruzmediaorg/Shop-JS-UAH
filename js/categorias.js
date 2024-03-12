$(document).ready(function () {
    let categorias = JSON.parse(localStorage.getItem('categorias')) || [];

    function cargarCategorias() {
        let htmlCategorias = categorias.map((categoria, index) => `
    <tr>
        <td>${categoria}</td>
        <td>
            <button class="btn btn-info editarCategoria" data-index="${index}">Editar</button>
            <button class="btn btn-danger eliminarCategoria" data-index="${index}">Eliminar</button>
        </td>
    </tr>
`).join('');

        $('#tablaCategorias tbody').html(htmlCategorias);
    }

    $(document).on('click', '#btnAgregarCategoria', function () {
        $('#categoriaModalLabel').text('Agregar Nueva Categoría');
        $('#nombreCategoria').val('');
        $('#categoriaModal').modal('show');
    });

    $(document).on('click', '.editarCategoria', function () {
        let index = $(this).data('index');
        $('#categoriaModalLabel').text('Editar Categoría');
        $('#nombreCategoria').val(categorias[index]);
        $('#guardarCategoria').data('index',
            index); // Guardamos el índice en el botón de guardar
        $('#categoriaModal').modal('show');
    });

    $(document).on('click', '.eliminarCategoria', function () {
        let index = $(this).data('index');
        if (confirm('¿Estás seguro de eliminar esta categoría?')) {
            categorias.splice(index, 1);
            localStorage.setItem('categorias', JSON.stringify(categorias));
            cargarCategorias();
        }
    });

    $(document).on('click', '#guardarCategoria', function () {
        let nombre = $('#nombreCategoria').val().trim();
        let index = $(this).data('index');

        if (nombre === '') {
            alert('El nombre de la categoría no puede estar vacío.');
            return;
        }

        if (index !== undefined) {
            // Editamos una categoría existente
            categorias[index] = nombre;
        } else {
            // Agregamos una nueva categoría
            if (categorias.includes(nombre)) {
                alert('Esta categoría ya existe.');
                return;
            }
            categorias.push(nombre);
        }

        localStorage.setItem('categorias', JSON.stringify(categorias));
        $('#categoriaModal').modal('hide');
        cargarCategorias();
        $('#guardarCategoria').removeData('index');
    });

    cargarCategorias();
});