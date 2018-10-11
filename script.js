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

//#region charts
let bartenderChart = document
  .querySelector("#bartender_chart")
  .getContext("2d");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";
Chart.defaults.global.defaultFontColor = "white";

let massPopChart = new Chart(bartenderChart, {
  type: "bar", //bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: [],
    datasets: [
      {
        label: "Har solgt",

        data: [],
        backgroundColor: [
          "rgb(190, 243, 246",
          "rgb(190, 243, 246",
          "rgb(190, 243, 246"
        ],
        hoverBackgroundColor: [
          "rgb(190, 243, 250",
          "rgb(190, 243, 250",
          "rgb(190, 243, 250"
        ]
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Work Effort",
      fontFamily: "Helvetica"
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100
          }
        }
      ]
    }
  }
});

let favBeerChart = document.querySelector("#favbeer_chart").getContext("2d");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";
Chart.defaults.global.defaultFontColor = "white";

let massPieChart = new Chart(favBeerChart, {
  type: "pie", //bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: [],
    datasets: [
      {
        data: [4, 5, 7, 1],
        backgroundColor: [
          "rgb(190, 243, 246",
          "rgb(190, 243, 246",
          "rgb(190, 243, 246",
          "rgb(190, 243, 246",
          "rgb(190, 243, 246",
          "rgb(190, 243, 246",
          "rgb(190, 243, 246",
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
      text: "Favorite Beer",
      fontFamily: "Helvetica"
    },
    legend: {
      display: false
    }
  }
});

//endregion

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
  massPopChart.update();
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
  let barFill = earningsCurrent / 20000 * 100;
  goalBar.style.width = barFill + "%";
}

//#endregion

//#region bartenders

function createBartenders(bartenderdata) {
  const bartender = Object.create(bartender_prototype);
  bartender.name = bartenderdata.name;

  bartenders.push(bartender);

  massPopChart.data.labels.push(bartender.name);

  //console.warn(bartender.statusDetail);
}

function checkBartender(tapID) {
  data.bartenders.forEach((bartender, index) => {
    if (bartender.usingTap == tapID) {
      console.log(bartender.name + " bruger " + tapID);
      bartenders[index].beer_count += 1;
      updateBartenders(bartenders, index);
    }
  });

  console.log(
    bartenders[0].beer_count,
    bartenders[1].beer_count,
    bartenders[2].beer_count
  );
}

function updateBartenders(bartenders, index) {
  console.log(index);
  massPopChart.data.datasets.forEach(dataset => {
    dataset.data[index] = 0;
    dataset.data[index] = bartenders[index].beer_count;
  });
  massPopChart.update();
}

//#endregion

//#region storage

function createStock(keg) {
  const clone = document
    .querySelector("[data-storageTemp]")
    .content.cloneNode(true);

  clone
    .querySelector(".beer_single_container")
    .classList.add(keg.name.replace(/\s/g, ""));

  clone.querySelector(".beer_name").textContent = keg.name;

  clone.querySelector(".beer_amount").textContent = "Kegs left: " + keg.amount;

  console.log(`url("${keg.name.toLowerCase().replace(/\s/g, "")}.png")`);
  clone.querySelector(".beer_single_container").style.backgroundImage =
    "url('img/" + keg.name.toLowerCase().replace(/\s/g, "") + ".png')";

  for (let n = keg.amount; n > 0; n--) {
    let displayKegs = document.createElement("DIV");
    clone.querySelector(".beer").appendChild(displayKegs);
  }

  if (keg.amount === 2) {
    clone.querySelector(".beer").classList.add("warning");
  } else if (keg.amount < 2) {
    clone.querySelector(".beer").classList.add("alert");
    clone.querySelector(".beer").classList.remove("warning");
  }

  document.querySelector("[data-storageDest]").appendChild(clone);
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
    "#storage ." + beerName.replace(/\s/g, "") + " .beer"
  ).innerHTML =
    "";
  for (let n = amount; n > 0; n--) {
    let displayKegs = document.createElement("DIV");
    document
      .querySelector("#storage ." + beerName.replace(/\s/g, "") + " .beer")
      .appendChild(displayKegs);
  }
  console.log(
    "#storage ." + beerName.replace(/\s/g, "") + " .beer_info .beer_amount"
  );
  document.querySelector(
    "#storage ." + beerName.replace(/\s/g, "") + " .beer_info .beer_amount"
  ).textContent =
    "Kegs left: " + amount;
}
if (amount === 2) {
  document
    .querySelector("#storage ." + beerName.replace(/\s/g, "") + " .beer")
    .classList.add("warning");
} else if (keg.amount < 2) {
  document
    .querySelector("#storage ." + beerName.replace(/\s/g, "") + " .beer")
    .classList.add("alert");
  document
    .querySelector("#storage ." + beerName.replace(/\s/g, "") + " .beer")
    .classList.remove("warning");
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
