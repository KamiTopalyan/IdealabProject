<?php
include('backend/config.php');
session_start();

// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login");
    exit;
}



$usr = $_SESSION["username"];

$stmt = mysqli_query($link, "SELECT is_admin FROM users WHERE username=\"$usr\"");
$usrData = mysqli_fetch_row($stmt);
if($usrData[0] == "1") {
  $sql = "SELECT * FROM requests";
}
else {
  $sql = "SELECT * FROM requests where username=\"$usr\"";
}


$result = mysqli_query($link, $sql);

$item_err = $count_err = $price_err = $reason_err = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty(trim($_POST["item"]))) {
        $item_err = "Please enter an item.";
    } else {
        $item = trim($_POST["item"]);
    }
    if (empty(trim($_POST["count"]))) {
        $count_err = "Please enter a amount.";
    } else {
        $count = trim($_POST["count"]);
    }
    if (empty(trim($_POST["price"]))) {
        $price_err = "Please enter a price.";
    } else {
        $price = trim($_POST["price"]);
    }
    if (empty(trim($_POST["reason"]))) {
        $reason_err = "Please enter a Reason.";
    } else {
        $reason = trim($_POST["reason"]);
    }
    $total = trim($_POST["total"]);
    $notes = trim($_POST["notes"]);
    $url = trim($_POST["url"]);
    $currency = trim($_POST["currency"]);
    $type = trim($_POST["type"]);

    if (empty($item_err) && empty($count_err) && empty($price_err) && empty($reason_err)) {
        $sql = "INSERT INTO requests (Item, Count, Price, Total, Reason, Notes, URL, Currency, Type, username)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "sidsssssss", $param_item, $param_count, $param_price, $param_total, $param_reason, $param_notes, $param_url, $param_currency, $param_type, $param_username);

            $param_item = $item;
            $param_count = intval($count);
            $param_price = doubleval($price);
            $param_total = number_format($param_count * $param_price);
            $param_reason = $reason;
            $param_notes = $notes;
            $param_url = $url;
            $param_currency = $currency;
            $param_type = $type;
            $param_username = $usr;

            if (mysqli_stmt_execute($stmt)) {
                debug_print_backtrace("Added by " . $param_username);
            } else {
                echo mysqli_error($link);
            }
            mysqli_stmt_close($stmt);
        } else {
            echo "Error";
        }
    }
}
?>
<html>

<head>
    <script type="text/javascript" src="connection.js"></script>
    <link rel=" stylesheet " href="style.css ">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1108017234204244"
     crossorigin="anonymous"></script>  
    <link rel="stylesheet " href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css " integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T " crossorigin="anonymous ">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</head>

<body onload="Calculator();">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul class="navbar-nav">
                <li class="nav-item active" style="padding: 0px 0px 0px 30px">
                    <a class="nav-link">Home<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item" style="padding: 0px 0px 0px 30px">
                    <a class="nav-link" href="view.php">View Requests</a>
                </li>
                <?php
                if ($usrData[0] == "1") {
                ?>
                    <li class="nav-item" style="padding: 0px 0px 0px 30px">
                        <a class="nav-link" href="approved.php">Approved List</a>
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
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <div class="wrapper" style="margin-left: 0%; margin-right: 0%; max-width: 700px; margin: 5 auto; ">
            <label for=" ">Talep Edilen Mal</label>
            <div class="input-group mb-3 form-group">
                <input type="text " id="item" name="item" class="form-control " placeholder="" value='<?php echo $item; ?>' aria-describedby="basic-addon1 ">
            </div>

            <div class="row">

                <div class="column form-group">
                    <p>Adet</p>
                    <input type="number" id="count" name="count" value='<?php echo $count; ?>' name="count" if(event.key==='.' ){event.preventDefault();}" oninput="event.target.value = event.target.value.replace(/[^0-9]*/g,'');" class="form-control ">
                </div>

                <div class="column dropdown form-group">
                    <select style="margin-top: 40px " name="type" id="type" class="form-select form-control btn btn-secondary">
                        <option selected value="Adet">Adet</option>
                        <option value="Paket">Paket</option>
                    </select>
                </div>

                <div class="column form-group">
                    <p>Fiyat</p>
                    <input type="number" value='<?php echo $price; ?>' name="price" step="0.01" id="price" class="form-control " placeholder=" " aria-label=" " aria-describedby="basic-addon1 ">
                </div>


                <div class="column form-group">
                    <select style=" margin-top: 40px " class="form-select form-control btn btn-secondary" name="currency" id="currency">
                        <option selected value="TL">TL</option>
                        <option value="USD">USD</option>
                        <option value="EURO">EURO</option>
                        <option value="GPP">GBP</option>
                    </select>
                </div>
            </div>
            <br>
            <div class="form-group">
                <label>Tutar</label>
                <div style="background-color: rgb(207, 207, 207) " value='<?php echo $param_total; ?>' id="total" class="form-control" placeholder=" " aria-label=" " aria-describedby="basic-addon1 ">0 TL</div>
            </div>
            <br>
            <div style="padding: 10px, 0px " class="form-group">
                <label for=" ">Neden İstendiği</label>
                <input type="text " class="form-control " value='<?php echo $reason; ?>' name="reason" id="reason" placeholder=" " aria-label=" " aria-describedby="basic-addon1 ">
            </div>
            <br>
            <div style="padding: 10px, 0px " class="form-group">
                <label for=" ">Notlar</label>
                <input type="text " class="form-control " value='<?php echo $notes; ?>' name="notes" id="notes" placeholder=" " aria-label=" " aria-describedby="basic-addon1 ">
            </div>
            <br>
            <div style="padding: 10px, 0px " class="form-group">
                <label for=" ">Link</label>
                <input type="text" class="form-control " value='<?php echo $url; ?>' name="url" id="url" placeholder=" " aria-label=" " aria-describedby="basic-addon1 ">
            </div>
            <br>
            <br>

            <div class="container ">
                <div class="row form-group" style="justify-content: right; margin-right: 0px;">
                <input type="reset" class="btn btn-danger ml-2" value="Reset">
                    <input type="submit" class="btn btn-success ml-2" value="Submit">
                </div>
            </div>


        </div>

        <div>
            <h1 id="response"></h1>
        </div>

        </div>
    </form>
</body>

</html>