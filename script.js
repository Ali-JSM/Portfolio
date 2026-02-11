let timeBtwEachFooterText = 3;//sec
let listOfFooterText = ["Hey I'm Ali","Hey I am 7a9b46ab6d983a85dd4d9a1aa64a3945",
    "7a9b46ab6d983a85dd4d9a1aa64a3945","am I KCUzj3g96Q9tZaeUkcmPXA==",
    ".. / .- -- / .- / --. .-. . .- - / -.. . ...- . .-.. --- .--. . .-."
,"I am a great developer","I am .. / .- -- / .- / --. .-. . .- - / -.. . ...- . .-.. --- .--. . .-.",""]
function ChangeFooterText(){
    let ran = Math.floor(Math.random() *listOfFooterText.length)
    let text = ""
    if(listOfFooterText[ran]!=null)
       text = listOfFooterText[ran]
    document.getElementById("word-par").innerText =text;
    setTimeout(() => {
    ChangeFooterText()
}, timeBtwEachFooterText * 1000 * Math.random(10));
}

// ChangeFooterText()

const links = document.querySelectorAll("#nav a[data-panel]");
const panels = document.querySelectorAll(".panel");
const svg = document.querySelector(".lines");

function clearPanels() {
  panels.forEach(p => p.classList.remove("active"));
  svg.innerHTML = "";
}

links.forEach(link => {
  link.addEventListener("click", () => {
    const id = link.dataset.panel;
    const panel = document.getElementById(id);

    clearPanels();
    panel.classList.add("active");

  });
});


const closeBtn = document.getElementById("closePanels");

closeBtn.addEventListener("click", () => {
  panels.forEach(p => p.classList.remove("active"));
  svg.innerHTML = "";
});

