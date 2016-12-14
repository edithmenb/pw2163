var inicioMemo = function(){	
	var j1="";
	var j2="";
	var auxj= false; // false para inicio de sesión del j1, true cuando inicia sesión j2

	var juegoMemo = function()
	{
		var cont=0;
		var tabla="";
		var puntaje1=0;
		var puntaje2=0;

		//llenamos el arreglo que contendrá todos los nombres de las imagenes
		var imagenes=[];
		var cont2=0;
		for(j=1;j<3;j++)
		{
			for(i=0; i<32;i++)
			{
				imagenes[cont2]=i;
				cont2++;
			}
		}
		//Revolvemos los elementos de imagenes
		imagenes = imagenes.sort(function() {return Math.random() - 0.5});

		//Se crea la tabla con 64 espacios, de inicio tendrán la img del reverso de carta
		for (i = 0; i<8; i++) 
		{ 
			tabla+="<tr>";
    		for (j = 0; j<8; j++) 
			{ 
    			tabla+="<td> <button type='submit' id='b"+cont+"'><img width='70px' height='70px' src='img/65.jpg'></button> </td>";
    			cont++;
			}
			tabla+="</tr>";
		}
		$("#juego").html(tabla);
		
		for(i=0;i<64;i++)
		{
			var f = (function() {
				var a = i;
				return function() {
					voltearCarta(a);
				};
			})();
			$("#b"+i).on("click",f);
		}
		var voltearCarta = function(idBoton)
		{
			
			var img=imagenes[idBoton];
			$("#b"+idBoton).html("<img width='70px' height='70px' src='img/"+img+".jpg'>");
			//Deshabilitar botones de cartas con niurka
			//

		}

	}
	

	var iniciarSesion = function()
	{
		//Extraer los datos de los input en el HTML
		var usuario = $("#txtUsuario").val();
		var clave   = $("#txtClave").val();
		
		//Preparar los parámetros para AJAX
		var parametros = "opcion=valida"+
		                 "&usuario="+usuario+
		                 "&clave="+clave+
		                 "&id="+Math.random();
		
		//Validamos que no esten vacíos
		if(usuario!="" && clave!="")
		{
			//Hacemos la petición remota
			$.ajax({
				cache:false,
				type:"POST",
				dataType:"json",
				url: "php/utilerias.php",
				data:parametros,
				success: function(response)
				{
					
					if(response.respuesta == true)
					{    
						
						if(auxj==false)
						{
							
							j1=usuario;
							auxj=true;
							mostrarInicio();
						}
						else
						{
						
							j2=usuario;
							$("#artLogin").hide("slow");
							$("#juego").show("slow");

							juegoMemo();
							//Se manda llamar al juego
							//juegoMemo
							//Mostrar article
						}
					}

					
					else
					{
						alert("Datos incorrectos :(");
					}
				},
				error: function(xhr,ajaxOptions,thrownError){
					//Si todo sale mal
				}
			});
		}
		else
		{
			alert("Usuario y clave son obligatorios");
		}
	}
	var registrarUsuario = function()
	{
		//Código para guardar usuario.
		//Recuperamos los valores del formulario y los
		//ponemos en variables locales.
		var usuario = $("#txtUsuario1").val(); 
		var clave   = $("#txtClave1").val();
		var edad  = $("#txtEdad").val();
		if(usuario!="" && edad!="" && clave!="" )
		{
			//Parámetros para el ajax
			var parametros = "opcion=guarda"+
							 "&usuario="+usuario+
							 "&clave="+clave+
							 "&edad="+edad+
							 "&id="+Math.random();
			$.ajax({
				cache:false,
				type:"POST",
				dataType:"json",
				url:"php/utilerias.php",
				data:parametros,
				success:function(response){
					if(response.respuesta == true)
					{
						alert("Usuario registrado");
						mostrarIniciar();
					}
					else
						alert("Usuario no registrado y/o duplicado");
				},
				error:function(xhr,ajaxOptions,thrownError){
					console.log("No se pudo conectar al servidor");
				}
			});
		}
		else
			alert("Todos los campos son obligatorios");
	}

	var mostrarInicio = function(){
		$("#artLogin").hide("slow");


		if(auxj){
			$("h3").html("Jugador 2");
		}
		$("#artInicio").show("slow");

	}
	var mostrarIniciar = function(){

		$("#artInicio").hide("slow");
		$("#artRegistrarse").hide("slow");
		if(auxj){
			$("h3").html("Jugador 2");
		}
		$("#artLogin").show("slow");

	}
	var mostrarRegistrarse = function(){

		$("#artInicio").hide("slow");
		$("#artRegistrarse").show("slow");
	}


	//Eventos botones
	$("#btnIniciarSesionArt").on("click", mostrarIniciar);
	$("#btnRegistrarseArt").on("click", mostrarRegistrarse);
	$("#btnIniciarSesion").on("click", iniciarSesion);
	$("#btnRegistrarse").on("click", registrarUsuario);


}
$(document).on("ready",inicioMemo);


