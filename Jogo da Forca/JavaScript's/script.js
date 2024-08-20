function setEasy(){
    localStorage.setItem("mode","easy");
}
function setMedium(){
    localStorage.setItem("mode","medium");
}
function setHard(){
    localStorage.setItem("mode","hard");
}

function init(){
    var easyLink = document.getElementById("easy");
    var mediumLink = document.getElementById("medium");
    var hardLink = document.getElementById("hard");

    easyLink.onclick = setEasy;
    mediumLink.onclick = setMedium;
    hardLink.onclick = setHard;

    var checkbox1 = document.getElementById("checkbox-1");
    checkbox1.addEventListener("change", function() {
        if (checkbox1.checked) {
            localStorage.setItem("accents", "on");
            console.log("ON");
        } else {
            localStorage.setItem("accents", "off");
            console.log("OFF");
        }
    });
    
}
window.onload = init;