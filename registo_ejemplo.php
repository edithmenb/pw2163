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
		mysql_select_db("2164");
		$consulta = "insert into usuarios values('".$usuario."','".$nombre."','".$clave."','".$tipo."')";
		//Ejecutar consulta
		mysql_query($consulta);
		//Preguntamos si hubo insercion
		if(mysql_affected_rows()>0)
		{
			print "Registro guardadobr <br>";
			print "<a href='ejemplo.php'>Regresar</a>";

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