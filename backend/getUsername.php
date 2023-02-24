<?php
session_start();
$usr = $_SESSION["username"];
echo $usr;
?>