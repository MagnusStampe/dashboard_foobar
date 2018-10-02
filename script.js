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

document.addEventListener("DOMContentLoaded", init);
//#endregion

//#region init
function init() {
  setInterval(update, 2000);
}

//#endregion init

//#region update cycle

function update() {
  let data = JSON.parse(FooBar.getData());
  //console.log(data.taps[0].inUse);

  const taps = data.taps;

  taps.forEach(checkTap);

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

function updateGoalBar() {}

//#endregion
