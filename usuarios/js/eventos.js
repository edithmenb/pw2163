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
						"&id"+Math.random();
		//Hacemos la peticion remota
		$.ajax({
			cache:false,
			type:"POST",
			datatype:"json",
			url:"php/utilerias.php",
			data:parametros,
			success: function(response){
				//Si todo sale bien
			},
			error: function(xhr, ajaxOptions, thrownError){
				//Si todo sale mal
			}
		});
		//Validamos que no estén vacíos
		if(usuario!="" && clave!="")
		{

		}
		else
		{
			alert("Usuario y clave son obligatorios");
		}


	}
	$("#btnValidaUsuario").on("click",validaUsuario);

}
//Evento inicial
$(document).on("ready",inicioUsuarios);