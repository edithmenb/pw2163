//Declaramos la función
var inicioUsuarios = function()
{
	var validaUsuario = function()
	{
		//javascript se conecta a php y este devuelve un JSON
		//Extraer los datos de los inputs en el HTML
		var usuario= $("#txtUsuario").val();
		var clave= $("#txtClave").val();
		//Preparar los parámetros para AJAX
		var parametros="opcion=valida"+
						"&usuario="+usuario+
						"&clave="+clave+
						"&id="+Math.random();
		//Hacemos la peticion remota

		//Validamos que no estén vacíos
		if(usuario!="" && clave!="")
		{
			$.ajax({
				cache:false,
				type:"POST",
				dataType:"json",
				url:"php/utilerias.php",
				data:parametros,
				success:function(response){
					//Si todo sale bien
					if(response.respuesta == true)
					{
						$("#entradaUsuario").hide("slow");
						$("nav").show("slow");
					}
					else
					{
						alert("Datos incorrectos :(");
					}
					
				},
				error:function(xhr, ajaxOptions, thrownError){
					//Si todo sale mal
				}
			});
		}
		else
		{
			alert("Usuario y clave son obligatorios");
		}


	}
	$("#btnValidaUsuario").on("click",validaUsuario);
	var teclaClave = function(tecla)
	{
		if (tecla.which == 13) //Tecla enter
		{
			validaUsuario(); //funcion que valida al usuario
		}
	}
	var Alta = function()
	{
		$("h2").html("Alta de usuarios");
		$("#artAltaUsuario").show("slow");
		$("#artAltaUsuario > button").hide();
		$("#btnGuardaUsuario").show();
	}
	var Baja = function()
	{
		$("h2").html("Baja de usuarios");
		$("#artAltaUsuario").show("slow");
		$("#artAltaUsuario > button").hide();
		$("#btnBajaUsuario").show();
	}
	var Cambio = function()
	{
		$("h2").html("Cambio de usuarios");
		$("#artAltaUsuario").show("slow");
		$("#artAltaUsuario > button").hide();
		$("#btnCambioUsuario").show();
	}
	var teclaUsuario = function(tecla)
	{
		if (tecla.which == 13) //Tecla enter
		{
			var usuario = $("#txtUsuarioAlta").val();
			var parametros ="opcion=buscaUsuario"+
							"&usuario="+usuario+
							"&id="+Math.random();
			$.ajax({
				cache:false,
				type:"POST",
				dataType:"json",
				url:"php/utilerias.php",
				data:parametros,
				success:function(response){
					//Si todo sale bien
					if(response.respuesta == true)
					{
						$("#txtNombreAlta").val(response.nombre);
						$("#txtClaveAlta").val(response.clave);
						$("#txtTipoAlta option:selected").text(response.tipo);

					}
					
				},
				error:function(xhr, ajaxOptions, thrownError){
					//Si todo sale mal
					console.log("Fallo el servidor");
				}
			});
		}
	}
	var GuardaUsuario = function()
	{

	}
	//keypress se ejecuta cada vez que presiono una tecla sobre el input
	$("#txtClave").on("keypress",teclaClave);
	$("#btnAlta").on("click",Alta);
	$("#btnBaja").on("click",Baja;
	$("#btnCambio").on("click",Cambio;
	$("txtUsuarioAlta").on("keypress",teclaUsuario);
	$("#btnGuardaUsuario").on("click",GuardaUsuario);


}
//Evento inicial
$(document).on("ready",inicioUsuarios);