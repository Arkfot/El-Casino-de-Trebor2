<?php
header('Content-Type: application/json');
$host   = "db5017872687.hosting-data.io";
$dbname = "dbs14241712";
$user   = "dbu1693546";
$pass   = "TtAATHqUYE9SRHpklkl";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "❌ DB Error"]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["code"])) {
    $code = $_GET["code"];
    $stmt = $conn->prepare(
      "SELECT nombre_publico, ultimo_cambio_nombre
       FROM usuarios
       WHERE user_code = ?"
    );
    $stmt->bind_param("s", $code);
    $stmt->execute();
    $stmt->bind_result($nombre, $ultimaFecha);
    $stmt->fetch();
    $stmt->close();

    $puedeCambiar = true;
    if ($ultimaFecha && strtotime($ultimaFecha) !== false) {
        $dias = (time() - strtotime($ultimaFecha)) / 86400;
        $puedeCambiar = ($dias >= 10.5);
    }

if (!$nombre || trim($nombre) === "") {
    // generar Anónimo N en base al user_code hash o ID
    $hash = crc32($code); // crea un número a partir del user_code
    $anonId = abs($hash % 100000); // limitarlo a 5 dígitos
    $nombre = "Anónimo " . $anonId;
}

echo json_encode([
    "nombre_publico" => $nombre,
    "puede_cambiar"  => $puedeCambiar
]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $code       = $data["code"];
    $nuevoNombre= trim($data["nuevoNombre"]);

    if (mb_strlen($nuevoNombre) < 2 || mb_strlen($nuevoNombre) > 50) {
        echo json_encode(["success" => false, "message" => "Nombre no válido."]);
        exit;
    }

    // chequear último cambio
    $stmt = $conn->prepare(
      "SELECT ultimo_cambio_nombre
       FROM usuarios
       WHERE user_code = ?"
    );
    $stmt->bind_param("s", $code);
    $stmt->execute();
    $stmt->bind_result($ultimaFecha);
    $stmt->fetch();
    $stmt->close();

    $puede = true;
    if ($ultimaFecha && strtotime($ultimaFecha) !== false) {
        $dias = (time() - strtotime($ultimaFecha)) / 86400;
        $puede = ($dias >= 10.5);
    }

    if (!$puede) {
        echo json_encode([
          "success" => false,
          "message" => "Debes esperar más tiempo para cambiar el nombre."
        ]);
        exit;
    }

    // actualiza nombre
    $stmt = $conn->prepare(
      "UPDATE usuarios
       SET nombre_publico = ?, ultimo_cambio_nombre = NOW()
       WHERE user_code = ?"
    );
    $stmt->bind_param("ss", $nuevoNombre, $code);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => true]);
    exit;
}
