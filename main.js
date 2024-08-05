const productos = [
    {
        id: 1,
        category: "cerveza",
        description: "",
        image: "./assets/imperial-ipa.webp",
        price: 2600,
        rating: 4.7,
        title: "Imperial IPA",
        stock: 10,
    },
    {
        id: 2,
        category: "cerveza",
        description: "",
        image: "./assets/imperial-golden.webp",
        price: 2400,
        rating: 4.6,
        title: "Imperial GOLDEN",
        stock: 10,
    },
    {
        id: 3,
        category: "cerveza",
        description: "",
        image: "assets/imperial-lager.webp",
        price: 2400,
        rating: 4.5,
        title: "Imperial LAGER",
        stock: 8,
    },
    {
        id: 4,
        category: "cerveza",
        description: "",
        image: "./assets/heineken.webp",
        price: 3000,
        rating: 4.3,
        title: "Heineken",
        stock: 15,
    },
    {
        id: 5,
        category: "cerveza",
        description: "",
        image: "assets/schneider-473ml.webp",
        price: 1100,
        rating: 4.3,
        title: "Scheneider 473ml",
        stock: 8,
    },
    {
        id: 6,
        category: "cerveza",
        description: "",
        image: "assets/miller-473ml.webp",
        price: 1350,
        rating: 4.3,
        title: "Miler 473ml",
        stock: 15,
    },
    {
        id: 7,
        category: "cerveza",
        description: "",
        image: "assets/quilmes-473ml.webp",
        price: 1100,
        rating: 4.3,
        title: "Quilmes 473ml",
        stock: 15,
    },
    {
        id: 8,
        category: "vodka",
        description: "",
        image: "assets/sernova.webp",
        price: 5300,
        rating: 4.3,
        title: "Sernova ",
        stock: 5,
    },
    {
        id: 9,
        category: "vodka",
        description: "",
        image: "assets/smirnoff-rasberry1.webp",
        price: 6600,
        rating: 4.3,
        title: "Smirnoff Rasberry",
        stock: 5,
    },
    {
        id: 10,
        category: "vodka",
        description: "",
        image: "assets/absolut-apeach.webp",
        price: 19800,
        rating: 4.3,
        title: "Absolute Apeach",
        stock: 3,
    },
    {
        id: 11,
        category: "vodka",
        description: "",
        image: "assets/smirnoff-watermelon1.webp",
        price: 7000,
        rating: 4.3,
        title: "Smirnoff Watermelon",
        stock: 5,
    },
    {
        id: 12,
        category: "vino",
        description: "",
        image: "assets/alma-mora.webp",
        price: 5000,
        rating: 4.3,
        title: "Alma Mora",
        stock: 3,
    },
    {
        id: 13,
        category: "vino",
        description: "",
        image: "assets/portillo-malbec.webp",
        price: 4600,
        rating: 4.3,
        title: "Portillo Malbec",
        stock: 4,
    },
    {
        id: 14,
        category: "vino",
        description: "",
        image: "assets/novecento-malbec.webp",
        price: 3600,
        rating: 4.3,
        title: "Novecento Malbec",
        stock: 4,
    },
    {
        id: 15,
        category: "vino",
        description: "",
        image: "assets/cosecha-tardia.webp",
        price: 3700,
        rating: 4.3,
        title: "Cosecha Tardia",
        stock: 6,
    },
    {
        id: 16,
        category: "vino",
        description: "",
        image: "assets/santa-julia.webp",
        price: 4600,
        rating: 4.3,
        title: "Santa Julia Malbec",
        stock: 6,
    },
];

localStorage.setItem('productos', JSON.stringify(productos));

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
            <p>${producto.description}</p>
            <p class="price"> $${producto.price}</p>
            <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">agregar al carrito</button>
        `;
        containerProducts.appendChild(productCard);
    });
};

const renderFilters = () => {
    let filterContainer = document.getElementById("filters");
    filterContainer.innerHTML = "";

    // Creo un filtro por tipo de bebida
    let filterTypeLabel = document.createElement("h3");
    filterContainer.appendChild(filterTypeLabel);

    let filterTypeSelect = document.createElement("select");
    filterTypeSelect.id = "filter-type";
    filterTypeSelect.innerHTML = `
        <option value="todos">Todos</option>
        <option value="cerveza">Cerveza</option>
        <option value="vino">Vino</option>
        <option value="vodka">Vodka</option>
    `;
    filterContainer.appendChild(filterTypeSelect);

    // Creo un filtro para odenar precios
    let sortPriceLabel = document.createElement("h3");
    filterContainer.appendChild(sortPriceLabel);

    let sortPriceSelect = document.createElement("select");
    sortPriceSelect.id = "sort-price";
    sortPriceSelect.innerHTML = `
        <option value="default">Seleccionar</option>
        <option value="asc">Menor a mayor</option>
        <option value="desc">Mayor a menor</option>
    `;
    filterContainer.appendChild(sortPriceSelect);
};

//funcion para agregar productos 
const agregarAlCarrito = (id) => {
    let producto = productos.find((elemento) => elemento.id === id);
    let productoEnElCarrito = carrito.find((elemento) => elemento.id === id);


    if (productoEnElCarrito) {
        if (productoEnElCarrito.quantity < producto.stock) {
            productoEnElCarrito.quantity += 1;
        } else {
            alert("No hay más stock disponible de este producto.");
        }
    } else {
        if (producto.stock > 0) {
            carrito.push({ ...producto, quantity: 1 });
        } else {
            alert("No hay más stock disponible de este producto.");
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

//funcion para filtrar por tipo
const filterByType = (type) => {
    let arrayFiltrado = productos.filter((producto) =>
        producto.category === type || type === "todos"
    );
    renderProducts(arrayFiltrado);
};
//funcion para odenar
const sortByPrice = (order) => {
    let arraySorted = [...productos];
    if (order === "asc") {
        arraySorted.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
        arraySorted.sort((a, b) => b.price - a.price);
    }
    renderProducts(arraySorted);
};



const setupFilterByType = () => {
    const filterTypeSelect = document.getElementById("filter-type");
    filterTypeSelect.addEventListener("change", (evento) => {
        filterByType(evento.target.value);
    });
};


const setupSortByPrice = () => {
    const sortPriceSelect = document.getElementById("sort-price");
    sortPriceSelect.addEventListener("change", (evento) => {
        sortByPrice(evento.target.value);
    });
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

renderFilters();
setupFilterByType();
setupSortByPrice();
setupSearch();
renderProducts(productos);




