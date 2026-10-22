let pedidos = [];

// elementos del html
const formularioPedido = document.getElementById("formularioPedido");
const producto = document.getElementById("producto");
const precio = document.getElementById("precio");
const cantidad = document.getElementById("cantidad");
const mensaje = document.getElementById("mensaje");
const tablaPedidos = document.getElementById("tablaPedidos");
const totalUnidades = document.getElementById("totalUnidades");
const montoTotal = document.getElementById("montoTotal");
const precioMaximo = document.getElementById("precioMaximo");
mostrarPedidos(pedidos);

// agregar un pedido.
formularioPedido.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const nombreProducto = producto.value.trim();
    const precioProducto = Number(precio.value);
    const cantidadProducto = Number(cantidad.value);

    if (nombreProducto === "") {
        mensaje.textContent = "Escribe el nombre del producto.";
        mensaje.className = "mt-3 text-danger";
    } else if (precio.value === "" || precioProducto <= 0) {
        mensaje.textContent = "El precio debe ser mayor que cero.";
        mensaje.className = "mt-3 text-danger"
    } else if (
        cantidad.value === "" || cantidadProducto <= 0 ||Number.isInteger(cantidadProducto) === false)
        {
            mensaje.textContent =
            "La cantidad debe ser un entero mayor que cero.";
            mensaje.className = "mt-3 text-danger";
        }

    else {
        const pedido = {
            producto: nombreProducto,
            precio: precioProducto,
            cantidad: cantidadProducto
        };

        // guardar el pedido en el arreglo.
        pedidos.push(pedido);
        // actualizar la tabla y los totales.
        mostrarPedidos(pedidos);

        formularioPedido.reset();
        mensaje.textContent = "Pedido agregado correctamente.";
        mensaje.className = "mt-3 text-success";
        producto.focus();
    }
});

// crear tabla y los totales
function mostrarPedidos(listaPedidos) {
    let tabla = `
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>Producto</th>
                        <th>Precio unitario</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody> `;
    if (listaPedidos.length === 0) {
        tabla += `
            <tr>
                <td colspan="4" class="text-center">
                    No hay pedidos para mostrar.
                </td>
            </tr> `;
    } else {
        tabla += listaPedidos.map(function(pedido) {
            const subtotal = pedido.precio * pedido.cantidad;
            return `
                <tr>
                    <td>${escaparTexto(pedido.producto)}</td>
                    <td>$${pedido.precio.toFixed(2)}</td>
                    <td>${pedido.cantidad}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                </tr> `;
        }).join("");
    }

    tabla += `
                </tbody>
            </table>
        </div>`;

    // insertar la tabla creada en js
    tablaPedidos.innerHTML = tabla;

    // calcular total - unidades
    const unidades = pedidos.reduce(function(total, pedido) {
        return total + pedido.cantidad;
    }, 0);

    // monto total
    const monto = pedidos.reduce(function(total, pedido) {
        return total + pedido.precio * pedido.cantidad;
    }, 0);

    totalUnidades.textContent = unidades;
    montoTotal.textContent = "$" + monto.toFixed(2);
}

// evitar confusion de nombres
function escaparTexto(texto) {
    const elemento = document.createElement("span");
    elemento.textContent = texto;
    return elemento.innerHTML;
}

// filtrar pedidos
document.getElementById("filtrarPedidos")
    .addEventListener("click", function() {
        if (precioMaximo.value === "") {
            mensaje.textContent =
                "Escribe un precio máximo para filtrar.";
            mensaje.className = "mt-3 text-danger";
        } else {
            const maximo = Number(precioMaximo.value);

            const pedidosFiltrados = pedidos.filter(function(pedido) {
                return pedido.precio <= maximo;
            });
            mostrarTablaFiltrada(pedidosFiltrados);
            mensaje.textContent =
                "Se muestran los pedidos que cumplen con el precio máximo.";
            mensaje.className = "mt-3 text-success";
        }
    });

// mostrar los pedidos
document.getElementById("mostrarTodos")
    .addEventListener("click", function() {
        mostrarPedidos(pedidos);
        mensaje.textContent = "";
    });

// eliminar todos los pedidos.
document.getElementById("limpiarPedidos")
    .addEventListener("click", function() {
        pedidos = [];
        mostrarPedidos(pedidos);
        mensaje.textContent = "Se eliminaron todos los pedidos.";
        mensaje.className = "mt-3 text-success";
        precioMaximo.value = "";
    });

// tabla con los pedidos filtrados
function mostrarTablaFiltrada(listaPedidos) {
    let tabla = `
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>Producto</th>
                        <th>Precio unitario</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody> `;
    if (listaPedidos.length === 0) {
        tabla += `
            <tr>
                <td colspan="4" class="text-center">
                    No hay pedidos con ese precio.
                </td>
            </tr> `;
    } else {
        tabla += listaPedidos.map(function(pedido) {
            const subtotal = pedido.precio * pedido.cantidad;
            return `
                <tr>
                    <td>${escaparTexto(pedido.producto)}</td>
                    <td>$${pedido.precio.toFixed(2)}</td>
                    <td>${pedido.cantidad}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                </tr> `;
        }).join("");
    }
    tabla += `
                </tbody>
            </table>
        </div> `;
    tablaPedidos.innerHTML = tabla;
}
