// acceder al contenedor donde se mostrara los estudiantes
const containerEstudiantes = document.querySelector("#idContainerEstudiantes");

// acceder a cada boton por medio de la API DOM
const btnPromedio = document.querySelector("#idBtnPromedio");

// agregar el evento click a los botones, adicionalmente
// se le asigna la funcion que realizará la operación
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes() {
    // utilizar un arreglo para guardar la informacion del estudiante
    let arrayEstudiante = new Array();

    let totalEstudiantes = document.querySelector(
        "#inputNumeroEstudiantes"
    ).value;
    let contador = 1;

    // utilizar un while para recorrer el total de estudiantes
    let estudiante,
        calificacion,
        convertir = 0;
    while (contador <= totalEstudiantes) {
        estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);

        // verificar que sea un valor entero positivo
        //y que se encuentre en el rango de 0 - 10
        do {
            calificacion = prompt(
                `Ingrese la calificacion del estudiante ${contador}`
            );

            convertir = parseFloat(calificacion);
        } while (isNaN(convertir) || convertir < 0 || convertir > 10);

        // asignar los valores al arreglo
        arrayEstudiante[contador - 1] = new Array(
            estudiante,
            parseFloat(calificacion).toFixed(2)
        );
        contador++;
    }

    // recorrer el arreglo con for..of
    // verificar cual es el promedio de las calificaciones
    // y cual de los estudiantes posee la calificaicon mas alta
    let calificacionAlta = 0,
        promedio = 0,
        posicion = 0;

    let listado = "<h3>Listado de estudiantes registrados</h3>";
    listado += "<ol>";
    for (let indice of arrayEstudiante) {
        let nombre = indice[0];
        let nota = indice[1];
        
        // imprimir lista de estudiantes
        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b> ${nota}</li>`;

        // verificar de calificacion mas alta
        if (nota > calificacionAlta) {
            posicion = indice;
        }

        // calcular el promedio
        promedio += parseFloat(nota);
    }
    listado += "</ol>";
    promedio = parseFloat(promedio / arrayEstudiante.length).toFixed(2);
    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}`;
    listado += `<br><b>Estudiante con mejor calificación:</b> ${posicion[0]}</p>`;

    // imprimir resultado
    containerEstudiantes.innerHTML = listado;
}