//#region DOM content loaded
"use strict";

let earningsCurrent = 0;
const earningsGoal = 50000;
let tapInUse = [false, false, false, false, false, false, false];
const priceList = {
  "El Hefe ": 40,
  "Fairy Tale Ale ": 30,
  "GitHop ": 45,
  "Hollaback Lager ": 30,
  "Hoppily Ever After ": 25,
  "Mowintime ": 56,
  "Row 26 ": 45,
  "Ruined Childhood ": 30,
  "Sleighride ": 70,
  "Steampunk ": 60
};

let bartenderInfo = {
  peter: {
    sales: 0,
    working: false
  }
};

document.addEventListener("DOMContentLoaded", init);
//#endregion

//#region init
function init() {
  setInterval(update, 2000);

  document.querySelector(".goal_fill").style.width = "0";
}

//#endregion init

//#region update cycle

function update() {
  let data = JSON.parse(FooBar.getData());
  //console.log(data.taps[0].inUse);

  const taps = data.taps;
  const bartenders = data.bartenders;

  taps.forEach(checkTap);
  bartenders.forEach(checkBartender);

  doSomething(data);
}

function doSomething(dataThing) {
  console.log(dataThing);
}

function checkTap(tap) {
  //console.log(tap.id);
  if (tap.inUse && tap.inUse !== tapInUse[tap.id]) {
    beerSold(tap.beer);
    tapInUse[tap.id] = true;
  } else if (tap.inUse === false) {
    tapInUse[tap.id] = false;
  }
}

//#endregion

//#region goal

//Called when a beer is sold
function beerSold(beerName) {
  console.log(beerName);
  earningsCurrent += priceList[beerName + " "];

  console.log(earningsCurrent);

  updateGoalBar();
}

function updateGoalBar() {
  let goalBar = document.querySelector(".goal_fill");
  let barFill = earningsCurrent / 20000 * 100;
  goalBar.style.width = barFill + "%";
}

//#endregion

//#region bartenders

let bartenderChart = document
  .querySelector("#bartender_chart")
  .getContext("2d");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

let massPopChart = new Chart(bartenderChart, {
  type: "bar", //bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: ["Peter", "Jonas", "Martin"],
    datasets: [
      {
        label: "Har solgt",
        data: ["24", "20", "13"],
        backgroundColor: [
          "rgb(190, 243, 246",
          "rgb(190, 243, 246",
          "rgb(190, 243, 246"
        ],
        hoverBackgroundColor: [
          "rgb(190, 243, 246",
          "rgb(190, 243, 246",
          "rgb(190, 243, 246"
        ]
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Work Effort"
    },
    legend: {
      display: false
    }
  }
});
function checkTap(tap) {
  //console.log(tap.id);
  if (tap.inUse && tap.inUse !== tapInUse[tap.id]) {
    beerSold(tap.beer);
    tapInUse[tap.id] = true;
  } else if (tap.inUse === false) {
    tapInUse[tap.id] = false;
  }
}

function createBartenders() {}

function checkBartender(bartender) {}

function updateBartenders() {}

//#endregion
