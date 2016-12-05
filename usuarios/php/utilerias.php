<?php
	function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
	{
 		$theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;

		$theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

		switch ($theType) {
    		case "text":
      		$theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      		break;    
	    	case "long":
		    case "int":
		      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
		      break;
		    case "double":
		      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
		      break;
		    case "date":
		      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
		      break;
		    case "defined":
		      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
		      break;
  		}
  		return $theValue;
	}

	function validaUsuario()
	{
		$respuesta = false;
		$u = GetSQLValueString($_POST["usuario"],"text");//limpieza
		$c = GetSQLValueString($_POST["clave"],"text");//limpieza
		//Conexion al servidor
		$conexion = mysql_connect("localhost","root","");
		//Conexion a la base de datos
		mysql_select_db("bd2164");
		$consulta = sprintf("select usuario, clave from usuarios where usuario=%s and clave=%s limit 1", $u, $c);
		$resultado =mysql_query($consulta);
		if(mysql_num_rows($resultado) >0)
		{
			$respuesta = true;
		}
		$arregloJSON = array('respuesta' => $respuesta );
		print json_encode($arregloJSON);
	}
	function guardaUsuario()
	{
		$respuesta = false;
		$u = GetSQLValueString($_POST["usuario"],"text");//limpieza
		$n = GetSQLValueString($_POST["nombre"],"text");//limpieza
		$c = GetSQLValueString($_POST["clave"],"text");//limpieza
		$t = GetSQLValueString($_POST["tipo"],"text");//limpieza

		//Conexion al servidor
		$conexion = mysql_connect("localhost","root","");
		//Conexion a la base de datos
		mysql_select_db("bd2164");
		$consulta = sprintf("insert into usuarios values(%s, %s, %s, %s)", $u, $n, $c, $t);
		$resultado = mysql_query($consulta);
		
		$respuesta = $resultado;
		
		$arregloJSON = array('respuesta' => $respuesta );
		print json_encode($arregloJSON);
	}
	function bajaUsuario()
	{
		$respuesta = false;
		$u = GetSQLValueString($_POST["usuario"],"text");//limpieza
		
		//Conexion al servidor
		$conexion = mysql_connect("localhost","root","");
		//Conexion a la base de datos
		mysql_select_db("bd2164");
		$consulta = sprintf("delete from usuarios where usuario=%s", $u);
		$resultado = mysql_query($consulta);
		
		if(mysql_affected_rows() >0)
		{
			$respuesta = true;
		}
		
		$arregloJSON = array('respuesta' => $respuesta );
		print json_encode($arregloJSON);
	}
	function CambioUsuario()
	{
		$respuesta = false;
		$u = GetSQLValueString($_POST["usuario"],"text");//limpieza
		$tipo = GetSQLValueString($_POST["dato"],"text");//limpieza
		$nuevo = GetSQLValueString($_POST["cambio"],"text");//limpieza
		
		//Conexion al servidor
		$conexion = mysql_connect("localhost","root","");
		//Conexion a la base de datos
		mysql_select_db("bd2164");
		switch ($tipo) 
		{
			case "'usuario'":
				$consulta = "update usuarios set usuario= ".$nuevo." where usuario=".$u;
				break;
			case "'nombre'":
				$consulta = "update usuarios set nombre= ".$nuevo." where usuario=".$u;
				break;
			case "'clave'":
				$consulta = "update usuarios set clave= ".$nuevo." where usuario=".$u;
				break;
			
			default:
				# code...
				break;
		}
		$resultado = mysql_query($consulta);
		
		if(mysql_affected_rows() >0)
		{
			$respuesta = true;

		}
		$arregloJSON = array('respuesta' => $respuesta );
		print json_encode($arregloJSON);
	}


	function consultaUsuario()
	{
		$respuesta = false;
		$u = GetSQLValueString($_POST["usuario"],"text");//limpieza
		//Conexion al servidor
		$conexion = mysql_connect("localhost","root","");
		//Conexion a la base de datos
		mysql_select_db("bd2164");
		
		if($u == "NULL")
		{
			$consulta = sprintf("select * from usuarios order by usuario");
		}
		else
		{
			$consulta = sprintf("select * from usuarios where usuario=%s order by usuario", $u);
		}
		
		$resultado =mysql_query($consulta);
		$tabla="";

		if(mysql_affected_rows() >0)
		{
			$tabla = "<table id='tablita' border=2>";
			$tabla.="<tr>";
			$tabla.="<th>Usuario</th><th>Nombre</th><th>Clave</th><th>Tipo</th>";
			$tabla.="</tr>";
			while($registro = mysql_fetch_array($resultado))
			{
				$tabla.="<tr>";
				$tabla.="<td>".$registro["usuario"]."</td>";
				$tabla.="<td>".$registro["nombre"]."</td>";
				$tabla.="<td>".$registro["clave"]."</td>";
				$tabla.="<td>".$registro["tipo"]."</td>";	
				$tabla.="</tr>";
			}
			$tabla.="</table>";
		}

		/*
		
		*/
		//$arregloJSON = array('respuesta' => $respuesta );
		//print json_encode($arregloJSON);
		
		
		//print $tabla;
		$respuesta = $tabla;
		// TODO: BORRAME

		$arregloJSON = array('respuesta' => $respuesta );
		print json_encode($arregloJSON);
	}

//Menu principal
	if(isset($_POST["opcion"]))
	$opc = $_POST["opcion"];
	switch ($opc) {
		case 'valida':
			validaUsuario();
			break;
		case 'guarda':
			GuardaUsuario();
			break;
		case 'baja':
			BajaUsuario();
			break;	
		case 'cambio':
			CambioUsuario();
			break;
		case 'consulta':
			ConsultaUsuario();
			break;
		
		default:
			# code...
			break;
	}
?>