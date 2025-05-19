<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = "db5017872687.hosting-data.io";
$dbname = "dbs14241712";
$user = "dbu1693546";
$pass = "TtAATHqUYE9SRHpklkl"; // ✅ Pon tu contraseña real

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  http_response_code(500);
  echo "Error de conexión: " . $conn->connect_error;
  exit();
}

// Función para generar el código tipo "a500"..."d1000"
function generarCodigoDisponible($conn) {
  $letras = ['a', 'b', 'c', 'd'];
  $numeros = range(500, 1000);

  shuffle($letras);
  shuffle($numeros);

  foreach ($letras as $letra) {
    foreach ($numeros as $num) {
      $code = $letra . $num;
      $stmt = $conn->prepare("SELECT 1 FROM usuarios WHERE user_code = ?");
      $stmt->bind_param("s", $code);
      $stmt->execute();
      $stmt->store_result();
      if ($stmt->num_rows == 0) {
        return $code;
      }
    }
  }
  return false;
}

// Generar nuevo código
$code = generarCodigoDisponible($conn);
if (!$code) {
  http_response_code(500);
  echo "No hay más códigos disponibles";
  exit();
}

// Insertar nuevo usuario
$stmt = $conn->prepare("INSERT INTO usuarios (user_code) VALUES (?)");
$stmt->bind_param("s", $code);
if ($stmt->execute()) {
  echo $code;
} else {
  http_response_code(500);
  echo "Error al guardar: " . $stmt->error;
}
$conn->close();
?>
