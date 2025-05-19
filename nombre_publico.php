<?php
header('Content-Type: application/json');
$host = "db5017872687.hosting-data.io";
$dbname = "dbs14241712";
$user = "dbu1693546";
$pass = "TtAATHqUYE9SRHpklkl";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "❌ DB Error"]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["code"])) {
    $code = $_GET["code"];

    $stmt = $conn->prepare("SELECT nombre_publico, ultimo_cambio_nombre FROM usuarios WHERE user_code = ?");
    $stmt->bind_param("s", $code);
    $stmt->execute();
    $stmt->bind_result($nombre, $ultimaFecha);
    $stmt->fetch();
    $stmt->close();

    $puedeCambiar = true;
    if ($ultimaFecha) {
        $ultima = strtotime($ultimaFecha);
        $ahora = time();
        $diferenciaDias = ($ahora - $ultima) / (60 * 60 * 24);
        $puedeCambiar = $diferenciaDias >= 3;
    }

    echo json_encode([
        "nombre_publico" => $nombre,
        "puede_cambiar" => $puedeCambiar
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $code = $data["code"];
    $nuevoNombre = trim($data["nuevoNombre"]);

    if (strlen($nuevoNombre) < 2 || strlen($nuevoNombre) > 50) {
        echo json_encode(["success" => false, "message" => "Nombre no válido."]);
        exit;
    }

    $stmt = $conn->prepare("SELECT ultimo_cambio_nombre FROM usuarios WHERE user_code = ?");
    $stmt->bind_param("s", $code);
    $stmt->execute();
    $stmt->bind_result($ultimaFecha);
    $stmt->fetch();
    $stmt->close();

    if ($ultimaFecha) {
        $ultima = strtotime($ultimaFecha);
        $ahora = time();
        $diferenciaDias = ($ahora - $ultima) / (60 * 60 * 24);

        if ($diferenciaDias < 3) {
            echo json_encode(["success" => false, "message" => "Solo puedes cambiar tu nombre cada 3 días."]);
            exit;
        }
    }

    $stmt = $conn->prepare("UPDATE usuarios SET nombre_publico = ?, ultimo_cambio_nombre = NOW() WHERE user_code = ?");
    $stmt->bind_param("ss", $nuevoNombre, $code);
    $ok = $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => $ok]);
}
?>
