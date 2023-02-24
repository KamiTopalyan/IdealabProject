<?php
$servername = "localhost";
$username = "root";
$password = "mysqlserver";
$dbname = "Idealab";

session_start();
$usr = $_SESSION["username"];

if($_REQUEST['id'] && $usr) {

// if the variable has been successfully received
  $ID = $_REQUEST['id'];

  $conn = new mysqli($servername, $username, $password, $dbname);

  $stmt = mysqli_query($conn, "SELECT is_admin FROM users WHERE username=\"$usr\"");
  $data = mysqli_fetch_row($stmt);
  if($data[0] == "1") {
    $sql = mysqli_prepare($conn, "DELETE FROM requests WHERE ID = $ID");
  }
  else {
    $sql = mysqli_prepare($conn, "DELETE FROM requests WHERE ID = $ID AND username = \"$usr\"");
  }



  mysqli_stmt_execute($sql);

}
?>