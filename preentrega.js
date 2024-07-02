//crear un simulador que al elegir un numero (cada uno con su respectiva bebida) vaya sumando su valor (maximo 10)y que al finalizar sume el total

function simuladorCosto() {
    let totalCosto = 0;

    for (let i = 0; i < 10; i++) {
        let seleccion =prompt("Seleccione un producto: 1. Cerveza - $100  2. Fernet - $200  3. Whisky - $500  4. Vodka - $300  5. Tequila - $400  6. Finalizar compra");


        if (seleccion === "6") {
            alert("El costo total de su compra es: $" + totalCosto);
            return;
        }

        let costo = 0;

        switch (seleccion) {
            case "1":
                costo = 100;
                break;
            case "2":
                costo = 200;
                break;
            case "3":
                costo = 500;
                break;
            case "4":
                costo = 300;
                break;
            case "5":
                costo = 400;
                break;
            default:
                alert("por favor elija un producto del 1 al 5.");
        }

        totalCosto += costo;
    }

    alert("El costo total de su compra es: $" + totalCosto);
}

simuladorCosto();

