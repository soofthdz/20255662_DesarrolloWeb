// acceder al contenedor donde se mostrara los estudiantes
const containerArreglo = document.querySelector("#idContainerArreglo");
const containerArregloOrdenado = document.querySelector(
    "#idContainerArregloOrdenado"
);

// acceder a cada boton por medio de la API DOM
const btnAgregar = document.querySelector("#idBtnAgregar");
const btnOrdenar = document.querySelector("#idBtnOrdenar");

// agregar el evento click a los botones, adicionalmente
// se le asigna la funcion que realizará la operación
btnAgregar.addEventListener("click", agregarElemento);
btnOrdenar.addEventListener("click", ordenarElementos);

let arreglo = new Array();

function agregarElemento() {
    const numero = parseInt(document.querySelector("#inputNumero").value);
    // verificar que sea un numero
    if (isNaN(numero)) {
        alert("Debe ingresar un numero válido");
    } else {
        // agregar un nuevo alemento al arreglo
        arreglo.push(numero);

        // utilizar la API DOM para crear un elemento html
        let caja = document.createElement("div"); //Creamos un elemento <div></div>
        caja.className = "col-md-1 colum"; //Agregamos una clase al elemento <div></div>
        let valor = document.createElement("h3"); //Creamos un elemento <h3></h3>
        valor.textContent = numero; //Agregamos texto al elemento <h3></h3>
        caja.appendChild(valor); //Le pasamos como hijo la etiqueta <h3></h3> a nuestro <div></div>

        // insertar los nuevos elementos en el contenedor
        // se utiliza beforeend para insertar el nuevo
        // elemento dentro del idContainerArreglo y despues de su ultimo hijo
        containerArreglo.insertAdjacentElement("beforeend", caja);
    }
}

function ordenarElementos() {
    // utilizar un for...of para recorrer el arreglo
    // a su vez se utilizara .sort() para ordenarlo
    for (let i of arreglo.sort()) {
        let caja = document.createElement("div");
        caja.className = "col-md-1 colum-green";
        let valor = document.createElement("h3");
        valor.textContent = i;
        caja.appendChild(valor);
        containerArregloOrdenado.insertAdjacentElement("beforeend", caja);
    }
}