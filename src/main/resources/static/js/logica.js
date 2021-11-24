const urlbase = "http://localhost:8080/api/user";

// Crea un nuvo usuario
const crear = (nombre, email, pass, passConfirm) => {
  if (verificaEmail(email) === true) {
    mostrarMensaje(
      "Error",
      "Ups, el email proporcionado ya se encuentra en uso",
      true
    );
    return;
  }
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
        limpiarCampos(nombre, email, pass, passConfirm);
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

const validaUsuario = (nombre, email, pass, passConfirm) => {
  const regExEmail =
    /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

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
  } else if (regExEmail.test(email.val()) === false) {
    mostrarMensaje(
      "Error",
      "El formato de email es inválido, verifiquelo e intente de nuevo",
      true
    );
    return false;
  }

  return true;
};

function verificaEmail() {
  const emailVal = $("#email").val();
  $.get(urlbase + "/" + emailVal, function (response) {
    setVar(response);
  });
  return getVar();
}

// Utils
var boolean = false;

function setVar(variable) {
  boolean = variable;
}
function getVar() {
  return boolean;
}

function limpiarCampos(nombre, email, pass, passConfirm) {
  $(nombre).val("");
  $(email).val("");
  $(pass).val("");
  $(passConfirm).val("");
}
