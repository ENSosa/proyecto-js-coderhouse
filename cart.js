let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = JSON.parse(localStorage.getItem('productos')) || [];

const renderProducts = (arrayProductos) => {
    let containerCart = document.getElementById("container-cart");
    containerCart.innerHTML = "";

    arrayProductos.forEach((producto) => {
        let productCard = document.createElement("div");
        productCard.className = "producto";
        productCard.innerHTML = `
            <img class="image" src=${producto.image} />
            <h3 class="title">${producto.title}</h3>
            <p>${producto.description}</p>
            <p class="price">$${producto.price}</p>
            <div class="container-btns">
                <button class="btn-restar" onclick="restarCantidad(${producto.id})"> - </button>
                <p class="quantity">${producto.quantity}</p>
                <button class="btn-sumar" onclick="sumarCantidad(${producto.id})"> + </button>
            </div>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        `;
        containerCart.appendChild(productCard);
    });

    actualizarTotalCarrito();
};

const eliminarDelCarrito = (id) => {
    carrito = carrito.filter((elemento) => elemento.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
};

const restarCantidad = (id) => {
    let productoEncontrado = carrito.find((elemento) => elemento.id === id);
    if (productoEncontrado && productoEncontrado.quantity > 1) {
        productoEncontrado.quantity -= 1;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderProducts(carrito);
    } else if (productoEncontrado && productoEncontrado.quantity === 1) {
        eliminarDelCarrito(productoEncontrado.id);
    }
};

const sumarCantidad = (id) => {
    let productoEncontrado = carrito.find((elemento) => elemento.id === id);
    let productoOriginal = productos.find((elemento) => elemento.id === id);

    if (productoEncontrado && productoOriginal && productoEncontrado.quantity < productoOriginal.stock) {
        productoEncontrado.quantity += 1;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderProducts(carrito);
    } else {
        alert("No hay más stock disponible de este producto.");
    }
};

const actualizarTotalCarrito = () => {
    let total = carrito.reduce((acc, producto) => acc + producto.price * producto.quantity, 0);
    document.getElementById("total-cart").innerText = `Total de la compra: $${total}`;
};

renderProducts(carrito);
