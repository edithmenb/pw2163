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
	
	var teclaClave = function(tecla)
	{
		if (tecla.which == 13) //Tecla enter
		{
			validaUsuario(); //funcion que valida al usuario
		}
	}

	var GuardaUsuario = function()
	{
		//javascript se conecta a php y este devuelve un JSON
		//Extraer los datos de los inputs en el HTML
		var usuario= $("#txtUsuarioAlta").val();
		var nombre= $("#txtNombreAlta").val();
		var clave= $("#txtClaveAlta").val();
		var tipo= $("#txtTipoAlta").val();

		//Preparar los parámetros para AJAX
		var parametros="opcion=guarda"+
						"&usuario="+usuario+
						"&nombre="+nombre+
						"&clave="+clave+
						"&tipo="+tipo+
						"&id="+Math.random();
		//Hacemos la peticion remota

		//Validamos que no estén vacíos
		if(usuario!="" && nombre!="" && clave!="" && tipo!="")
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
						alert("Nuevo usuario registrado exitosamente");
					}
					else
					{
						alert("Error al registrar usuario");
					}
				},
				error:function(xhr, ajaxOptions, thrownError){
					//Si todo sale mal
				}
			});
		}
		else
		{
			alert("Todos los campos son obligatorios");
		}
	}

	var CambioUsuario = function()
	{
		//javascript se conecta a php y este devuelve un JSON
		//Extraer los datos de los inputs en el HTML
		var usuario= $("#txtUsuarioCambio").val();
		var dato= $("#txtDatoCambio").val();
		var cambio= $("#txtCambio").val();

		//Preparar los parámetros para AJAX
		var parametros="opcion=cambio"+
						"&usuario="+usuario+
						"&dato="+dato+
						"&cambio="+cambio+
						"&id="+Math.random();
		//Hacemos la peticion remota

		//Validamos que no estén vacíos
		if(usuario!="" && dato!="" && cambio!="")
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
						alert("Usuario "+usuario+" modificado exitosamente");
					}
					else
					{
						alert("No existe el usuario "+usuario);

					}
				},
				error:function(xhr, ajaxOptions, thrownError){
					//Si todo sale mal
				}
			});
		}
		else
		{
			alert("Todos los campos son obligatorios");
		}
	}

	var BajaUsuario = function()
	{
		//javascript se conecta a php y este devuelve un JSON
		//Extraer los datos de los inputs en el HTML
		var usuario= $("#txtUsuarioBaja").val();

		//Preparar los parámetros para AJAX
		var parametros="opcion=baja"+
						"&usuario="+usuario+
						"&id="+Math.random();
		//Hacemos la peticion remota

		//Validamos que no estén vacíos
		var respuesta_ajax = $.ajax({
			cache:false,
			type:"POST",
			dataType:"json",
			url:"php/utilerias.php",
			data:parametros,
			success:function(response){
				//Si todo sale bien
				if(response.respuesta == true)
				{
					alert("Usuario "+usuario+" eliminado exitosamente");
				}
				else
				{
					alert("Usuario "+usuario+" no encontrado");
				}
			},
			error:function(xhr, ajaxOptions, thrownError){
				//Si todo sale mal
				alert("error de algo al eliminar");
			}
		});
	}

	var ConsultaUsuario = function()
	{
		//javascript se conecta a php y este devuelve un JSON
		//Extraer los datos de los inputs en el HTML
		var usuario= $("#txtUsuarioConsulta").val();

		//Preparar los parámetros para AJAX
		var parametros="opcion=consulta"+
						"&usuario="+usuario+
						"&id="+Math.random();
		//Hacemos la peticion remota

		//Validamos que no estén vacíos
		var respuesta_ajax = $.ajax({
			cache:false,
			type:"POST",
			dataType:"json",
			url:"php/utilerias.php",
			data:parametros,
			success:function(response){
			//Use response
				if(response.respuesta=="")
				{
					alert("No existe el usuario "+usuario);
				}
				else
				{
					$("#tablita").html(response.respuesta);

				}
			
			},
			error:function(mes){
					//Si todo sale mal
					//console.log(mes);
			}
		});
	}
	
	var Alta = function()
	{
		$("#artAltaUsuario").show("slow");
	}
	var Baja = function()
	{
		$("#artBajaUsuario").show("slow");
	}
	var Cambio = function()
	{
		$("#artCambioUsuario").show("slow");
	}
	var Consulta = function()
	{
		$("#artConsultaUsuario").show("slow");
	}

	//keypress se ejecuta cada vez que presiono una tecla sobre el input
	$("#txtClave").on("keypress",teclaClave);

	$("#btnAlta").on("click",Alta);
	$("#btnConsulta").on("click",Consulta);
	$("#btnCambio").on("click",Cambio);
	$("#btnBaja").on("click",Baja);

	$("#btnValidaUsuario").on("click",validaUsuario);
	$("#btnGuardaUsuario").on("click",GuardaUsuario);
	$("#btnBajaUsuario").on("click",BajaUsuario);
	$("#btnCambioUsuario").on("click",CambioUsuario);
	$("#btnConsultaUsuario").on("click",ConsultaUsuario);
	
}
//Evento inicial
$(document).on("ready",inicioUsuarios);