<?php

//$item = "ite";
//$count = 100;
//$price = 100;
//$total = 100;
//$reason = "Apple";
//$notes = "Note";
//$type = "Adet";
//$currency = "TL";



$item = $_REQUEST["i"];
$count = $_REQUEST["c"];
$price = $_REQUEST["p"];
$total = $_REQUEST["t"];
$reason = $_REQUEST["r"];
$notes = $_REQUEST["n"];
$url = $_REQUEST["u"];
$type = $_REQUEST["ty"];
$currency = $_REQUEST["cur"];



$servername = "localhost";
$username = "root";
$password = "mysqlserver";
$dbname = "Idealab";

$conn = new mysqli($servername, $username, $password, $dbname);


$sql = "INSERT INTO requests (Item, Count, Price, Total, Reason, Notes, URL, Currency, Type)
VALUES ('$item', '$count', '$price', '$total', '$reason', '$notes', '$url', '$type', '$currency')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

?>