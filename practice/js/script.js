let input = "";

function append(value) {
    input += value;
    document.getElementById("display").innerText = input;
}

function clearDisplay() {
    input = "";
    document.getElementById("display").innerText = "0";
}

function calculate() {
    if (input === "") return;
    
    document.getElementById("display").innerText = "Nagkaon kana mo lab? ";
    
    input = "";
}