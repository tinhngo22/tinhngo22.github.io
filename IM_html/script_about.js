score = 0;
function changeimage2(){
    document.getElementById("interactive_img").innerHTML = "<img src =\"img/angryface.png\">";
    score ++;
    document.getElementById("interactive_point").innerHTML = score;
}
document.getElementById("interactive_img").addEventListener("click",(event) => {changeimage2()})