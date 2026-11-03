// aceder a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const contenedorTabla = document.getElementById("idTablaPacientes");

const notificacion = document.getElementById("idNotificacion");
// componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//  componente modal
const idModal = document.getElementById("idModal");

// persistencia con localstorage
const KEY_PACIENTES = "pacientes";
const KEY_PAISES = "paisesExtra";

// lee un arreglo guardado en localStorage (si no existe o esta dañado devuelve [])
const leerStorage = (key) => {
    try {
        const datos = JSON.parse(localStorage.getItem(key));
        return Array.isArray(datos) ? datos : [];
    } catch (error) {
        return [];
    }
};

const guardarStorage = (key, datos) => {
    localStorage.setItem(key, JSON.stringify(datos));
};

// arreglo global de pacientes (se carga con lo que haya guardado)
let arrayPaciente = leerStorage(KEY_PACIENTES);
let paisesExtra = leerStorage(KEY_PAISES);
let indiceEditando = null;

// indica si la tabla ya fue mostrada, para refrescarla al editar/eliminar
let tablaVisible = false;


const escapeHTML = (texto) =>
    String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const mostrarMensaje = (texto) => {
    mensaje.innerHTML = texto;
    toast.show();
};

/*
crear una funcion para que limpie el formulario
siempre que se cargue la pagina o cuando se presione
el boton limpiar del formulario
*/

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    // si se estaba editando, se cancela la edicion
    indiceEditando = null;
    buttonAgregarPaciente.innerHTML =
        '<i class="bi bi-person-plus-fill"></i> Guardar Datos';

    inputNombre.focus();
};

/*
 funcion para validar el ingreso del paciente
*/

const addPaciente = function () {
    let nombre = inputNombre.value.trim();
    let apellido = inputApellido.value.trim();
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
            ? "Hombre"
            : inputRdFemenino.checked == true
            ? "Mujer"
            : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value.trim();

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        const paciente = new Array(
            nombre,
            apellido,
            fechaNacimiento,
            sexo,
            labelPais,
            direccion
        );

        if (indiceEditando !== null) {
            // en edicion: reemplazamos el registro existente
            arrayPaciente[indiceEditando] = paciente;
            mostrarMensaje("Paciente actualizado correctamente");
        } else {
            // nuevo: agregamos al final
            arrayPaciente.push(paciente);
            mostrarMensaje("Se ha registrado un nuevo paciente");
        }

        // guardar en localStorage
        guardarStorage(KEY_PACIENTES, arrayPaciente);
        // limpiar formulario 
        limpiarForm();
        // si la tabla esta visible se refresca automaticamente
        if (tablaVisible) imprimirPacientes();
    } else {
        mostrarMensaje("Faltan campos por completar");
    }
};

// editar y eliminar
// carga los datos del paciente en el formulario para modificarlo
const editarPaciente = (indice) => {
    const [nombre, apellido, fecha, sexo, labelPais, direccion] =
        arrayPaciente[indice];

    inputNombre.value = nombre;
    inputApellido.value = apellido;
    inputFechaNacimiento.value = fecha;
    inputRdMasculino.checked = sexo == "Hombre";
    inputRdFemenino.checked = sexo == "Mujer";
    inputDireccion.value = direccion;

    // seleccionar el pais cuyo texto coincide con el guardado
    cmbPais.value = 0;
    for (const option of cmbPais.options) {
        if (option.textContent == labelPais) {
            cmbPais.value = option.value;
            break;
        }
    }

    indiceEditando = indice;
    buttonAgregarPaciente.innerHTML =
        '<i class="bi bi-pencil-square"></i> Actualizar Datos';

    // subir al formulario para que el usuario vea que esta editando
    window.scrollTo({ top: 0, behavior: "smooth" });
    inputNombre.focus();
    mostrarMensaje(
        `Editando a ${escapeHTML(arrayPaciente[indice][0])}. Modifique los datos y presione "Actualizar Datos"`
    );
};

// elimina un paciente despues de pedir confirmacion
const eliminarPaciente = (indice) => {
    const [nombre, apellido] = arrayPaciente[indice];

    if (!confirm(`¿Desea eliminar al paciente ${nombre} ${apellido}?`)) return;

    arrayPaciente.splice(indice, 1);
    guardarStorage(KEY_PACIENTES, arrayPaciente);
    // si se elimino al paciente que se estaba editando, cancelar edicion
    if (indiceEditando === indice) {
        limpiarForm();
    } else if (indiceEditando !== null && indiceEditando > indice) {
        indiceEditando--;
    }

    imprimirPacientes();
    mostrarMensaje("Paciente eliminado correctamente");
};

// funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element) => {
        // data-index guarda la posicion real del paciente en el arreglo
        $fila += `<tr>
                    <td scope="row" class="text-center fw-bold">${contador}</td>
                    <td>${escapeHTML(element[0])}</td>
                    <td>${escapeHTML(element[1])}</td>
                    <td>${escapeHTML(element[2])}</td>
                    <td>${escapeHTML(element[3])}</td>
                    <td>${escapeHTML(element[4])}</td>
                    <td>${escapeHTML(element[5])}</td>
                    <td>
                        <button id="idBtnEditar${contador}" type="button" class="btn btn-primary" data-accion="editar" data-index="${contador - 1}" title="Editar">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger" data-accion="eliminar" data-index="${contador - 1}" title="Eliminar">
                            <i class="bi bi-trash3-fill"></i>
                        </button>
                    </td>
                </tr>`;
        contador++;
    });

    // si no hay pacientes, mostramos un mensaje en la tabla
    if (arrayPaciente.length == 0) {
        $fila = `<tr><td colspan="8" class="text-center">No hay pacientes registrados</td></tr>`;
    }
    return $fila;
}

const imprimirPacientes = () => {
    tablaVisible = true;
    let $table = `<div class="table-responsive">
                    <table class="table table-striped table-hover table-bordered">
                        <tr>
                            <th scope="col" class="text-center" style="width:5%">#</th>
                            <th scope="col" class="text-center" style="width:15%">Nombre</th>
                            <th scope="col" class="text-center" style="width:15%">Apellido</th>
                            <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                            <th scope="col" class="text-center" style="width:10%">Sexo</th>
                            <th scope="col" class="text-center" style="width:10%">Pais</th>
                            <th scope="col" class="text-center" style="width:25%">Dirección</th>
                            <th scope="col" class="text-center" style="width:10%">Opciones</th>
                        </tr>
                        ${imprimirFilas()}
                    </table>
                </div>
                `;
    contenedorTabla.innerHTML = $table;
};

// los botones editar/eliminar se crean dinamicamente
contenedorTabla.addEventListener("click", (e) => {
    const boton = e.target.closest("button[data-accion]");
    if (!boton) return;

    const indice = parseInt(boton.dataset.index);
    if (boton.dataset.accion == "editar") {
        editarPaciente(indice);
    } else if (boton.dataset.accion == "eliminar") {
        eliminarPaciente(indice);
    }
});


// paises
// contador global de los option correspondiente
let contadorGlobalOption = cmbPais.children.length;

// crea el option y lo agrega al select
const agregarOptionPais = (nombrePais) => {
    let option = document.createElement("option");
    option.textContent = nombrePais;
    contadorGlobalOption++;
    option.value = contadorGlobalOption;
    cmbPais.appendChild(option);
};

const paisExiste = (nombrePais) =>
    Array.from(cmbPais.options).some(
        (o) => o.textContent.toLowerCase() == nombrePais.toLowerCase()
    );

const addPais = () => {
    let paisNew = inputNombrePais.value.trim();

    if (paisNew != "") {
        if (paisExiste(paisNew)) {
            mostrarMensaje("Ese país ya existe en la lista");
            return;
        }

        agregarOptionPais(paisNew);

        // persistir el nuevo pais
        paisesExtra.push(paisNew);
        guardarStorage(KEY_PAISES, paisesExtra);

        mostrarMensaje("Pais agregado correctamente");
    } else {
        mostrarMensaje("Faltan campos por completar");
    }
};

// restaurar los paises agregados en sesiones anteriores
paisesExtra.forEach((p) => {
    if (!paisExiste(p)) agregarOptionPais(p);
});

// agregar eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};
buttonAgregarPaciente.onclick = () => {
    addPaciente();
};
buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};
buttonAgregarPais.onclick = () => {
    addPais();
};
// agregar el focus en el campo nombre pais del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

limpiarForm();
// si ya hay pacientes guardados, mostrarlos de una vez
if (arrayPaciente.length > 0) imprimirPacientes();