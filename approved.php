<?php
include('backend/config.php');


session_start();
$usr = $_SESSION["username"];

$stmt = mysqli_query($link, "SELECT is_admin FROM users WHERE username=\"$usr\"");
$usrData = mysqli_fetch_row($stmt);
$sql = "SELECT * FROM approvedRequests";

$result = mysqli_query($link, $sql);

if (isset($_GET['delete'])) {
    $id = validate($_GET['delete']);
    $condition = ['ID' => $id];
    $deleteMsg = delete_data($link, "approvedRequests", $condition);
    header("location:approved.php");
}
function delete_data($db, $tableName, $condition)
{
    $conditionData = '';
    $i = 0;
    foreach ($condition as $index => $data) {
        $and = ($i > 0) ? ' AND ' : '';
        $conditionData .= $and . $index . " = " . "'" . $data . "'";
        $i++;
    }
    $query = "DELETE FROM " . $tableName . " WHERE " . $conditionData;
    $result = $db->query($query);
    if ($result) {
        $msg = "data was deleted successfully";
    } else {
        $msg = $db->error;
    }
    return $msg;
}
function validate($value)
{
    $value = trim($value);
    $value = stripslashes($value);
    $value = htmlspecialchars($value);
    return $value;
}
?>

<head>
    <script type="text/javascript" src="connection.js"></script>
    <link rel=" stylesheet " href="style.css ">
    <link rel="stylesheet " href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css " integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T " crossorigin="anonymous ">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</head>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
        <ul class="navbar-nav">
            <li class="nav-item" style="padding: 0px 0px 0px 30px">
                <a class="nav-link" href="./">Home</a>
            </li>
            <li class="nav-item" style="padding: 0px 0px 0px 30px">
                <a class="nav-link" href="view.php">View Requests</a>
            </li>
            <?php
            if ($usrData[0] == "1") {
            ?>
                <li class="nav-item active" style="padding: 0px 0px 0px 30px">
                    <a class="nav-link">Approved List</a>
                </li>
            <?php
            }
            ?>
            <li class="nav-item" style="padding: 0px 0px 0px 30px">
                <a class="nav-link" href="./backend/logout.php">Logout</a>
            </li>
        </ul>
    </div>
</nav>

<body>

    <table id="table" style="width:95%; margin-left: auto; margin-right: auto;">
    <tr>
            <th class="invis">ID</th>
            <th style="width: 5%">Item</th>
            <th style="width: 5%">Count</th>
            <th style="width: 5%">Type</th>
            <th style="width: 5%">Price</th>
            <th style="width: 6%">Total</th>
            <th style="width: 9%">Reason</th>
            <th style="width: 9%">Notes</th>
            <th style="width: 15%">URL</th>
            <th style="width: 9%">Username</th>
            <th style="width: 9%">Creation Date</th>
            <th style="width: 20%">Options</th>
        </tr>
        <?php
        if (mysqli_num_rows($result) > 0) {
            $sn = 1;
            while ($data = mysqli_fetch_assoc($result)) {
                $sn++;
                if ($sn % 2 == 0) {
        ?>
                    <tr style="background-color: #dddddd;">
                        <td class="invis"><?php echo $data['ID']; ?> </td>
                        <td><?php echo $data['Item']; ?> </td>
                        <td><?php echo $data['Count']; ?> </td>
                        <td><?php echo $data['Type']; ?> </td>
                        <?php
                        if ($data["Currency"] == "TL") {
                        ?>
                            <td>₺<?php echo $data['Price']; ?></td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "USD") {
                        ?>
                            <td>$<?php echo $data['Price']; ?> </td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "EURO") {
                        ?>
                            <td>€<?php echo $data['Price']; ?> </td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "GBP") {
                        ?>
                            <td>£<?php echo $data['Price']; ?></td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "TL") {
                        ?>
                            <td>₺<?php echo $data['Total']; ?></td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "USD") {
                        ?>
                            <td>$<?php echo $data['Total']; ?> </td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "EURO") {
                        ?>
                            <td>€<?php echo $data['Total']; ?> </td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "GBP") {
                        ?>
                            <td>£<?php echo $data['Total']; ?> </td>
                        <?php
                        }
                        ?>
                        <td><?php echo $data['Reason']; ?> </td>
                        <td><?php echo $data['Notes']; ?> </td>
                        <td><?php echo $data['URL']; ?> </td>
                        <td><?php echo $data['username']; ?> </td>
                        <td><?php echo $data['created_at']; ?> </td>
                        <td><a href="approved.php?delete=<?php echo $data['ID']; ?>" class="btn btn-danger">Delete</a>

                    <tr>
                    <?php
                } else {
                    ?>
                    <tr>
                        <td class="invis"><?php echo $data['ID']; ?> </td>
                        <td><?php echo $data['Item']; ?> </td>
                        <td><?php echo $data['Count']; ?> </td>
                        <td><?php echo $data['Type']; ?> </td>
                        <?php
                        if ($data["Currency"] == "TL") {
                        ?>
                            <td>₺<?php echo $data['Price']; ?></td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "USD") {
                        ?>
                            <td>$<?php echo $data['Price']; ?> </td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "EURO") {
                        ?>
                            <td>€<?php echo $data['Price']; ?> </td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "GBP") {
                        ?>
                            <td>£<?php echo $data['Price']; ?></td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "TL") {
                        ?>
                            <td>₺<?php echo $data['Total']; ?></td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "USD") {
                        ?>
                            <td>$<?php echo $data['Total']; ?> </td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "EURO") {
                        ?>
                            <td>€<?php echo $data['Total']; ?> </td>
                        <?php
                        }
                        ?>
                        <?php
                        if ($data["Currency"] == "GBP") {
                        ?>
                            <td>£<?php echo $data['Total']; ?> </td>
                        <?php
                        }
                        ?>
                        <td><?php echo $data['Reason']; ?> </td>
                        <td><?php echo $data['Notes']; ?> </td>
                        <td><?php echo $data['URL']; ?> </td>
                        <td><?php echo $data['username']; ?> </td>
                        <td><?php echo $data['created_at']; ?> </td>
                        <td><a href="approved.php?delete=<?php echo $data['ID']; ?>" class="btn btn-danger">Delete</a>
                    </tr>

        <?php
                }
            }
        } ?>
    </table>
    <div style="margin-left: auto; margin-right: auto; text-align:center">
        <button type="button " style="width:7%; margin:50px 0px 0px 0px; padding:10px" class="btn btn-success " onclick="location.reload(); ">Refresh</button>
    </div>
</body>