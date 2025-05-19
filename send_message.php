<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require 'db.php';

$message = $_POST['message'] ?? '';
if ($message) {
    $stmt = $conn->prepare("INSERT INTO messages (content, created_at) VALUES (?, NOW())");
    $stmt->execute([$message]);
}
?>
