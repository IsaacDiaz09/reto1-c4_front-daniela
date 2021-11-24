const urlbase = 'http://localhost:8080/api/user';

// Crea un nuvo usuario
const crear = (nombre,email,pass,passConfirm) => {

    if (pass.val() !== passConfirm.val()) {
        mostrarMensaje('Error', 'La contraseñas no coinciden', true);
        return;
    } else if (pass.val().length < 8){
		mostrarMensaje('Error','La clave debe tener minimo 8 caracteres',true);
		return;
	}

	const user = 
	{
		name:nombre.val(),
		email:email.val(),
		password:pass.val()
	}
    $.ajax({
        url: urlbase + "/new",
        type: "POST",
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(user),
        statusCode: {
            201: function () {
                mostrarMensaje('Confirmacion', 'Usuario  creado exitosamente');
               }
        },
    });
}

const mostrarMensaje = (titulo, cuerpo, error) => {
    document.getElementById("titulomensaje").innerHTML = titulo;
    $("#cuerpomensaje").html(cuerpo);
    $("#myToast").removeClass();
    if (error) {
        $("#myToast").addClass("toast bg-danger")
    } else {
        $("#myToast").addClass("toast bg-primary")
    }

    $("#myToast").toast("show");
}

const iniciarSesion = () => {
    const loading = '<img src="https://icon-library.com/icon/spinner-icon-gif-10.html.html">';
    $("#loading").html(loading);

    setTimeout(()=>{
        autenticar();
    }, 500);
}

const autenticar = ()=>{
    const email = $("#txtEmail").val();
    const password = $("#txtPassword").val();

    if (email.length === 0 || password.length === 0) {
        mostrarMensaje('Error', 'Debe escribir el email y el password para ingresar', true);
        $("#loading").html("");
        return;
    }

    $.ajax({
        url: `${urlbase}/${email}/${password}`,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            $("#loading").html("");
            console.log(respuesta);
            if (respuesta.id===null){
                mostrarMensaje('Error', 'Usuario y/o clave incorrectos', true);
            }else{
                mostrarMensaje('Error', 'Ingreso Correcto');

                setTimeout(()=>{
                    window.location.href = 'menu.html';
                }, 1000);
                
            }
        },
        error: function (xhr, status) {
            $("#loading").html("");
            console.log(xhr);
            console.log(status);
            mostrarMensaje('Error', 'Error al validar', true);
        }
    });

}


