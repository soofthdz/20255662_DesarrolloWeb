// generar un numero aleatorio que se encuentre en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
// crear una constante que permite identificar el max de intentos
const numeroIntentos = 3;
// guardara el numero de intentos que realiza el usuario
let intentos = 1;

function generarNumeroAleatorio() {
    // definir variable para impresion de mensajes
    let mensaje;
    // utilizar el dom para acceder al parrafo creado
    const parrafo = document.querySelector("#idParrafo");

    // verificar en que intento esta el usuario
    if (intentos <= numeroIntentos) {
        let numero = prompt(
            "¿Qué número se ha generado (Intento " + intentos + ")?"
        );
        // verificar el num aleatorio con el ingresado por el usuario
        if (numero == numeroAleatorio) {
            mensaje = `¡Es sorprendente, pudiste adivinar el numero oculto (${numeroAleatorio}). Refresque la página para volver a jugar.`;
        } else if (intentos == numeroIntentos) {
            mensaje = `Su número de intentos ha terminado. El número oculato era: ${numeroAleatorio}. Refresque la página para volver a jugar.`; 
        } else {
            const pista = numeroAleatorio > numero ? "más alto" : "más bajo";
            mensaje = `Vuelve a intentar. El número que buscas es ${pista} que ${numero}.
            Quedan ${numeroIntentos - intentos} intentos`;
        }

        // aumentar el valor de los intentos
        intentos++
    } else {
        mensaje = `Su número de intentos ha terminado. EL número oculato era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }

    parrafo.innerHTML = mensaje;    
}
