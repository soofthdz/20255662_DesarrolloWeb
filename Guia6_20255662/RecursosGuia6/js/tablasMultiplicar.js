// acceder al contenedor donde se mostrara los estudiantes
const containerResultado = document.querySelector("#idContainerResultado");

// accerder a cada boton por medio de la API DOM
const btnCalcular = document.querySelector("#idBtnCalcular");

// agregar el evento click al boton calcular
// asignar la funcion que realizará la operación
btnCalcular.addEventListener("click", calcularTabla);

function calcularTabla() {
    // capturar el valor del campo
    const inputTabla = document.querySelector("#inputTabla").value;
    
    // iniciar nuestro contador
    let contador = 1;
    
    // verificar que el dato colocado sea un numero entero positivo
    if (inputTabla > 0) {
        let tabla = `<h2>Tabla de multiplicar del ${inputTabla}</h2>`;
        // utilizar do while para generar la tabla de multiplicar
        // que el usuario ha indicado
        do {
            let resultado = contador * inputTabla;
            tabla += `<div class="row text-center">`;
            tabla += `<div class="col-md-1 colum"><h3>${contador}</h3></div>`;
            tabla += `<div class="col-md-1 colum-green"><h3>x</h3></div>`;
            tabla += `<div class="col-md-1 colum"><h3>${inputTabla}</h3></div>`;
            tabla += `<div class="col-md-1 colum-green"><h3>=</h3></div>`;
            tabla += `<div class="col-md-1 colum"><h3>${resultado}</h3></div>`;
            tabla += `</div>`;
            
            //incrementar el valor del contador
            //para que podamos salir del do while
            contador++;
        } while (contador <= 12);
        
        document.querySelector("#inputTabla").value = 1;
        document.querySelector("#inputTabla").focus();
        containerResultado.innerHTML = tabla;
    } else {
        alert("No se ha ingresado un número válido");
    }
}