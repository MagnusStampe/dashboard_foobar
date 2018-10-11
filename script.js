//#region DOM content loaded
"use strict";

let earningsCurrent = 0;
const earningsGoal = 50000;
let tapInUse = [false, false, false, false, false, false, false];
const beerList = {
  "El Hefe ": {
    id: 0,
    price: 40,
    popularity: 0
  },
  "Fairy Tale Ale ": {
    id: 1,
    price: 30,
    popularity: 0
  },
  "GitHop ": {
    id: 2,
    price: 45,
    popularity: 0
  },
  "Hollaback Lager ": {
    id: 3,
    price: 30,
    popularity: 0
  },
  "Hoppily Ever After ": {
    id: 4,
    price: 25,
    popularity: 0
  },
  "Mowintime ": {
    id: 5,
    price: 55,
    popularity: 0
  },
  "Row 26 ": {
    id: 6,
    price: 45,
    popularity: 0
  },
  "Ruined Childhood ": {
    id: 7,
    price: 30,
    popularity: 0
  },
  "Sleighride ": {
    id: 8,
    price: 70,
    popularity: 0
  },
  "Steampunk ": {
    id: 9,
    price: 60,
    popularity: 0
  }
};

let bartenders = [];

const bartender_prototype = {
  beer_count: 0
};

//#endregion

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
          "rgb(241, 92, 132",
          "rgb(240, 91, 131",
          "rgb(239, 90, 130"
        ],
        hoverBackgroundColor: [
          "rgb(194, 70, 66",
          "rgb(194, 70, 66",
          "rgb(194, 70, 66"
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
            max: 30
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
        data: [],
        backgroundColor: [
          "rgb(132, 109, 137",
          "rgb(109, 188, 235",
          "rgb(141, 184, 18",
          "rgb(200, 182, 50",
          "rgb(194, 70, 66",
          "rgb(82, 81, 78",
          "rgb(240, 280, 280",
          "rgb(234, 174, 99",
          "rgb(236, 48, 44",
          "rgb(44, 51, 61"
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
  massPieChart.update();

  Object.keys(beerList).forEach(createPieChart);

  function createPieChart(beer) {
    console.log(beer);

    massPieChart.data.labels.push(beer);

    massPieChart.update();
  }
}

//#endregion init

//#region update cycle

function update() {
  data = JSON.parse(FooBar.getData());

  data.taps.forEach(checkTap);
}

function updateTaps(beerId) {
  let level;
  let capacity;
  data.taps.forEach(checkTapLevel);
  console.log(level);

  function checkTapLevel(tap) {
    if (beerId == tap.id) {
      level = tap.level;
      capacity = tap.capacity;
    }
  }
  console.log("height: " + (level / capacity) * 100 + "%");
  document.querySelector(".tap" + beerId + " .beer .level").style.height =
    (level / capacity) * 100 + "%";
  document.querySelector(
    ".tap" + beerId + " .beer_info .beer_amount"
  ).textContent = "Level: " + (level / capacity) * 100 + "%";
  if ((level / capacity) * 100 < 10) {
    document.querySelector(".tap" + beerId + " .beer").classList.add("alert");
  } else if ((level / capacity) * 100 < 30) {
    document.querySelector(".tap" + beerId + " .beer").classList.add("warning");
  }
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
  earningsCurrent += beerList[beerName + " "].price;

  beerList[beerName + " "].popularity++;

  updateFavoriteBeer(
    beerList[beerName + " "].popularity,
    beerList[beerName + " "].id
  );

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

function updateFavoriteBeer(popularity, id) {
  massPieChart.data.datasets.forEach(dataset => {
    dataset.data[id] = 0;
    dataset.data[id] = popularity;
    console.log(dataset.data);
  });
  massPieChart.update();
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
  ).innerHTML = "";
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
  ).textContent = "Kegs left: " + amount;

  if (amount === 2) {
    document
      .querySelector("#storage ." + beerName.replace(/\s/g, "") + " .beer")
      .classList.add("warning");
  } else if (amount < 2) {
    document
      .querySelector("#storage ." + beerName.replace(/\s/g, "") + " .beer")
      .classList.add("alert");
    document
      .querySelector("#storage ." + beerName.replace(/\s/g, "") + " .beer")
      .classList.remove("warning");
  }
}
//#endregion storage

//#region taps levels

function createLevel(tap) {
  const clone = document
    .querySelector("[data-tapTemp]")
    .content.cloneNode(true);

  clone.querySelector(".beer_amount").textContent = "Level: " + tap.level;
  clone.querySelector(".beer_name").textContent = tap.beer;
  clone.querySelector(".beer_single_container").style.backgroundImage =
    "url('img/" + tap.beer.toLowerCase().replace(/\s/g, "") + ".png')";

  clone.querySelector(".beer_single_container").classList.add("tap" + tap.id);

  document.querySelector("#taps .beer_container").appendChild(clone);
  updateTaps(tap.id);
}

//#endregion taps level
