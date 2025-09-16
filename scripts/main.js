if ("serviceWorker" in Navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("Service worker Registered");
      console.log(registration);
    })
    .catch((error) => {
      console.log("Failed" + error);
    });
}

let directory = document.getElementById("directory");
const txtSelected = document.getElementById("selected");

const btnAddToSpeedDiall = document.getElementById("addToSpeedDial");
const btnCallSpeedDiall = document.getElementById("callSpeedDial");

let txtParas;
let selected;

btnAddToSpeedDiall.addEventListener("click", addToSpeedDial);
btnCallSpeedDiall.addEventListener("click", callSpeedDial);

getData();

function getData() {
  fetch("directory.json")
    .then((res) => res.json())
    .then((data) => processData(data))
    .catch((error) => console.log(`Error - ${error}`));
}

function processData(data) {
  localStorage.clear();
  let dirList = "";
  for (let i = 0; i < data.length; i++) {
    dirList += `<p class='entry'>${data[i]["name"]} (  
        ${data[i]["type"]} ) : ${data[i]["number"]}</p>`;
  }

  directory.innerHTML = dirList;

  // Grabs a collection (array) of all the P tags.
  txtParas = Array.from(document.getElementsByClassName("entry"));
  console.log(txtParas);
  txtParas.forEach((item) => item.addEventListener("click", displaySelected));
}

function displaySelected() {
  for (let i = 0; i < txtParas.length; i++) {
    txtParas[i].classList.remove("highlight");
  }
  this.classList.add("highlight");
  selected = this.innerHTML;
  console.log(selected);
}

function addToSpeedDial() {
  // Add the current selected text to localStorage
  localStorage.setItem("speedDial", selected);
}
