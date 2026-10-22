function aviso () {
    alert("Bienvenido al mundo JavaScript")
}

function confirmacion () {
    // los valore que puede almacenar la variable confirmacion
    // true o false
    let confirmacion = confirm("¿desea salir de la sesión?");
    /* para imprimir una variable en una cadena podemos utilizar las comillas simples inversas `` 
    y luego hacemos el llamado de la variable con ${aqui debera de escribir el nombre de la variable}*/
    alert(`Valor seleccionado ${confirmacion}`);

}

function capturarDatos() {
    let nombre = prompt("¿Cuál es su nombre?")
    // notese que en campo de prompt se mostrara 0 por defecto
    let edad = prompt("¿Cu´sl es du edad?", 0);

    alert(`Su nombre es ${nombre} y su edad ${edad}`);
}

function dibujarParrafo() {
    let parrafo = prompt("escriba la información que desea visualizar en el parrafo");
    /* utilizaremos la API DOM para acceder al elemento <p id="idParrafo"></p> que hemos
    creado en nuestro documento html*/

    const p = document.querySelector("#idParrafo");
    p.innerHTML = parrafo;
}