<?php

$servername = "localhost";
$username = "root";
$password = "mysqlserver";
$dbname = "Idealab";

$conn = new mysqli($servername, $username, $password, $dbname);

$password = password_hash($argv[2], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, password, is_admin) VALUES ('$argv[1]', '$password', true)";
$conn->query($sql);
?>