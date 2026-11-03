document.addEventListener("DOMContentLoaded", function () {
    // acceder al contenedor donde se mostrara a los estudiantes
  const containerEstudiantes = document.querySelector(
    "#idContainerEstudiantes"
  );

  // acceder a cada boton por medio de la API DOM
  const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
  const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");

  // agregar el evento click a los botones, ademas
  // asignar la funcion que realizara la operacion
  btnAddEstudiante.addEventListener("click", addEstudiantes);
  btnViewEstudiantes.addEventListener("click", viewEstudiantes);

  // arreglo de forma global
  let arrayEstudiantes = new Array();

  // crear funciones
  function addEstudiantes() {
    const inputCarnet = document
      .querySelector("#inputCarnet")
      .value.toString()
      .toUpperCase();
    const inputNombre = document
      .querySelector("#inputNombre")
      .value.toString()
      .toUpperCase();
    const inputApellidos = document
      .querySelector("#inputApellidos")
      .value.toString()
      .toUpperCase();

    if (inputCarnet != "" && inputNombre != "" && inputApellidos != "") {
      arrayEstudiantes.push(
        new Array(inputCarnet, inputNombre, inputApellidos)
      );
      alert("Se registro el nuevo estudiante");
      // limpiar campos del formulario
      document.querySelector("#inputCarnet").value = "";
      document.querySelector("#inputNombre").value = "";
      document.querySelector("#inputApellidos").value = "";
      document.querySelector("#inputCarnet").focus();
    } else {
      alert("Faltan campos que completar");
    }
  }

  function viewEstudiantes() {
    // validar que existan estudiantes registrados
    let totalEstudiantes = arrayEstudiantes.length;
    if (totalEstudiantes > 0) {
      let carnet;
      let nombres;
      let apellidos;
      let table = "<table class='table table-light table-striped'>";
      table += "<thead>";
      table += "<tr>";
      table += "<th scope='col' style='width: 5%;'>#</th>";
      table += "<th scope='col' style='width: 15%;'>Carnet</th>";
      table += "<th scope='col'>Nombres</th>";
      table += "<th scope='col'>Apellidos</th>";
      table += "</tr>";
      table += "</thead>";
      table += "<tbody>";

      // utlizar un bucle for para recorrer el arreglo de estudiantes
      for (let i = 0; i < arrayEstudiantes.length; i++) {
        // acceder a las posiciones del arreglo
        carnet = arrayEstudiantes[i][0];
        nombres = arrayEstudiantes[i][1];
        apellidos = arrayEstudiantes[i][2];

        table += `<tr>`;
        table += `<td scope='row' style='font-weight: bold;'>${i + 1}</td>`;
        table += `<td>${carnet}</td>`;
        table += `<td>${nombres}</td>`;
        table += `<td>${apellidos}</td>`;
        table += `</tr>`;
      }

      table += "</tbody>";
      table += "</table>";
      containerEstudiantes.innerHTML = table;
    } else {
      alert("No se han registrado estudiantes");
    }
  }
});
