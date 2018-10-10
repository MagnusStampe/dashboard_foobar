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

let bartenders = [];

const bartender_prototype = {
  beer_count: 0
};

let data = JSON.parse(FooBar.getData());

document.addEventListener("DOMContentLoaded", init);
//#endregion

//#region init
function init() {
  setInterval(update, 2000);

  document.querySelector(".goal_fill").style.width = "0";
  data.storage.forEach(createStock);
  data.taps.forEach(createLevel);
  data.bartenders.forEach(createBartenders);
}

//#endregion init

//#region update cycle

function update() {
  data = JSON.parse(FooBar.getData());

  data.taps.forEach(checkTap);

  doSomething(data);
}

function doSomething(dataThing) {
  console.log(dataThing);
}

function updateTaps(beerId) {
  let level;
  data.taps.forEach(checkTap);
  console.log(level);

  function checkTap(tap) {
    if (beerId == tap.id) {
      level = tap.level;
    }
  }
  document.querySelector(".tap" + beerId).textContent = level;
}

function checkTap(tap) {
  //console.log(tap.id);
  if (tap.inUse && tap.inUse !== tapInUse[tap.id]) {
    console.log(tap);
    beerSold(tap.beer);
    updateTaps(tap.id);
    checkBartender(tap.id);
    updateStock(tap.beer);
    //data.storage.forEach(updateStock);

    tapInUse[tap.id] = true;
  } else if (tap.inUse === false) {
    tapInUse[tap.id] = false;
  }
}

//#endregion

//#region goal

//Called when a beer is sold
function beerSold(beerName) {
  //console.log(beerName);
  earningsCurrent += priceList[beerName + " "];

  console.log(earningsCurrent);

  updateGoalBar();
}

function updateGoalBar() {
  let goalBar = document.querySelector(".goal_fill");
  let barFill = (earningsCurrent / 20000) * 100;
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

function createBartenders(bartenderdata) {
  const bartender = Object.create(bartender_prototype);
  bartender.name = bartenderdata.name;

  bartenders.push(bartender);

  //console.warn(bartender.statusDetail);
}

// function checkTap(tap) {
//   //console.log(tap.id);
//   if (tap.inUse && tap.inUse !== tapInUse[tap.id]) {
//     beerSold(tap.beer);

//     updateStock(tap.beer);
//     //data.storage.forEach(updateStock);

//     tapInUse[tap.id] = true;
//   } else if (tap.inUse === false) {
//     tapInUse[tap.id] = false;
//   }
// }

// let bartender_prototype = {
//   name: "",
//   status: "READY",
//   statusDetail: "waiting",
//   beer_count: 0
// };
function checkBartender(tapID) {
  data.bartenders.forEach((bartender, index) => {
    if (bartender.usingTap == tapID) {
      console.log(bartender.name + " bruger " + tapID);
      bartenders[index].beer_count += 1;
    }
  });

  console.log(
    bartenders[0].beer_count,
    bartenders[1].beer_count,
    bartenders[2].beer_count
  );
}

function updateBartenders() {}

//#endregion

//#region storage

function createStock(keg) {
  const clone = document
    .querySelector("[data-storageTemp]")
    .content.cloneNode(true);

  clone.querySelector(".stock_number").textContent = keg.amount;

  clone
    .querySelector(".stock_number")
    .classList.add(keg.name.replace(/\s/g, ""));

  document.querySelector("#storage").appendChild(clone);
}

function updateStock(beerName) {
  let amount;
  data.storage.forEach(checkStock);
  //console.log(amount);

  function checkStock(beer) {
    if (beerName == beer.name) {
      amount = beer.amount;
    }
  }

  document.querySelector(
    "." + beerName.replace(/\s/g, "")
  ).textContent = amount;
}

//#endregion storage

//#region taps levels

function createLevel(tap) {
  const clone = document
    .querySelector("[data-tapTemp]")
    .content.cloneNode(true);

  clone.querySelector(".tap_level").textContent = tap.level;

  clone.querySelector(".tap_level").classList.add("tap" + tap.id);

  document.querySelector("#taps").appendChild(clone);
}

//#endregion taps level
