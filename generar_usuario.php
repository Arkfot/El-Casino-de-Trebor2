<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = "db5017872687.hosting-data.io";
$dbname = "dbs14241712";
$user = "dbu1693546";
$pass = "TtAATHqUYE9SRHpklkl";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    die("❌ Error de conexión: " . $conn->connect_error);
}

// 🔍 Prueba directa: verificar si la columna user_code existe
$testQuery = $conn->query("SELECT `user_code` FROM usuarios LIMIT 1");
if (!$testQuery) {
    die("❌ Error al hacer SELECT directo de `user_code`: " . $conn->error);
}

// ✅ Función para generar código aleatorio entre a500 y d1000
function generarCodigoDisponible($conn) {
    $letras = ['a', 'b', 'c', 'd'];
    $numeros = range(500, 1000);

    shuffle($letras);
    shuffle($numeros);

    foreach ($letras as $letra) {
        foreach ($numeros as $num) {
            $code = $letra . $num;

            // 🔐 Comillas invertidas en el campo
            $stmt = $conn->prepare("SELECT 1 FROM usuarios WHERE `user_code` = ?");
            if (!$stmt) {
                die("❌ Error en prepare (SELECT): " . $conn->error);
            }

            $stmt->bind_param("s", $code);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows == 0) {
                return $code;
            }
        }
    }
    return false; // Todos los códigos están ocupados
}

$code = generarCodigoDisponible($conn);
if (!$code) {
    http_response_code(500);
    die("❌ No hay más códigos disponibles");
}

// 📝 Insertar nuevo usuario
$stmt = $conn->prepare("INSERT INTO usuarios (`user_code`) VALUES (?)");
if (!$stmt) {
    die("❌ Error en prepare (INSERT): " . $conn->error);
}

$stmt->bind_param("s", $code);
if ($stmt->execute()) {
    echo $code;
} else {
    http_response_code(500);
    echo "❌ Error al guardar: " . $stmt->error;
}

$conn->close();
?>
