const urlbase = "http://localhost:8080/api/user";

// Crea un nuvo usuario
const crear = (nombre, email, pass, passConfirm) => {
  if (validaUsuario(nombre, email, pass, passConfirm) === false) {
    return;
  }
  const user = {
    name: nombre.val(),
    email: email.val(),
    password: pass.val(),
  };

  $.ajax({
    url: urlbase + "/new",
    type: "POST",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(user),
    statusCode: {
      201: function () {
        mostrarMensaje("Confirmación", "Usuario  creado exitosamente");
      },
    },
  });
};

const mostrarMensaje = (titulo, cuerpo, error) => {
  document.getElementById("titulomensaje").innerHTML = titulo;
  $("#cuerpomensaje").html(cuerpo);
  $("#myToast").removeClass();
  if (error) {
    $("#myToast").addClass("toast bg-danger");
  } else {
    $("#myToast").addClass("toast bg-primary");
  }

  $("#myToast").toast("show");
};

const iniciarSesion = () => {
  const loading =
    '<img src="https://icon-library.com/icon/spinner-icon-gif-10.html.html">';
  $("#loading").html(loading);

  setTimeout(() => {
    funTest();
  }, 1000);
};

const funTest = () => {};

const validaUsuario = (nombre, email, pass, passConfirm) => {
  console.log(verificaEmail(email));
  if (
    nombre.val().trim() === "" ||
    email.val().trim() === "" ||
    pass.val().trim() === "" ||
    passConfirm.val().trim() === ""
  ) {
    mostrarMensaje(
      "Error",
      "Todos los campos son requeridos, verifique e intente nuevamente",
      true
    );
    return false;
  } else if (pass.val() !== passConfirm.val()) {
    mostrarMensaje("Error", "La contraseñas no coinciden", true);
    return false;
  } else if (pass.val().length < 8 || passConfirm.val().length < 8) {
    mostrarMensaje(
      "Error",
      "La contraseña debe tener minimo 8 caracteres",
      true
    );

    return false;
  } else if (verificaEmail(email) === true) {
    mostrarMensaje(
      "Error",
      "Ups, el email proporcionado ya se encuentra en uso",
      true
    );
    return false;
  }

  return true;
};

function verificaEmail(email) {
  $.get(urlbase + "/" + email.val(), function (response) {
    setVar(response);
  });
  const bool = getVar();
  return bool;
}

// Utils
function setVar(variable) {
  boolean = variable;
}
function getVar() {
  return boolean;
}
var boolean = false;
