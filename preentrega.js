// Lista de productos disponibles
const productos = [
    { nombre: "Imperial IPA", tipo: "cerveza", precio: 2600, stock: 10 },
    { nombre: "Imperial GOLDEN", tipo: "cerveza", precio: 2400, stock: 10 },
    { nombre: "Imperial LAGER", tipo: "cerveza", precio:2400 , stock:5  },
    { nombre: "Heineken", tipo: "cerveza",  precio:3000 , stock:8  },
    { nombre: "Scheneider 473ml", tipo: "cerveza", precio: 1200, stock: 10 },
    { nombre: "Miler 473ml", tipo: "cerveza",  precio:1350 , stock:7  },
    { nombre: "Quilmes 473ml", tipo: "cerveza",  precio:1100 , stock:12  },
    { nombre: "Sernova 700ml", tipo: "vodka", precio:5300 , stock:5 },
    { nombre: "Smirnoff Rasberry", tipo: "vodka", precio:6600 , stock:3 },
    { nombre: "Absolute Apeach", tipo: "vodka", precio:19800 , stock:3 },
    { nombre: "Absolute Lime", tipo: "vodka", precio:19800 , stock:1 },
    { nombre: "Smirnoff Watermelon", tipo: "vodka", precio:7000 , stock:3 },
    { nombre: "Alma Mora", tipo: "vino", precio:5000 , stock:5 },
    { nombre: "Portillo Malbec", tipo: "vino", precio:4600 , stock:7 },
    { nombre: "Novecento Malbec", tipo: "vino", precio:3600 , stock:5 },
    { nombre: "Cosecha Tardia", tipo: "vino", precio:3700 , stock:8 }, 
    { nombre: "Santa Julia Malbec", tipo: "vino", precio:4600 , stock:5 },
    
];

let carrito = [];

// Función para comenzar el proceso de la compra
let comenzar = () => {
    let ingresar = prompt("¿Es mayor de 18?\n1. Sí\n2. No");

    if (ingresar === "1") {
        let seguirComprando = true;

        while (seguirComprando) {
            let tipoBebida = prompt("¿Qué tipo de bebidas quiere comprar?\n1. Cervezas\n2. Vino\n3. Vodka\n4. Licor");
            procesarCompra(tipoBebida);

            let seguir = prompt("¿Quieres seguir comprando?\n1. Sí\n2. No");
            if (seguir !== "1") {
                seguirComprando = false;
            }
        }

        // Calculo y muestro el total
        let total = carrito.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);
        alert("El total de tu compra es: $" + total);
    } else {
        alert("Lo siento, debe ser mayor de 18 años para continuar.");
    }
};

// Función para procesar la compra según el tipo de bebida
let procesarCompra = (tipoBebida) => {
    if (tipoBebida === "1" || tipoBebida === "2" || tipoBebida === "3" || tipoBebida === "4") {
        filtrarTipos(tipoBebida);
    } else {
        alert("Selección no válida. Por favor, intente de nuevo.");
    }
};

// Función para ir filtrando los productos según el tipo de bebida que elija el usuario
let filtrarTipos = (tipoBebida) => {
    let tipoSeleccionado = "";

    switch (tipoBebida) {
        case "1":
            tipoSeleccionado = "cerveza";
            break;
        case "2":
            tipoSeleccionado = "vino";
            break;
        case "3":
            tipoSeleccionado = "vodka";
            break;
        case "4":
            tipoSeleccionado = "licor";
            break;
    }

    let productosFiltrados = productos.filter(producto => producto.tipo === tipoSeleccionado);

    if (productosFiltrados.length > 0) {
        let opciones = "Tenemos las siguientes opciones:\n" + productosFiltrados.map((producto, index) => `${index + 1}. ${producto.nombre} - $${producto.precio} (Stock: ${producto.stock})`).join("\n");
        let seleccion = prompt(opciones);

        let productoSeleccionado = productosFiltrados[parseInt(seleccion) - 1];

        if (productoSeleccionado) {
            let cantidad = parseInt(prompt(`Ha seleccionado: ${productoSeleccionado.nombre}\nPrecio: $${productoSeleccionado.precio}\n¿Cuántas unidades quiere agregar al carrito?`));

            if (cantidad > 0 && cantidad <= productoSeleccionado.stock) {
                agregarAlCarrito(productoSeleccionado, cantidad);
            } else {
                alert("Cantidad no válida o stock insuficiente.");
            }
        } else {
            alert("Producto no encontrado.");
        }
    } else {
        alert("No tenemos productos disponibles para su selección.");
    }
};

// Función para agregar productos al carrito
let agregarAlCarrito = (producto, cantidad) => {
    let productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
    } else {
        carrito.push({ nombre: producto.nombre, precio: producto.precio, cantidad: cantidad });
    }

    producto.stock -= cantidad;

    alert(`Has agregado ${cantidad} unidad(es) de ${producto.nombre} al carrito.`);
};

// Llamo a la función comenzar para iniciar el proceso
comenzar();


