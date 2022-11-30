function GetItems() {
    const xhttp = new XMLHttpRequest();
    var item = document.getElementById("item").value;
    var count = document.getElementById("count").value;
    var price = document.getElementById("price").value
    var reason = document.getElementById("reason").value;
    var notes = document.getElementById("notes").value;
    var currency = document.getElementById("currency").value;
    var type = document.getElementById("type").value;
    var url = document.getElementById("url").value;
    var total = count * price;
    var text = (item + "\n" + count + "\n" + price + "\n" + total + "\n" + reason + "\n" + notes+ "\n" + currency+ "\n" + type)
    console.log(text);
    xhttp.open("POST", "backend/writer.php?i=" + item + "&c=" + count + "&p=" + price +
        "&t=" + total + "&r=" + reason + "&n=" + notes+ "&u="+ url + "&ty=" + type + "&cur=" + currency);
    xhttp.send();
    console.log("Entered");

}

function ResetInput() {
    document.getElementById("item").value = "";
    document.getElementById("count").value = "";
    document.getElementById("price").value = "";
    document.getElementById("reason").value = "";
    document.getElementById("notes").value = "";
    document.getElementById("url").value = "";
}

function Calculator() {
    var elem = $("#price");
    var elem1 = $("#count");
    var elem2 = $("#currency");
    var elem3 = $("#type");

    elem1.data('oldVal', elem1.val());
    
    elem1.bind("propertychange change click keyup input paste", function(event){
        if (elem1.data('oldVal') != elem.val()) {
        elem1.data('oldVal', elem1.val());
        numberWithCommas(document.getElementById("total").innerHTML = elem1.val() * document.getElementById("price").value + " " + document.getElementById("currency").value);
        }
    });

    elem.data('oldVal', elem.val());
    
    elem.bind("propertychange change click keyup input paste", function(event){
        if (elem.data('oldVal') != elem.val()) {
        elem.data('oldVal', elem.data());
        document.getElementById("total").innerHTML = numberWithCommas(elem.val() * document.getElementById("count").value + " "+ document.getElementById("currency").value);

        }
    });

    elem2.bind("propertychange change click keyup input paste", function(event){
        document.getElementById("total").innerHTML = numberWithCommas(document.getElementById("price").value * document.getElementById("count").value + " " + document.getElementById("currency").value);
    });

    elem3.bind("propertychange change click keyup input paste", function(event){
        document.getElementById("total").innerHTML = numberWithCommas(document.getElementById("price").value * document.getElementById("count").value + " " + document.getElementById("currency").value);
    });

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}