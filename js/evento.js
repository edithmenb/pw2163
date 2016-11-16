// DOM = modelo de objetos del documento
var inicio = function() //main
{
	var dameclic = function()
	{
		$.ajax
		({
			url: 'https://randomuser.me/api/',
			dataType: 'json',
			success: function(data) 
			{
				$("#txtNombre").val(data.results[0].name.first+" "+data.results[0].name.last);
				$("#imgFoto").attr("src",data.results[0].picture.large);

				console.log(data.results[0].name.first+" "+data.results[0].name.last);
			}
		});
	}
	$("#dameClic").on("click",dameclic)
}
// Inicializar nuestro documento
$(document).on("ready",inicio);

// $(document).on("ready",function(){
	// código o más funciones
// });
// funciones anonimas: Sin nombres, se pueden asignar a una variable. 
// Si no se asignan a nada, sirven para ejecutarse una sola vez.
