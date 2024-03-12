function renderizarBarraDeNavegacion(paginaActual) {
    return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <a class="navbar-brand" href="#"><img src="images/logo.svg" height="30" /></a>

        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item ${paginaActual === 'index' ? 'active' : ''}">
                    <a class="nav-link" href="./index.html">Tienda</a>
                </li>

                <li class="nav-item dropdown ${paginaActual === 'productos' ? 'active' : ''}">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Administración
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item ${paginaActual === 'productos' ? 'active' : ''}" href="./productos.html">Productos <span
                                class="sr-only">(current)</span></a>
                        <a class="dropdown-item ${paginaActual === 'categorias' ? 'active' : ''}" href="./categorias.html">Categorías</a>
                    </div>
                </li>
            </ul>
        </div>
        <button class="btn btn-outline-success my-2 my-sm-0" id="resetstorage" type="submit">Reiniciar storage</button>
    </nav>
    `;
}

$(document).ready(function () {
    $('#resetstorage').click(function () {
        localStorage.clear();
        window.location.href = "./index.html";
    });

    /*
        Renderizar la barra de navegación
    */
    const paginaActual = window.location.pathname.split('/').pop().split('.')[0];
    document.getElementById('barraDeNavegacion').innerHTML = renderizarBarraDeNavegacion(paginaActual);


});