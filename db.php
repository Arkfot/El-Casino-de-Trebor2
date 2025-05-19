<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$host = "db5017872687.hosting-data.io";
$dbname = "dbs14241712";
$user = "dbu1693546";
$pass = "TtAATHqUYE9SRHpklkl"; // reemplaza esto con tu contraseña real

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>