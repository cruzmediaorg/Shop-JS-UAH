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

function renderizarFooter() {
    return `
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 px-4 border-top fixed-bottom bg-white">
    <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <svg class="bi" width="30" height="24">
                <use xlink:href="#bootstrap"></use>
            </svg>
        </a>
        <span class="text-muted">© 2024 | Tienda - Luis De la Cruz</span>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3"><a class="text-muted" href="#"><svg class="bi" width="24" height="24">
                    <use xlink:href="#twitter"></use>
                </svg></a></li>
        <li class="ms-10 mr-4"><a href="https://github.com/cruzmediaorg/Shop-JS-UAH" aria-label="Homepage"
                title="Repositorio de GitHub" class=""><svg class="h-[24px] w-[24px] hover:text-gray-300"
                    aria-hidden="true" height="24" version="1.1" viewBox="0 0 16 16" width="24">
                    <path fill-rule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z">
                    </path>
                </svg></a></li>
        <li class="ms-10"><a href="https://www.uah.es/es/" aria-label="Homepage" title="Universidad de Alcalá"
                class=""><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"
                    class="h-[24px] w-[24px] hover:text-gray-300" height="1em" width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192H96z">
                    </path>
                </svg></a></li>
    </ul>
</footer>`;
}

$(document).ready(function () {
    $('#resetstorage').click(function () {
        localStorage.clear();
        window.location.href = "./index.html";
        alert('Storage reiniciado');
    });


    /*
        Renderizar la barra de navegación
    */
    const paginaActual = window.location.pathname.split('/').pop().split('.')[0];
    document.getElementById('barraDeNavegacion').innerHTML = renderizarBarraDeNavegacion(paginaActual);

    /*
        Renderizar el footer
    */

    document.getElementById('footer').innerHTML = renderizarFooter();


});