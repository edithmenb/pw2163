// DOM = modelo de objetos del documento
var inicio = function() //main
{
	var dameclic = function()
	{
		alert("Le di clic a un botón");
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
