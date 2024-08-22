let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const renderProducts = (arrayProductos) => {
    let containerProducts = document.getElementById("products-container");
    containerProducts.innerHTML = "";

    arrayProductos.forEach((producto) => {
        let productCard = document.createElement("div");
        productCard.className = "producto";
        productCard.innerHTML = ` 
            <img class="image" src=${producto.image} />
            <h3 class="title">${producto.title}</h3>
            <p class="stock">Stock: ${producto.stock}</p>
            <p class="price">$${producto.price}</p>
            <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        containerProducts.appendChild(productCard);
    });
};

const renderFilters = () => {
    let filterContainer = document.getElementById("filters");
    filterContainer.innerHTML = "";


    let btnInicio = document.createElement("button");
    btnInicio.innerText = "Inicio";
    btnInicio.addEventListener("click", () => {
        window.location.href = "./index.html"; // Redirige al inicio 
        renderProducts(productos);
    });
    filterContainer.appendChild(btnInicio);

    // Botones de filtrado para las categorías
    let btnAperitivos = document.createElement("button");
    btnAperitivos.innerText = "Aperitivos";
    btnAperitivos.addEventListener("click", () => filterByType("aperitivos"));
    filterContainer.appendChild(btnAperitivos);

    let btnCerveza = document.createElement("button");
    btnCerveza.innerText = "Cervezas";
    btnCerveza.addEventListener("click", () => filterByType("cervezas"));
    filterContainer.appendChild(btnCerveza);

    let btnSpirits = document.createElement("button");
    btnSpirits.innerText = "Spirits";
    btnSpirits.addEventListener("click", () => filterByType("spirits"));
    filterContainer.appendChild(btnSpirits);

    let btnVino = document.createElement("button");
    btnVino.innerText = "Vinos";
    btnVino.addEventListener("click", () => filterByType("vinos"));
    filterContainer.appendChild(btnVino);

    let btnEspumante = document.createElement("button");
    btnEspumante.innerText = "Espumantes";
    btnEspumante.addEventListener("click", () => filterByType("espumantes"));
    filterContainer.appendChild(btnEspumante);
};


const filterByType = (type) => {
    let arrayFiltrado = productos.filter((producto) =>
        producto.category === type || type === "todos"
    );
    renderProducts(arrayFiltrado);
};

const setupSearch = () => {
    const inputSearch = document.getElementById("search");
    if (inputSearch) {
        inputSearch.addEventListener("input", (evento) => {
            let value = evento.target.value.toLowerCase();
            let arrayFiltrado = productos.filter((producto) =>
                producto.title.toLowerCase().includes(value)
            );
            renderProducts(arrayFiltrado);
        });
    }
};

const agregarAlCarrito = (id) => {
    let producto = productos.find((elemento) => elemento.id === id);
    let productoEnElCarrito = carrito.find((elemento) => elemento.id === id);

    if (productoEnElCarrito) {
        if (productoEnElCarrito.quantity < producto.stock) {
            productoEnElCarrito.quantity += 1;
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado al carrito',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
        } else {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'No hay más stock disponible de este producto',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
        }
    } else {
        if (producto.stock > 0) {
            carrito.push({ ...producto, quantity: 1 });
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado al carrito',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
            });
        } else {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'No hay más stock disponible de este producto',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

document.addEventListener("DOMContentLoaded", () => {
    fetch("./data.json")
        .then((res) => res.json())
        .then((res) => {
            productos = res;

            // Filtrar productos destacados
            let productosDestacados = productos.filter(producto => producto.destacado);

            renderProducts(productosDestacados); 

            localStorage.setItem('productos', JSON.stringify(productos));
        })
        .catch((error) => console.error("Error al cargar productos:", error));

    renderFilters();
    setupSearch();
});