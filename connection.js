const xhttp = new XMLHttpRequest();
const xhttp2 = new XMLHttpRequest();
var usr = ""
xhttp2.open("GET", "backend/getUsername.php");
xhttp2.send();
xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        usr = this.responseText;
    }
};


function Calculator() {
    var elem = $("#price");
    var elem1 = $("#count");
    var elem2 = $("#currency");
    var elem3 = $("#type");
    numberWithCommas(document.getElementById("total").innerHTML = elem1.val() * document.getElementById("price").value + " " + document.getElementById("currency").value);

    elem.data('oldVal', elem.val());

    elem.bind("propertychange change click keyup input paste", function(event) {
        if (elem.data('oldVal') != elem.val()) {
            elem.data('oldVal', elem.data());
            document.getElementById("total").innerHTML = numberWithCommas(elem.val() * document.getElementById("count").value + " " + document.getElementById("currency").value);

        }
    });

    elem1.data('oldVal', elem1.val());

    elem1.bind("propertychange change click keyup input paste", function(event) {
        if (elem1.data('oldVal') != elem.val()) {
            elem1.data('oldVal', elem1.val());
            document.getElementById("total").innerHTML = numberWithCommas(document.getElementById("count").value * elem.val() + " " + document.getElementById("currency").value);
        }
    });

    elem2.bind("propertychange change click keyup input paste", function(event) {
        document.getElementById("total").innerHTML = numberWithCommas(document.getElementById("price").value * document.getElementById("count").value + " " + document.getElementById("currency").value);
    });

    elem3.bind("propertychange change click keyup input paste", function(event) {
        document.getElementById("total").innerHTML = numberWithCommas(document.getElementById("price").value * document.getElementById("count").value + " " + document.getElementById("currency").value);
    });

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayTable() {
    xhttp.open("GET", "backend/reader.php")
    xhttp.send()
    xhttp.onload = function() {
        var myObj = JSON.parse(this.responseText);
        let table = "";
        for (let x in myObj) {
            table += "<tr> <td class=\"invis\">" + myObj[x].ID + "</td> <td>" + myObj[x].Item + "</td> <td>" + myObj[x].Count + "</td> <td>" + numberWithCommas(myObj[x].Price) + "</td> <td>" + numberWithCommas(myObj[x].Total) + "</td> <td>" + myObj[x].Reason + "</td> <td>" + myObj[x].Notes + "</td> <td>" + myObj[x].URL + "</td> <td>" + myObj[x].username +
                "</td> <td>" + myObj[x].created_at + "</td> <td> <button onclick = \"deleteTag(this);\" class=\"delete btn btn-danger\">Delete</button > </tr>";
        }
        document.getElementById("table").innerHTML += "<tr> <th class=\"invis\"> ID </th> <th> Item </th> <th> Count </th> <th> Price </th > <th> Total </th> <th> Reason </th><th> Notes </th> <th> Link </th> <th> User </th> <th> Created At </th> <th> Options </th> </tr> " + table;
    }
}

function deleteTag(btn) {
    // select the row that's concerned
    var row = btn.parentNode.parentNode;
    console.log(row.children[0].textContent)
        // select the name of this row
    var ID = row.children[0].textContent;

    // remove the row on client side
    row.parentNode.removeChild(row);

    xhttp.open("POST", "backend/deleter.php?id=" + ID);
    xhttp.send();
}


function Refresh() {
    document.getElementById("table").innerHTML = "";
    displayTable();
}