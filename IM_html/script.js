console.log("working")

function changeimage(){
    document.getElementById("main_interaction").innerHTML = "<img src =\"img/angry.png\">"
}
document.getElementById("main_interaction").addEventListener("click",(event) => {changeimage()})

