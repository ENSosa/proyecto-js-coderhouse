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
            <p class="stock">Stock: ${producto.stock}</p>
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
};

const eliminarDelCarrito = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Este producto será eliminado del carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = carrito.filter((elemento) => elemento.id !== id);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderProducts(carrito);

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Producto eliminado del carrito',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
        }
    });
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
};

const finalizarCompra = () => {
    let total = carrito.reduce((acc, producto) => acc + producto.price * producto.quantity, 0);
    // Muestra el total en una alerta de SweetAlert
    Swal.fire({
        title: 'Compra Finalizada',
        text: `El total de la compra es: $${total}`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        timer: 5000,  
        timerProgressBar: true
    }).then(() => {
        // Limpia el carrito después de finalizar la compra
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderProducts(carrito); 
    });
};
renderProducts(carrito);