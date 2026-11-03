/* simbolos usados:
   ^        inicio del texto    $       fin del texto
   \d       un digito (0-9)   {n}     exactamente n veces
   [A-Za-z] una letra    +     una o mas veces
   \p{L}    cualquier letra (incluye acentos y ñ, requiere la bandera u)
   \s       un espacio  ( )    grupo
*/

// expresiones regulares
const regexCarnet = /^[A-Za-z]{2}\d{3}$/; // AB001
const regexNombre = /^\p{L}+(?:\s\p{L}+)+$/u; // minimo dos palabras, solo letras
const regexDui = /^\d{8}-\d$/; // ########-#
const regexNit = /^\d{4}-\d{6}-\d{3}-\d$/; // ####-######-###-#
const regexFecha = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; // dd/mm/aaaa
const regexCorreo = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const regexEdad = /^\d{1,3}$/; // solo numeros

// validaciones extra 

// la regex acepta 31/02/2000, por eso se comprueba que la fecha exista
// y que no sea una fecha futura
const fechaValida = (texto) => {
    if (!regexFecha.test(texto)) return false;

    const [dia, mes, anio] = texto.split("/").map(Number);
    const fecha = new Date(anio, mes - 1, dia);

    const existe =
        fecha.getFullYear() === anio &&
        fecha.getMonth() === mes - 1 &&
        fecha.getDate() === dia;

    return existe && fecha <= new Date() && anio >= 1900;
};

const edadValida = (texto) => {
    if (!regexEdad.test(texto)) return false;
    const edad = parseInt(texto);
    return edad >= 1 && edad <= 120;
};

// configuracion de campos
// los campos tienen: id, funcion que valida, regex a mostrar y ejemplo
const campos = [
    {
        id: "idCarnet",
        nombre: "Carnet",
        regex: String(regexCarnet),
        ejemplo: "AB001",
        validar: (v) => regexCarnet.test(v),
    },
    {
        id: "idNombreCompleto",
        nombre: "Nombre completo",
        regex: String(regexNombre),
        ejemplo: "Marcos Alas",
        // se quitan espacios sobrantes antes de validar
        validar: (v) => regexNombre.test(v.trim().replace(/\s+/g, " ")),
    },
    {
        id: "idDui",
        nombre: "DUI",
        regex: String(regexDui),
        ejemplo: "01234567-8",
        validar: (v) => regexDui.test(v),
    },
    {
        id: "idNit",
        nombre: "NIT",
        regex: String(regexNit),
        ejemplo: "0614-010190-101-3",
        validar: (v) => regexNit.test(v),
    },
    {
        id: "idFechaNacimiento",
        nombre: "Fecha de nacimiento",
        regex: String(regexFecha),
        ejemplo: "15/03/2001",
        validar: fechaValida,
    },
    {
        id: "idCorreo",
        nombre: "Correo electrónico",
        regex: String(regexCorreo),
        ejemplo: "usuario@correo.com",
        validar: (v) => regexCorreo.test(v),
    },
    {
        id: "idEdad",
        nombre: "Edad",
        regex: String(regexEdad),
        ejemplo: "20",
        validar: edadValida,
    },
];

const form = document.getElementById("idFormEstudiante");
const resultado = document.getElementById("idResultado");
const btnLimpiar = document.getElementById("idBtnLimpiar");

// marca el input como valido/invalido con las clases de bootstrap
const validarCampo = (campo) => {
    const input = document.getElementById(campo.id);
    const valor = input.value.trim();
    const esValido = campo.validar(valor);

    input.classList.toggle("is-valid", esValido);
    input.classList.toggle("is-invalid", !esValido);
    return esValido;
};

// validacion en tiempo real: al escribir y al salir del campo
campos.forEach((campo) => {
    const input = document.getElementById(campo.id);

    input.addEventListener("input", () => {
        // los campos de solo numeros no aceptan letras
        if (campo.id == "idEdad") {
            input.value = input.value.replace(/\D/g, "");
        }
        // hasta que el usuario empiece a escribir no se marca error
        if (input.value.trim() !== "") validarCampo(campo);
        else input.classList.remove("is-valid", "is-invalid");
    });

    input.addEventListener("blur", () => {
        if (input.value.trim() !== "") validarCampo(campo);
    });
});

// al enviar se validan todos los campos
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // validar todos 
    const resultados = campos.map((campo) => validarCampo(campo));
    const todoValido = resultados.every((r) => r);

    if (todoValido) {
        resultado.innerHTML = `
            <div class="alert alert-success" role="alert">
                <i class="bi bi-check-circle-fill"></i>
                ¡Ficha válida! Todos los datos cumplen con el formato requerido.
            </div>`;
    } else {
        const errores = campos
            .filter((_, i) => !resultados[i])
            .map((c) => `<li>${c.nombre}</li>`)
            .join("");

        resultado.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-triangle-fill"></i>
                Corrija los siguientes campos:
                <ul class="mb-0">${errores}</ul>
            </div>`;
        // enfocar el primer campo con error
        const primerError = campos.find((_, i) => !resultados[i]);
        document.getElementById(primerError.id).focus();
    }
});

btnLimpiar.addEventListener("click", () => {
    form.reset();
    resultado.innerHTML = "";
    campos.forEach((c) =>
        document.getElementById(c.id).classList.remove("is-valid", "is-invalid")
    );
    document.getElementById(campos[0].id).focus();
});

// llenar la tabla que muestra las regex usadas
document.getElementById("idTablaRegex").innerHTML = campos
    .map(
        (c) => `<tr>
                    <td class="fw-bold">${c.nombre}</td>
                    <td><code>${c.regex.replace(/</g, "&lt;")}</code></td>
                    <td>${c.ejemplo}</td>
                </tr>`
    )
    .join("");

document.getElementById(campos[0].id).focus();