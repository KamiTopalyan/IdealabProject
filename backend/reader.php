<?php
$conn = mysqli_connect("localhost", "root", "mysqlserver");
mysqli_select_db($conn, "Idealab");

session_start();
$usr = $_SESSION["username"];

$stmt = mysqli_query($conn, "SELECT is_admin FROM users WHERE username=\"$usr\"");
$data = mysqli_fetch_row($stmt);
if($data[0] == "1") {
  $sql = mysqli_prepare($conn, "SELECT * FROM requests");
}
else {
  $sql = mysqli_prepare($conn, "SELECT * FROM requests where username=\"$usr\"");
}


if (mysqli_stmt_execute($sql)) {
  $result = mysqli_stmt_get_result($sql);
  $output = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($output);
  } else {
    echo "Error.";
  }
?>