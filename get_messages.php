<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require 'db.php';

$stmt = $conn->query("SELECT content, created_at FROM messages ORDER BY id DESC LIMIT 50");
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(array_reverse($messages));
?>
