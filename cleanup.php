<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require 'db.php';
$conn->exec("DELETE FROM messages WHERE created_at < NOW() - INTERVAL 1 DAY");
?>
