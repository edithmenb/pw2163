<?php
	//Preguntar si los valores existen
	$oculto = ""; //Inicializando la variable
	$usuario = "";
	$nombre = "";
	$clave = "";
	$tipo = "";

	if(isset($_POST["txtOculto"]))//Si trae valores
	{
		$oculto = $_POST["txtOculto"];
	}
	if(isset($_POST["txtUsuario"]))//Si trae valores
	{
		$usuario = $_POST["txtUsuario"];
	}
	if(isset($_POST["txtNombre"]))//Si trae valores
	{
		$nombre = $_POST["txtNombre"];
	}
	if(isset($_POST["txtClave"]))//Si trae valores
	{
		$clave = $_POST["txtClave"];
	}
	if(isset($_POST["txtTipo"]))//Si trae valores
	{
		$tipo = $_POST["txtTipo"];
	}

	function guardaUsuario($usuario,$nombre,$clave,$tipo)
	{

		//Conectarse al servidor mySQL
		//mysql_connect(servidor,usuario,contraseña);
		$conexion = mysql_connect("localhost","root","");
		//Seleccionamos la base de datos
		mysql_select_db("2163");
		$consulta = "insert into usuarios values('".$usuario."','".$nombre."','".$clave."','".$tipo."')";
		//Ejecutar consulta
		mysql_query($consulta);
		//Preguntamos si hubo insercion
		if(mysql_affected_rows()>0)
		{
			print "Registro guardado";
		}
		else
		{
			print "No se pudo guardar el registro";
		}
	}
	switch ($oculto) {
		case 'guardaUsuario':
			guardaUsuario($usuario,$nombre,$clave,$tipo);
			break;
		
		default:
			# code...
			break;
	}
?>
<h1>Alta de usuarios</h1>
<form action="ejemplo.php" method="POST">
	<input type="hidden" name="txtOculto" value="guardaUsuario">
	<input type="text" name="txtUsuario" id="txtUsuario">
	<input type="text" name="txtNombre" id="txtNombre">
	<input type="password" name="txtClave" id="txtClave">
	<select name="txtTipo" id="txtTipo">
		<option value="administrador">Administrador</option>
		<option value="invitado">Invitado</option>
		<option value="colado">Colado</option>
	</select>
	<input type="submit" value="Enviar">
</form>

