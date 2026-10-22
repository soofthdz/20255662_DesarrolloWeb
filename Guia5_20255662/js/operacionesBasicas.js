// acceder al parrafo que nos permitira imprimir el resultado
const parrafo = document.querySelector("#idParrafo");
console.log(parrafo);

// acceder a cada boton por medio de API DOM
const btnSumar = document.querySelector("#idBtnSumar");
const btnRestar = document.querySelector("#idBtnRestar");
const btnMultiplicar = document.querySelector("#idBtnMultiplicar");
const btnDividir = document.querySelector("#idBtnDividir");

// agregar el evento click a los botones
// se asgina la funcion que realizara la operacion
btnSumar.addEventListener("click", sumar);
btnRestar.addEventListener("click", restar);
btnMultiplicar.addEventListener("click", multiplicar);
btnDividir.addEventListener("click", dividir);

// crear la variable que tendra el valor del resultado de la operacion matematica
let resultado;

// funcion de operaciones
function sumar() {
    let numero1 = parseFloat(prompt("Ingrese el primer numero a sumar"));
    let numero2 = parseFloat(prompt("Ingrese el segundo numero a sumar"));
    resultado = numero1 + numero2;
    parrafo.innerHTML = `'${numero1} + ${numero2} = ${resultado}';`;
}

function restar() {
    let numero1 = parseFloat(prompt("Ingrese el primer numero a restar"));
    let numero2 = parseFloat(prompt("Ingrese el segundo numero a restar"));
    resultado = numero1 - numero2;
    parrafo.innerHTML = `${numero1} - ${numero2} = ${resultado}`;
}

function multiplicar() {
    let numero1 = parseFloat(prompt("Ingrese el primer numero a multiplicar"));
    let numero2 = parseFloat(prompt("Ingrese el segundo numero a multiplicar"));
    resultado = numero1 * numero2;
    parrafo.innerHTML = `${numero1} * ${numero2} = ${resultado}`;
}

function dividir() {
    let numero1 = parseFloat(prompt("Ingrese el primer numero a dividir"));
    let numero2 = parseFloat(prompt("Ingrese el segundo numero a dividir"));
    let mensaje;
    if (numero != 0) {
        resultado = numero1 / numero2;
        mensaje = `${numero1} / ${numero2} = ${resultado}`;
    } else {
        mensaje = `El valor ${numero1} / ${numero2} no se puede dividir`;
    }

    parrafo.innerHTML = mensaje;
}