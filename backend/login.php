<?php 
    $usr = $_REQUEST["usr"];
    $pass = $_REQUEST["pass"];
    
    $servername = "localhost";
$username = "root";
$password = "mysqlserver";
$dbname = "Idealab";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if($conn === false){
    die("Error: connection error. " . mysqli_connect_error());
}
?>